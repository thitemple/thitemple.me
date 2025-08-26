---
title: TypeScript and the Power of the Unknown
description: What is TypeScript's unknown type and how it can be used
date: "2019-07-15"
categories:
  - code
  - typescript
published: true
summary: Uncover the power of TypeScript's 'unknown' type, a safer alternative to
  'any'. Learn about its use cases, including migrating from JavaScript, working
  with third-party libraries without type definitions, and consuming APIs that
  aren't yet implemented.
---

<script context="module">
export { default as cover } from "./banner.png";
</script>

TypeScript is a language that is moving forward really fast and sometimes is
hard to keep up with it, there are so many features being released constantly,
that we may be missing some really important gems. I think that the `unknown`
type is one of those.

## What is the `unknown` type?

The `unknown` type is a basic TypeScript type that was
[introduced in version 3.0 of the language](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type).

And by basic, I mean that you can use it to define a simple variable or
parameter, as you can see in the following example.

```ts
let movie: unknown = "";

function printMovie(movie: unknown) {
  console.log(movie);
}
```

## Why is it there?

The quick explanation is: to represent all types that _at the moment of the
declaration_, the developer is not sure (or does not know) how that value will
be used, or more specifically, how its members (if any) will be accessed.

It is a complement to `any` but it acts in a more type-safe way. Meaning that
until the moment that you are really using the value of type `unknown` it won't
type check it, but as soon as your code starts to make assumptions about it, the
compiler will begin to type-check its use.

How so? Let's see an example to make it more clear.

Let's take that `printMovie` function from above. That function works fine
because, `console.log` expects a value of type `any` for its first argument, and
`unknown` can be assigned to another `unknown` value or `any`.

Let's explore a little more on the example:

```ts
function formatMovie(movie: string) {
  return `The movie title is ${movie}`;
}

function printMovie(movie: unknown) {
  console.log(formatMovie(movie));
}
```

The above snippet will _not_ compile 💣 because we are now making an assumption
about the `movie` argument, we're trying to pass it down to another function
`formatMovie` that is expecting an argument of type `string`. When we try to
call that function and pass an `unknown` value where a `string` was expected,
then the compiler will yield an error stating exactly that.

Now you have a choice, either type the first `movie` argument as a `string` or
something else that you can turn in to a `string`.

Here's another example:

```ts
function printMovie(movie: unknown) {
  console.log(`The movie title is ${movie.title} and its rating is ${movie.rating}`);
}
```

This is another example that will fail 💣 at compile-time because we are
assuming that `movie` is an object with the properties `title` and `rating`.
Again, at this point, we are able to type it accordingly, at least with an
inline type.

```ts
function printMovie(movie: { title: string; rating: number });
```

## And what about any?

Well, I am a strong advocate against the abuse of the `any` type in TS 🙅. The
main idea of `any` is to represent types that can actually be anything. We
_cannot_ know what those types would be at compile-time, my experience is that
people reach for `any` too soon instead of taking the time and write the
appropriate types.

If it's possible to write the types, even if those types would be of different
structures or values, then we should write them. There are a few ways to do so,
using [generics](https://www.typescriptlang.org/docs/handbook/generics.html) or
[union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types)
for instance, but the point is that they can be typed. And I don't want to
over-extend myself in this article explaining how to type them.

The point is, `any` is for when you _know_ that the type in question can't be
specified and _unknown_ is for when you don't know yet what it is.

## When should you use it?

I'd say there are a few use cases for the `unknown` type. I certainly reach for
it in these scenarios:

1. When migrating from a JavaScript file

When migrating from a JavaScript codebase, one will probably (maybe) do that on
a file per-file basis. Let's say you open a given file, rename it to `.ts` and
start seeing some errors because of missing types. One thing you could do is
something like this:

```ts
type Movie = unknown;
```

You can create type aliases for the types in that file and then apply the given
type whenever it's needed such as in functions
`function printMovie(movie: Movie)`.

After you have that completed you can come back to the `Movie` type and complete
it with the needed properties.

_The strategy applied here will be the same for the other scenarios as well._ 🔁

2. When using a third party lib that does not have type definitions.

You can start creating a definition file (.d.ts) and begin filling it with
`unknown` types for the things you are unsure of and not using at the moment,
and type the things that you are using, and maybe make a pull request for that
later on. 😀

3. When consuming an API that is not implemented.

If you are consuming an API to get some data and use that data, chances are you
know the types already so make it safe 🔒and type it already. If you're not sure
of its use or you don't know how data should be sent, then that's a good use of
`unknown`.

#### And that's it, let's put what not know right now to use
