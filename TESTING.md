# Testing Documentation

## Overview

This project uses a comprehensive testing strategy with Vitest as the primary testing framework, complemented by Testing Library for component testing and MSW for API mocking.

## Testing Stack

- **Test Runner**: Vitest
- **Component Testing**: @testing-library/svelte
- **User Interactions**: @testing-library/user-event
- **DOM Environment**: Happy DOM
- **API Mocking**: MSW (Mock Service Worker)
- **Coverage**: Vitest Coverage with V8 provider

## Running Tests

```bash
# Run all tests in watch mode
pnpm test

# Run tests once (CI mode)
pnpm test:run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration
```

## Test Structure

```
src/
├── tests/
│   ├── setup.ts                 # Unit test setup
│   ├── setup.integration.ts     # Integration test setup
│   ├── test-utils.ts           # Testing utilities
│   ├── factories/              # Test data factories
│   │   └── post.factory.ts
│   ├── mocks/                  # Mock modules
│   │   └── app/
│   │       ├── environment.ts
│   │       └── stores.ts
│   └── performance/            # Performance tests
│       └── posts.perf.test.ts
├── lib/
│   ├── posts.test.ts          # Unit tests for posts module
│   ├── utils.test.ts          # Unit tests for utilities
│   ├── stores/
│   │   └── theme.test.ts      # Store tests
│   └── components/
│       ├── toggle.test.ts     # Component tests
│       └── post-meta.test.ts
└── routes/
    ├── +page.test.ts           # Page load tests
    ├── api/posts/
    │   ├── server.test.ts      # API unit tests
    │   └── server.integration.test.ts
    ├── rss.xml/
    │   └── server.test.ts
    └── sitemap.xml/
        └── server.test.ts
```

## Writing Tests

### Unit Tests

```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "./my-module";

describe("myFunction", () => {
  it("should return expected value", () => {
    const result = myFunction("input");
    expect(result).toBe("expected");
  });
});
```

### Component Tests

```typescript
import { render, screen } from "../tests/test-utils";
import MyComponent from "./MyComponent.svelte";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(MyComponent, {
      props: { title: "Test Title" }
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// Use .integration.test.ts suffix
describe("API Integration", () => {
  it("should handle real requests", async () => {
    const response = await fetch("/api/endpoint");
    const data = await response.json();

    expect(data).toHaveProperty("expected");
  });
});
```

## Test Patterns

### Arrange-Act-Assert

```typescript
it("should follow AAA pattern", () => {
  // Arrange
  const input = createTestData();

  // Act
  const result = processData(input);

  // Assert
  expect(result).toEqual(expectedOutput);
});
```

### Testing Async Code

```typescript
it("should handle async operations", async () => {
  const promise = fetchData();

  await expect(promise).resolves.toEqual(expectedData);
});
```

### Mocking Modules

```typescript
vi.mock("$lib/module", () => ({
  functionToMock: vi.fn().mockReturnValue("mocked")
}));
```

## Test Data Factories

Use factories to create consistent test data:

```typescript
import { createPost } from "../tests/factories/post.factory";

const post = createPost({ title: "Custom Title" });
```

## Coverage Requirements

The project enforces the following coverage thresholds:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 80%
- **Statements**: 80%

View coverage report:

```bash
pnpm test:coverage
# Open coverage/index.html in browser
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
3. **Keep Tests Independent**: Each test should be able to run in isolation
4. **Use Test Factories**: Create reusable test data generators
5. **Mock External Dependencies**: Isolate the code under test
6. **Test Edge Cases**: Include tests for error conditions and boundary values
7. **Maintain Test Performance**: Keep tests fast for rapid feedback

## Debugging Tests

```bash
# Run tests in debug mode
node --inspect-brk ./node_modules/.bin/vitest run

# Run specific test file
pnpm vitest run src/lib/posts.test.ts

# Run tests matching pattern
pnpm vitest run -t "should format date"
```

## CI/CD Integration

Tests run automatically on:

- Push to main or develop branches
- Pull requests to main
- Manual workflow dispatch

The CI pipeline includes:

- Type checking
- Linting
- Unit tests
- Integration tests
- Coverage reporting
- Performance tests
- Build verification

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Ensure path aliases in `vitest.config.ts` match `tsconfig.json`
2. **DOM not available**: Check that test environment is set to 'happy-dom'
3. **Async timeouts**: Increase timeout for integration tests in config
4. **Coverage missing files**: Check coverage exclude patterns

### Getting Help

- Run tests with verbose output: `pnpm vitest run --reporter=verbose`
- Check test logs: `pnpm vitest run --logHeapUsage`
- Use Vitest UI for debugging: `pnpm test:ui`
