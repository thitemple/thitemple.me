---
title: "Talking about ES2015: the let and const keywords"
description: "Talking about ES2015: the let and const keywords"
date: "2015-08-16"
published: true
categories:
	- code
  - javascript
summary:
  Discover the power of the let and const keywords in ES2015. Learn how let
  introduces block scope variables, preventing access outside their scope, while
  const declares constants with unchangeable values. Explore the differences
  between var and let, and master the art of scoping in JavaScript.
---

In ES2015 there's a new way to declare variables, it's the **let** keyword which
declares a block scope variable. Block scope variable? What does that mean
exactly?

**Update:** I have also
[recorded a video about let and const](https://youtu.be/4q-awpEJQJU), if you
want to watch it in addition to reading this post.

Well, let's get some context using ES5. In ES5 and earlier versions, all
variables are function scoped. Meaning that no matter where inside a function a
variable is declared, that variable is accessible inside the whole function.

Let's see an example:

```js
function demo() {
	console.log(i); // undefined
	for (var i = 0; i < 10; i++) {
		// do something
	}
	console.log(i); // 10
}
demo();
```

In the above code, one could think that because the variable _i_ was declared
inside a for loop, this variable is scoped to that loop. As we can see, when the
variable was logged before the loop, the result is _undefined_ - just for
clarification, all declared, but not initialized variables have the value of
_undefined_. Also, the variable was accessible and had the value of _10_ after
the loop.

One other thing, it doesn't matter how many times a variable is declared inside
a function, if it has the same name, it's the same variable.

```js
function demo() {
	var name = "Thiago";
	if (true) {
		console.log(name); // Thiago
		var name = "Temple";
	}
	return name;
}
console.log(demo()); // Temple
```

Simple as that, no error, it's the same variable.

##The let keyword

In ES15, there's a new new keyword to declare variables, and it's a block scope
variable. So now, if we declare a variable inside a _if_ or a _for loop_ that
variable is not accessible outside that scope.

```js
function demo() {
	if (true) {
		let name = "Thiago";
	}
	console.log(name); // ReferenceError: name is not defined
}
demo();
```

Here we can see that the variable _name_ is not accessible outside the scope of
the _if_. This is the same when using _for loops_.

```js
function demo() {
	for (let i = 0; i < 10; i++) {}
	console.log(i); // ReferenceError: i is not defined
}
demo();
```

Because of this, variables declared inside a scope having the same name as
variables outside that scope will shadow the outer scoped variable. As we can
see in the example below, there are two variables called _name_, and inside the
_if_ scope and only inside the _if_ the new variable _name_ will shadow the
variable _name_ that is outside the _if_ scope.

```js
function demo() {
	let name = "Thiago";
	if (true) {
		let name = "Temple";
		console.log(name); // "Temple"
	}
	console.log(name); // Thiago
}
demo();
```

In this example, after the _if block_ the log returns "Thiago" as it was the
value initialized for the _name_ variable in that scope.

Another difference between _var_ and _let_ is that _var_ variables are hoisted
and _let_ variables are not. So using var, if one wrote the function demo1 as
below, it is the same thing as writing the function demo2:

```js
function demo1() {
	console.log(name); // undefined
	var name = "Thiago";
	console.log(name); // Thiago
}
demo();
```

```js
function demo2() {
	var name;
	console.log(name); // undefined
	name = "Thiago";
	console.log(name); // Thiago
}
demo2();
```

As for the _let_ declaration, there's no hoisting so the code below will throw
an error.

```js
function demo() {
	console.log(name); // ReferenceError
	let name = "Thiago";
}
demo();
```

One last thing about the differences between let and var. When declaring a _var_
variable in the head of the loop, only one binding is created to that variable,
meaning the result of a loop like in the example below would print the number 5,
five times.

```js
for (var i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(i);
	}, 100);
}
```

Now, the same code, just using _let_ in the head of the loop would print the
numbers 0 1 2 3 4. That's because with _let_ there's one binding to the _i_
variable for each iteration.

```js
for (let i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(i);
	}, 100);
}
```

##The const keyword

The _const_ keyword as you can image is used to declare a constant, and its use
is very simple:

```js
const NAME = "Thiago";
console.log(NAME); // Thiago
```

A constant must be initialized at the moment of the declaration and its value
cannot be changed.

```js
const MY_CONST; //SyntaxError: missing = in const declaration

const MY_VAL = 1;
MY_VAL = 2; // SyntaxError: invalid assignment to const MY_VAL
```
