---
title: "Talking about ES2015: strings"
description: A brief description about some of the new features in strings on ES2015
date: "2015-08-25"
published: true
categories:
  - code
  - javascript
summary: Discover the new string features in ES2015 that make your code cleaner and
  more powerful. Learn about methods like "repeat," "includes," "startsWith,"
  and "endsWith," which provide efficient string manipulation. Plus, explore the
  flexibility of template literals for multiline strings and expression
  interpolation.
---

There are a few new features related to strings in ES2015. They're easy to learn
and they allow for a more clean code.

In ES15, some new methods were added to the String object. For instance, now
there's a repeat method.

```js
var tripleX = "X".repeat(3);
console.log(tripleX); // XXX
```

Instead of checking the indexOf to verify if a string contains some text, we can
now use the includes method.

```js
console.log("JavaScript".includes("ava")); // true
console.log("JavaScript".includes("hello")); // false
```

We can verify if a string starts with or ends with some text.

```js
console.log("Luke".startsWith("Lu")); // true
console.log("Leia".endsWith("ia")); // true
```

For all of those three methods (includes, startsWith and endsWith), there's an
optional second parameter used to specify where in the string the search starts.

```js
console.log("The blue pill".includes("blue", 4)); //true
console.log("The red pill".startsWith("red", 4)); //true
console.log("Hello Mr. Anderson".endsWith("Hello Mr", 8)); //true
```

## Template literals

Template literals are a new string literal which we can have multiple lines and
we also can interpolate expressions.

```js
let name = "Thiago";
console.log(`Hello ${name}`); // Hello Thiago

let message = `Hello 
${name}, 
welcome to ES2015`;

console.log(message);
// Hello
// Thiago
// welcome to ES2015
```

Note that to delimit the literal we use backticks \` and not single quotes, and
all interpolated expressions are delimited by `${}`.
