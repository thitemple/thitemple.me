---
title: "Talking about ES2015: destructuring"
description: "Talking about ES2015: destructuring"
date: "2015-08-19"
published: true
categories:
	- code
  - javascript
summary:
  Learn the powerful art of destructuring in ES2015. Discover how to assign
  values from arrays and objects to variables, swap values effortlessly, set
  default values, and even initialize function parameters elegantly. Explore the
  versatility of destructuring in for...of loops for efficient iteration.
---

Destructuring is a new feature in ES2015 which allows us to declare or assign
values to variables. It's a very powerful way of doing that. It might sound a
little confusing at first, but it really is very simple once you tried a few
times.

**Update:** I have also
[recorded a video about destructuring](https://youtu.be/JoFq8e6kgEQ), if you
want to watch it in addition to reading this post.

## Arrays

Let's start with a simple example using arrays.

When using destructuring we always follow the formula 'pattern' `<=` 'value'

```js
let arr = [1, 2];
let [x, y] = arr;
console.log(x); // 1
console.log(y); // 2
```

When destructuring arrays, we always use [] to declare or assign values to
variables. In the example given above we're declaring two variables _x_ and _y_.
Also, we're assigning the values of the array _arr_ to those variables. Given
that _x_ was the first variable in the pattern, the first value from array was
assigned to it. The same goes for _y_ which was the second variable in the
pattern and got the second value from the array assigned to it.

It works in the same way as the code below:

```js
let arr = [1, 2];
let x = arr[0];
let y = arr[1];
console.log(x); // 1
console.log(y); // 2
```

That's very useful when there's a function that returns multiple values.

```js
function demo() {
	return ["Thiago", "Temple"];
}
let [firstName, lastName] = demo();
console.log(firstName); // Thiago
console.log(lastName); // Temple
```

Destructuring is also practical for swapping values.

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

What happens if I don't want to declare a variable for each element of the
array? No problem, if there are more values in the array, those will be ignored.

```js
let [a, b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // 2
```

We can't just ignore de end of the array, we can ignore any element in any
order.

```js
let [, a, b] = [1, 2, 3];
console.log(a); // 2
console.log(b); // 3

let [x, , y] = [4, 5, 6];
console.log(x); // 4
console.log(y); // 6
```

What if the array does not have all the elements we are expecting? In that case,
the variable would have the _undefined_ value assigned to it.

```js
let [a, b] = [];
console.log(a); // undefined
console.log(b); // undefined
```

## Objects

Object destructuring is a little more complex than arrays. First, the syntax
change and instead of using `[]` we use `{}`.

```js
let { firstName: x, lastName: y } = { firstName: "Thiago", lastName: "Temple" };
console.log(x); // Thiago
console.log(y); // Temple
```

In the above code, we're declaring two variables _x_ and _y_, and we're looking
for properties _firstName_ and _lastName_ inside the object value. What might be
confusing is the fact that the name of the variables are in the right side of
the pattern. But in the end, is just a matter of getting used to it.

As with the arrays, if a property is not informed, the value _undefined_ is
assigned to the variable.

```js
let { firstName: x, lastName: y } = { firstName: "Thiago" };
console.log(x); // Thiago
console.log(y); // undefined
```

### Shorthands

Instead of naming our variables _x_ and _y_ we could name them something more
meaningful.

```js
let { firstName: firstName, lastName: lastName } = {
	firstName: "Thiago",
	lastName: "Temple"
};
console.log(firstName); // Thiago
console.log(lastName); // Temple
```

As you may imagine, now we're declaring two variables _firstName_ and _lastName_
and looking for properties with the same name in the object being assigned.
Whenever this is the case, we can omit the naming part of pattern, so the above
code could be written like this:

```js
let { firstName, lastName } = { firstName: "Thiago", lastName: "Temple" };
console.log(firstName); // Thiago
console.log(lastName); // Temple
```

### Nested objects

We can also have nested assignments when destructuring.

```js
let {
	name: n,
	contact: { twitter: t }
} = { name: "Thiago", contact: { twitter: "@vintem12" } };
console.log(n); // Thiago
console.log(t); // @vintem12
```

Now, we're looking for a property named _contact_ that is an object and which
contains a property called _twitter_ and we're assigning its value to a variable
called _t_.

## Default values

In both cases (arrays and objects) we can have default values, so to be sure a
variable is always initialized. The syntax for declaring default values when
destructuring is very simple, the name of the variable = a value.

```js
let [a = 1, b = 2, c = 999] = [3, 4];
console.log(a); // 3
console.log(b); // 4
console.log(c); // 999
```

In this case we have default values for the three variables being declared, but
because the array with the values has two elements, their values get assigned.
The last variable, _c_, is initialized with its default value.

It's the same case for objects.

```js
let { username, isAdmin: admin = false } = { username: "user" };
console.log(username); // user
console.log(admin); // false
```

Now we're using the shorthand to declare a variable called _username_ and look
for a property with the same name. Also, we're looking for a property called
_isAdmin_ and declaring a variable _admin_ with the default value of _false_.

## Destructuring in function parameters.

The use of destructuring with default values is a great use case for
initializing parameters in a function. So in ES5aif one wanted to make have
default values in a function, something like this had to be made:

```js
function ajaxCall(options) {
	var opts = options || {};
	opts.method = opts.method || "POST";
	opts.dataType = opts.dataType || "json";
	// ...
}
ajaxCall({ method: "GET" });
```

It's ok, it works, but with ES15 it's lot more ellegant.

```js
function ajaxCall(url, { method = "POST", dataType = "json" } = {}) {
	console.log(url); // http://templecoding.com
	console.log(method); // GET
	console.log(dataType); // json
}

ajaxCall("http://templecoding.com", { method: "GET" });
```

One important thing to note, is at end of the parameter's declaration there's a
`' = {}'`. This is important because without that when we call the _ajaxCall_
function without an object in the second parameter it will assign _undefined_ to
it and we'll have an error. So, with this syntax we're saying that the default
value of the second parameter is an empty object, so to avoid the error.

```js
function ajaxCall(url, { method = "POST", dataType = "json" }) {
	console.log(url);
	console.log(method);
	console.log(dataType);
}

ajaxCall("http://templecoding.com"); // TypeError: can't convert undefined to object
```

We can also achieve the same results using array destructuring.

```js
function ajaxCall(url, [method = "POST", dataType = "json"]) {
	console.log(url); // http://templecoding.com
	console.log(method); // GET
	console.log(dataType); // json
}

ajaxCall("http://templecoding.com", ["GET"]);
```

## For of iteration

Destructuring is a new feature in ES2015 which allows us to declare or assign
values to variables. It's a very powerful way of doing that. It might sound a
little confusing at first, but it really is very simple once you tried a few
times.

**Update:** I have also
[recorded a video about destructuring](https://youtu.be/JoFq8e6kgEQ), if you
want to watch it in addition to reading this post.

## Arrays

Let's start with a simple example using arrays.

When using destructuring we always follow the formula 'pattern' `<=` 'value'

```js
let arr = [1, 2];
let [x, y] = arr;
console.log(x); // 1
console.log(y); // 2
```

When destructuring arrays, we always use [] to declare or assign values to
variables. In the example given above we're declaring two variables _x_ and _y_.
Also, we're assigning the values of the array _arr_ to those variables. Given
that _x_ was the first variable in the pattern, the first value from array was
assigned to it. The same goes for _y_ which was the second variable in the
pattern and got the second value from the array assigned to it.

It works in the same way as the code below:

```js
let arr = [1, 2];
let x = arr[0];
let y = arr[1];
console.log(x); // 1
console.log(y); // 2
```

That's very useful when there's a function that returns multiple values.

```js
function demo() {
	return ["Thiago", "Temple"];
}
let [firstName, lastName] = demo();
console.log(firstName); // Thiago
console.log(lastName); // Temple
```

Destructuring is also practical for swapping values.

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

What happens if I don't want to declare a variable for each element of the
array? No problem, if there are more values in the array, those will be ignored.

```js
let [a, b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // 2
```

We can't just ignore de end of the array, we can ignore any element in any
order.

```js
let [, a, b] = [1, 2, 3];
console.log(a); // 2
console.log(b); // 3

let [x, , y] = [4, 5, 6];
console.log(x); // 4
console.log(y); // 6
```

What if the array does not have all the elements we are expecting? In that case,
the variable would have the _undefined_ value assigned to it.

```js
let [a, b] = [];
console.log(a); // undefined
console.log(b); // undefined
```

## Objects

Object destructuring is a little more complex than arrays. First, the syntax
change and instead of using `[]` we use `{}`.

```js
let { firstName: x, lastName: y } = { firstName: "Thiago", lastName: "Temple" };
console.log(x); // Thiago
console.log(y); // Temple
```

In the above code, we're declaring two variables _x_ and _y_, and we're looking
for properties _firstName_ and _lastName_ inside the object value. What might be
confusing is the fact that the name of the variables is in the right side of the
pattern. But in the end, is just a matter of getting used to it.

As with the arrays, if a property is not informed, the value _undefined_ is
assigned to the variable.

```js
let { firstName: x, lastName: y } = { firstName: "Thiago" };
console.log(x); // Thiago
console.log(y); // undefined
```

### Shorthands

Instead of naming our variables _x_ and _y_ we could name them something more
meaningful.

```js
let { firstName: firstName, lastName: lastName } = {
	firstName: "Thiago",
	lastName: "Temple"
};
console.log(firstName); // Thiago
console.log(lastName); // Temple
```

As you may imagine, now we're declaring two variables _firstName_ and _lastName_
and looking for properties with the same name in the object being assigned.
Whenever this is the case, we can omit the naming part of pattern, so the above
code could be written like this:

```js
let { firstName, lastName } = { firstName: "Thiago", lastName: "Temple" };
console.log(firstName); // Thiago
console.log(lastName); // Temple
```

### Nested objects

We can also have nested assignments when destructuring.

```js
let {
	name: n,
	contact: { twitter: t }
} = { name: "Thiago", contact: { twitter: "@vintem12" } };
console.log(n); // Thiago
console.log(t); // @vintem12
```

Now, we're looking for a property named _contact_ that is an object and which
contains a property called _twitter_ and we're assigning its value to a variable
called _t_.

## Default values

In both cases (arrays and objects) we can have default values, so to be sure a
variable is always initialized. The syntax for declaring default values when
destructuring is very simple, the name of the variable = a value.

```js
let [a = 1, b = 2, c = 999] = [3, 4];
console.log(a); // 3
console.log(b); // 4
console.log(c); // 999
```

In this case, we have default values for the three variables being declared, but
because the array with the values has two elements, their values get assigned.
The last variable, _c_, is initialized with its default value.

It's the same case for objects.

```js
let { username, isAdmin: admin = false } = { username: "user" };
console.log(username); // user
console.log(admin); // false
```

Now we're using the shorthand to declare a variable called _username_ and look
for a property with the same name. Also, we're looking for a property called
_isAdmin_ and declaring a variable _admin_ with the default value of _false_.

## Destructuring in function parameters.

The use of destructuring with default values is a great use case for
initializing parameters in a function. So in ES5aif one wanted to make have
default values in a function, something like this had to be made:

```js
function ajaxCall(options) {
	var opts = options || {};
	opts.method = opts.method || "POST";
	opts.dataType = opts.dataType || "json";
	// ...
}
ajaxCall({ method: "GET" });
```

It's ok, it works, but with ES15 it's a lot more elegant.

```js
function ajaxCall(url, { method = "POST", dataType = "json" } = {}) {
	console.log(url); // http://templecoding.com
	console.log(method); // GET
	console.log(dataType); // json
}

ajaxCall("http://templecoding.com", { method: "GET" });
```

One important thing to note is at the end of the parameter's declaration there's
a `' = {}'`. This is important because without that when we call the _ajaxCall_
function without an object in the second parameter it will assign _undefined_ to
it and we'll have an error. So, with this syntax we're saying that the default
value of the second parameter is an empty object, so to avoid the error.

```js
function ajaxCall(url, { method = "POST", dataType = "json" }) {
	console.log(url);
	console.log(method);
	console.log(dataType);
}

ajaxCall("http://templecoding.com"); // TypeError: can't convert undefined to object
```

We can also achieve the same results using array destructuring.

```js
function ajaxCall(url, [method = "POST", dataType = "json"]) {
	console.log(url); // http://templecoding.com
	console.log(method); // GET
	console.log(dataType); // json
}

ajaxCall("http://templecoding.com", ["GET"]);
```

## For of iteration

One last use case I want to show is the use of destructuring in a _for of_ loop.

```js
let users = [
	{
		username: "user1",
		contact: { twitter: "@user1" }
	},
	{
		username: "user2",
		contact: { twitter: "@user2" }
	}
];

for (let {
	username,
	contact: { twitter: t }
} of users) {
	console.log(username); // user1, user2
	console.log(t); // @user1, @user2
}
```

In the example given above we're looping through the users array and assigning a
_username_ variable and a _t_ variable. One last use case I want to show is the
use of destructuring in a _for of_ loop.

```js
let users = [
	{
		username: "user1",
		contact: { twitter: "@user1" }
	},
	{
		username: "user2",
		contact: { twitter: "@user2" }
	}
];

for (let {
	username,
	contact: { twitter: t }
} of users) {
	console.log(username); // user1, user2
	console.log(t); // @user1, @user2
}
```

In the example given above we're looping through the users array and assigning a
_username_ variable and a _t_ variable.
