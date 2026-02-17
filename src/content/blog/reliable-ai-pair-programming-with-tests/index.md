---
title: Reliable AI Pair-Programming with Tests
description: How I learned to stop trusting AI-generated tests and built a reliable testing strategy. Write gold-standard reference tests, treat AI like a junior dev, and keep e2e minimal for faster, more confident development.
summary: "I let AI write my tests and paid for it. Here's how a few gold-standard references turned AI from liability into a reliable pair."
categories:
  - side-projects
  - ai-coding
date: 2025-08-26
published: true
type: article
---

<script context="module">
export { default as cover } from "./banner.png";
</script>

I fell back in love with automated tests after a short, chaotic fling with YOLO, vibe-coded, AI-written everything. The fix wasn’t fancy: stop trusting AI’s tests, write a few gold-standard references, keep e2e minimal, and point the model at my examples. The payoff was immediate—I shipped new features instead of re-testing old ones on every change.

If you’re a solo dev letting AI write most of your code, this matters because complexity piles up fast. When I can’t reason about a change, that’s a code smell—and bad or fake tests make it worse. Good tests give me a contract: I can refactor freely, ask the AI for help, and still trust the behavior.

Where I failed first:

- I delegated test-writing to the AI and skimmed only the titles.
- I accepted “void tests” that asserted setup instead of behavior.
- I asked for broad e2e suites and got brittle, slow, flaky scripts.
- I had no testing rules, so every file followed a different style.
- I didn’t review AI output like I would a junior dev’s PR.

**Good tests are the contract that makes AI pair-programming reliable.**

## Stopped trusting AI-generated tests blindly

I used to read the test description and move on. Then I found cases like this—no logic called, nothing real asserted:

```ts
it("should prepare correct data for authenticated users", async () => {
  const user = {
    id: "user-123",
    email: "user@example.com",
    name: "Test User"
  };

  // Set up event data
  await wizardStore.updateEventData("basics", {
    title: "Test Event"
  });

  // For authenticated users, should use session data
  const submissionData = {
    hostEmail: user.email,
    hostName: user.name
    // Other event data would be included
  };

  expect(submissionData.hostEmail).toBe("user@example.com");
  expect(submissionData.hostName).toBe("Test User");
});
```

It looks busy but never exercises the system. Now my rule is simple: read the body, not the title. If a test doesn’t drive behavior and check outcomes, it doesn’t ship.

## Wrote a few high-quality reference tests as anchors

I picked one complex user flow and wrote a clean, user-perspective UI test. This became the canonical example the AI should copy:

```ts
test("creates an event with an authenticated user", async () => {
  const mockSaveSession = vi.fn();
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(NewEventWizard, {
    props: {
      onClose: () => {},
      onComplete: mockSaveSession,
      user: {
        id: "123",
        email: "john.doe@email.com",
        name: "John Doe",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  });

  // Navigate through wizard steps (same first 3 steps)
  await fillEventBasicsStep(user);
  await fillEventDetailsStep(user);
  await skipGuestListStep(user);
  await verifySaveEventStepLoaded();

  // For authenticated users, name and email fields should not be present
  // They should be automatically populated from the user prop
  const saveButton = screen.getByTestId("btn-save-event");
  expect(saveButton).toBeInTheDocument();

  // Verify that name and email inputs are NOT shown for authenticated users
  const nameInputText = screen.queryByLabelText("Your Name");
  expect(nameInputText).not.toBeInTheDocument();
  const emailInputText = screen.queryByLabelText("Email Address");
  expect(emailInputText).not.toBeInTheDocument();

  // Click the save button to submit the form (should use user data from props)
  await user.click(saveButton);

  // Verify that the session was saved with the correct data
  const arg = mockSaveSession.mock.calls[0][0];
  expect(arg).toMatchObject({
    basics: { title: "My beautiful event" },
    location: { locationName: "My house" },
    settings: { hostEmail: "john.doe@email.com", hostName: "John Doe" }
  });
});
```

## Used those references to steer AI output

I gave the model a narrow lane by adding explicit guidance to `claude.md` and pointing it at the reference test file.

```
## Testing Guidelines

**IMPORTANT**

Use the src/lib/components/new-event-wizard/NewEventWizard.test.ts as THE model on how to test components

Components should be tested from the user perspective, ie: clicking, typing

Selectors should be semantic (ex: getByRole, getByLabel). Only use getByTestId as an exception when 2 or more elements may have the same label.

Favour fewer tests that simulate how a user would use the component (see example src/lib/components/new-event-wizard/NewEventWizard.test.ts).
```

At the top of the reference test, I embedded a comment that explains the style and the why:

```ts
/*
IMPORTANT! READ THIS CAREFULLY.

This test file serves as an example on how to test a component. This tests the component as a user would use it and simulates the different interactions that the user would perform. Notice a few things:
1. We don't have mocks in here except the external dependencies that are passed as props to the component.
2. We are trying to use rows as selectors.
3. When rows are not available, we look for text labels. We don't use IDs, we don't use classes to select.
4. The last case scenario to select is just the DataTestID, but we should use that very rarely and only in the cases where we cannot pin down one single element in the component.

**Quantity of tests**
There are fewer tests, and each test case is testing a scenario and going back and forth simulating what the user would be doing.

**Events**
When triggering an event, we should use a user event.
import userEvent from "@testing-library/user-event";

And set it up in each test:
const user = userEvent.setup();

Click:
await user.click(step1ContinueButton);
Type:
await user.type(eventNameInputText, "My beautiful event");


**Before and After each**
- Only add those if the test requires them.
- Only add fake timers if the test requires them due to the target of test using a setTimeout for instance
*/
```

## Treated AI like a junior dev — reviewed everything

AI still writes tests, but I read them like a code review. I check that they drive real interactions, use semantic selectors first, and assert behavior—not just shape. I reject brittle patterns and ask for rewrites using the reference file as the template.

## Kept end-to-end tests minimal, unit tests abundant

E2E is a hard rule for me: one happy path to confirm the main flow works. They’re expensive to set up (especially data), slower to run, and easy to make flaky. Everything else lives at the unit level, where tests are fast, focused, and cheap to maintain—and even there I mock as little as possible (only true externals) so the behavior under test stays real. In the UI, I render the top-level wizard and let its real sub-components run; I don’t mock them because I want to exercise the interactions between components. On the back-end, I don’t mock the database either; I spin up an in-memory database so real queries execute and I can trust the behavior.
