---
title: Real Immutable Types with TypeScript
description: Learn how to create truly immutable types in TypeScript using advanced type system features.
date: "2025-08-03"
categories:
  - typescript
  - programming
published: true
---

# Real Immutable Types with TypeScript

TypeScript provides several ways to create immutable types. In this post, we'll explore different approaches and their trade-offs.

## The Problem with Shallow Immutability

TypeScript's `readonly` modifier only provides shallow immutability:

```typescript
interface User {
  readonly name: string;
  readonly settings: {
    theme: string;
  };
}

const user: User = {
  name: "John",
  settings: { theme: "dark" }
};

// This won't compile
// user.name = "Jane";

// But this will!
user.settings.theme = "light";
```

## Deep Immutability with Utility Types

We can create a utility type for deep immutability:

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

## Using the `const` Assertion

TypeScript also provides the `const` assertion for literal types:

```typescript
const config = {
  api: {
    url: "https://api.example.com",
    timeout: 5000
  }
} as const;

// Type is deeply readonly
```

Stay tuned for more TypeScript tips!
