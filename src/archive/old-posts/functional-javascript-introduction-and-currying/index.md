---
title: Functional JavaScript - An introduction and currying
description: How to use curried functions with JavaScript and Ramda
category: code
date: "2016-04-13"
categories:
  - javascript
  - functional programming
  - currying
  - ramda
published: true
summary: Discover the basics of functional programming in JavaScript and dive into the
  concept of currying. Learn how to create curried functions that allow for
  partial application of arguments, making your code more declarative and
  reusable.
---

There has been a lot of buzz around functional programming lately, sure enough I
was catch by the buzz, and here I am sharing some of what I have learned. I
won't talk about anything new here, in fact, in this post and in (probably) some
other posts I might write on functional programming using JavaScript, all the
concepts were already explored and explained.

Then why write about it?

<iframe
	src="https://giphy.com/embed/lYKvaJ8EQTzCU"
	width="480"
	height="358"
	frameBorder="0"
	class="giphy-embed"
	allowFullScreen
  title="Why?"
></iframe>

Well, they say that if you can't explain something using simple terms you don't
really understood it. So, I hope I can write down on the subject using simple
and clear terms.

## The theory

Functional programming is based on Math, I won't start explaining the Math and
theory unless I feel it's relevant and needed for the subject. As for what I'm
talking about in this post - currying - I won't touch on any theories.

## Currying

What is currying? Currying is a way of calling a function with less arguments
than the function requires.

Every time the function is called it will return a new function expecting one
less argument. And when all the arguments are passed, then the original function
will be called.

Here's the most common and straightforward example using currying (I could not
escape that), the add function.

Take and add function that expects two arguments and add them. Traditionally one
could write it this way:

```javascript
function add(x, y) {
  return x + y;
}
add(2, 3); // 5
```

Now using currying:

```javascript
function add(x) {
  return function (y) {
    return x + y;
  };
}
const add2 = add(2);
add2(3); // 5
```

So calling, the add function will create a closure that will make the value
passed to x available to the next function being returned. That next function
can be called later with any other argument.

Here's another example a little bit more useful:

```javascript
function log(prefix) {
  return function (text) {
    console.log(prefix, text);
  };
}

const logError = log("Error:");
const logInfo = log("Info:");
logError("Houston, we have a problem"); // Error: Houston, we have a problem
logInfo("nah, we're good"); // Info: nah, we're good
```

See how quickly we can create new functions, just by currying another one?

OK, but wait a minute, earlier I said that currying is a way of calling a
function with less arguments than the function requires. With those examples,
one could argue that each function expects only one argument, and that's true.

That's because although we can program JavaScript in a functional way,
JavaScript does not have all the tools needed to do so by default, for instance,
functions are not curried by default like in some other languages.

Surely I could write a function that would curry other functions and it would
work like this:

```javascript
const log = curry(function (prefix, text) {
  console.log(prefix, text);
});
const logError = log("Error:");
logError("....");
```

The curry function would be responsible for managing if all the arguments were
passed and then call the original function.

But instead of writing the curry function we can use a library that does that,
like [Ramda](http://ramdajs.com/). Ramda is a library much like
[lodash](https://lodash.com/) or [underscore](http://underscorejs.org/), but
Ramda focus is on providing functions that will allow us to write code in a
functional way, either by providing automatically curried functions or by making
it easy for us to create ours.

So the above example using Ramda (from now on I'm assuming a reference to the
Ramda library), could be written like this:

```javascript
const log = R.curry(function (prefix, text) {
  console.log(prefix, text);
});
const logError = log("Error:");
logError("....");
```

See that R? That's Ramda, and Ramda has a curry function. And that's it! That's
how we curry functions using Ramda.

Now let's see an even more useful example. Let's use the good old fetch API to
make some ajax calls. The implementation details of the bellow function are not
important. The important is that the function takes three arguments: an url, a
method (post, put, etc...) and the data that will be sent in the request.

```javascript
const apiCall = function (url, method, body) {
  let json = JSON.stringify(body);
  const request = {
    body: json,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };
  return fetch(url, request)
    .then(response => {
      return response.json();
});
```

So there's a function that can make a POST or a PUT request to an URI, let's say
to create or update a movie, here's an example of usage of this function:

```javascript
apiCall('/movies', 'post', { title: 'The Matrix' })
    .then(res => ...);

apiCall('/movies', 'put', { title: 'The Matrix', id: 1, rating: 5 })
    .then(res => ...);
```

That works, but here's how we could achieve the same using a curried function.
First, let's make the apiCall function curried using Ramda. That's easy, we just
have to wrap the original function with the curry function from Ramda.

```javascript
const apiCall = R.curry(function (url, method, body) {
  let json = JSON.stringify(body);
  const request = {
    body: json,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };
  return fetch(url, request)
    .then(response => {
      return response.json();
}));
```

Next, let's change the code that uses the apiCall function.

```javascript
const moviesApi = apiCall('/movies');
const createMovie = moviesApi('post');
const updateMovie = moviesApi('put');

createMovie({ title: 'The Matrix' })
    .then(res => ...);

updateMovie({ title: 'The Matrix', id: 1, rating: 5 })
    .then(res => ...);
```

See how that's a lot more declarative? Creating simpler and smaller functions
turns the code (at least in my option) a lot more readable.

Instead of calling the apiCall function passing three arguments each time,
there's a function that represents the moviesApi so now there's no need to
repeat the URI everywhere.

Next, two new small functions were created, createMovie and updateMovie, one
with a post method and another with a put method. Again, we're declaring the
intention of the functions with good naming and also hiding implementation
details from the users. Now the users of the code don't need to know the URI,
nor the method that should be called, they only have to call one of those
functions and pass in the data.

All of that was achieved by reusing the same function, just by currying it and
passing one argument at a time.

I hope that this is as clear for you as is evident for me.

That's all for today.
