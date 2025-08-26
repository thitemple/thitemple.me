# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# Or with browser auto-open
pnpm dev -- --open

# Build for production (uses increased memory allocation)
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm check
# Type checking with watch mode
pnpm check:watch

# Linting and formatting
pnpm lint          # Check code style with Prettier and ESLint
pnpm format        # Auto-format code with Prettier

# Testing
pnpm test          # Run tests in watch mode
pnpm test:run      # Run tests once
pnpm test:coverage # Run tests with coverage report
pnpm test:integration # Run integration tests

# IMPORTANT: Validation
pnpm validate      # Run full validation suite (lint, type-check, tests, build)
                   # This MUST pass before any task is considered complete
```

## Important Requirements

**Before considering ANY development task complete, you MUST run `pnpm validate` and ensure it passes.**

The validation script runs:

1. **Linting** - Code formatting with Prettier and ESLint rules
2. **Type checking** - TypeScript and Svelte type validation
3. **Tests** - All unit and integration tests
4. **Build** - Production build verification

If validation fails, the task is not complete and issues must be fixed.

## High-Level Architecture

This is a **SvelteKit personal blog/portfolio site** with the following architecture:

### Tech Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: Tailwind CSS v4 with Vite integration
- **Content**: MDsveX for Markdown processing with syntax highlighting (Shiki)
- **Type Safety**: TypeScript with strict mode enabled
- **Deployment**: Vercel adapter with Node.js 20.x runtime
- **Analytics**: Vercel Analytics integration

### Project Structure

#### Content Management

- **Blog posts** are stored as Markdown files in `/src/posts/` directory
- Posts are processed by MDsveX with custom layout at `src/mdsvex.svelte`
- Dynamic post loading via `src/lib/posts.ts` using Vite's glob imports
- Archived posts in `/src/archive/old-posts/` (not actively displayed)

#### Routing Structure

- `/` - Homepage with latest post preview
- `/about` - About page
- `/blog` - Blog listing with pagination
- `/blog/[slug]` - Individual blog post pages
- `/api/posts` - JSON API endpoint for posts with pagination
- `/rss.xml` - RSS feed generation
- `/sitemap.xml` - Sitemap generation

#### Key Components

- **Layout**: Main layout in `src/routes/+layout.svelte` handles theme switching and analytics
- **Theme System**: Dark/light mode toggle stored in localStorage via `src/lib/stores/theme.ts`
- **Navigation**: Header with desktop nav and mobile menu component
- **Post Processing**: Custom MDsveX configuration with TOC generation, slug creation, and image optimization

#### API Design

- Posts API (`/api/posts`) returns paginated results with Zod validation
- RSS and Sitemap endpoints generate XML responses server-side
- Type-safe API responses using TypeScript interfaces

### Configuration Notes

- Vite config uses Tailwind CSS v4 as a Vite plugin
- SvelteKit configured for Vercel deployment
- MDsveX handles `.md` files with custom highlighting and plugins:
  - `remark-toc` for table of contents
  - `rehype-slug` for heading anchors
  - `rehype-unwrap-images` for image handling
  - `mdsvex-relative-images` for relative image paths

## Testing Strategy and Guidelines

This project follows comprehensive testing practices to ensure reliability and maintainability.

### Testing Architecture

#### Test Types

- **Unit Tests** (`*.test.ts`): Test individual functions and components in isolation
- **Integration Tests** (`*.integration.test.ts`): Test workflows and interactions between components
- **Component Tests**: Test Svelte components using @testing-library/svelte

#### Test Organization

- **Co-location**: Tests are placed in the same directory as the code they test
- **Factories**: Reusable test data creation in `/src/tests/factories/`
- **Test Utils**: Shared testing utilities in `/src/tests/test-utils.ts`
- **Mocks**: Application-specific mocks in `/src/tests/mocks/`

#### Key Testing Principles

1. **Behavior over Implementation**: Test what the code does, not how it does it
2. **Arrange-Act-Assert**: Clear test structure with setup, execution, and verification
3. **Test Pyramid**: More unit tests, fewer integration tests, minimal E2E tests
4. **Deterministic Tests**: No flaky tests, consistent results every run
5. **Fast Feedback**: Optimized for quick execution and meaningful error messages

### Testing Tools and Configuration

#### Core Tools

- **Vitest**: Fast test runner with TypeScript support
- **@testing-library/svelte**: Component testing with user-centric queries
- **MSW (Mock Service Worker)**: API mocking for integration tests
- **Happy DOM**: Fast DOM implementation for component tests

#### Coverage Requirements

- **Branches**: 70% minimum
- **Functions**: 70% minimum
- **Lines**: 80% minimum
- **Statements**: 80% minimum

### Writing Tests

#### Unit Tests

```typescript
// Example: src/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "./utils";

describe("formatDate", () => {
  it("should format valid dates correctly", () => {
    expect(formatDate("2024-01-15")).toMatch(/Jan.*15.*2024/);
  });

  it("should handle invalid dates gracefully", () => {
    expect(formatDate("invalid")).toBe("Invalid Date");
  });
});
```

#### Component Tests

```typescript
// Example: Component testing with semantic queries
import { render, screen } from "@testing-library/svelte";
import MyComponent from "./MyComponent.svelte";

it("should display post title", () => {
  render(MyComponent, { props: { post: mockPost } });
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Post Title");
});
```

#### Integration Tests

```typescript
// Example: Testing complete workflows
it("should provide consistent data across endpoints", async () => {
  const posts = await getPosts();
  const apiResponse = await GET(mockRequest);
  const apiData = await apiResponse.json();

  expect(apiData.data[0].slug).toBe(posts[0].slug);
});
```

### Test Data Management

#### Factories Pattern

Use factory functions for consistent test data:

```typescript
// src/tests/factories/post.factory.ts
export function createPost(overrides?: Partial<Post>): Post {
  return {
    title: "Test Post",
    slug: "test-post",
    // ... defaults with overrides
    ...overrides
  };
}
```

#### Mock Strategy

- **External APIs**: Mock with MSW
- **Utility Functions**: Mock only when necessary for isolation
- **SvelteKit Modules**: Avoid mocking; test real behavior when possible
- **File System**: Mock import.meta.glob for post loading tests

### Testing Specific Features

#### API Endpoints

- Test success and error cases
- Validate request/response schemas with Zod
- Test pagination logic thoroughly
- Verify error handling and status codes

#### Svelte Components

- Use semantic queries (getByRole, getByLabelText)
- Test user interactions with userEvent
- Verify accessibility attributes
- Test conditional rendering and props

#### Business Logic

- Test edge cases and error conditions
- Verify data transformations
- Test sorting and filtering logic
- Validate reading time calculations

### Performance Testing

#### Guidelines

- Tests should complete under reasonable time limits
- Use performance.now() for timing critical operations
- Test large data sets to verify scalability
- Monitor memory usage in long-running tests

### Best Practices

#### Do's

- Write descriptive test names that explain the scenario
- Test one concept per test case
- Use real data when possible, mocked data when necessary
- Clean up after tests (database, localStorage, etc.)
- Test error boundaries and edge cases
- Prefer user-centric queries over implementation details

#### Don'ts

- Don't test implementation details
- Don't mock everything (aim for realistic scenarios)
- Don't write tests that duplicate what TypeScript already validates
- Don't ignore flaky tests (fix them or remove them)
- Don't test external libraries (trust they work)

#### Test Naming Conventions

- Use descriptive "should" statements: `should return 404 when post not found`
- Group related tests with `describe` blocks
- Use nested describes for different scenarios
- Include edge cases: `should handle empty input gracefully`

### Debugging Tests

#### Common Commands

```bash
# Run specific test file
pnpm test posts.test.ts

# Run tests in specific directory
pnpm test src/lib/

# Run with coverage
pnpm test:coverage

# Debug with UI
pnpm test:ui

# Run integration tests
pnpm test:integration
```

#### Debugging Tips

- Use `it.only` to run single test
- Add `console.log` for debugging (remove before commit)
- Use `screen.debug()` to see component DOM
- Check test output for helpful error messages

### Continuous Integration

Tests run automatically in CI/CD pipeline:

1. Lint and format checks
2. TypeScript compilation
3. Unit and integration tests
4. Coverage validation
5. Build verification

**Remember**: All tests must pass before code can be merged.
