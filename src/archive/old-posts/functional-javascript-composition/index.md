---
title: Functional JavaScript - Composition
description: How to compose functions in JavaScript using Ramda
date: "2016-04-25"
categories:
  - javascript
  - functional programming
  - composition
  - ramda
published: true
summary: Discover the power of composition in functional JavaScript programming. Learn
  how to combine existing functions to create new ones, simplifying code and
  achieving a declarative programming style. Explore examples of composition and
  understand the benefits it brings to your code.
---

Composition is a nice way of reusing existing functions to create new ones. Each
of those functions will act on some data that is passed by as an argument,
transforming it and then returning it so that the next function in the
composition can do the same.

This may sound complicated at first, but it's simpler than it reads.

By the way, this is the second post on the subject of functional programming
using JavaScript, first
[I wrote about curried functions](/blog/functional-javascript-introduction-and-currying/)
which is an essential technique when doing composition. So I suggest you read it
and understand curried functions before reading this post, it will make things a
lot easier. If you do know what curried functions are, be my guest and have a
good reading.

I think that a good way to understand composition is by comparing it to the
"traditional" way of doing things. So let's start with an example using the
imperative way?

Say we have two functions, a function that takes an array and returns the fist
element, and a second function that takes a string and returns it all caps.

Like this:

```js
function head(arr) {
  return arr[0];
}

function toUpper(str) {
  return str.toUpperCase();
}
```

Using those functions in an imperative way it would look like this:

```javascript
var movies = ["Star Wars", "The Matrix", "Forrest Gump"];
var firstMovie = head(movies);
var upperMovie = toUpper(firstMovie);
console.log(upperMovie); // STAR WARS
```

Or another way we could do to achieve the same result:

```javascript
var movies = ["Star Wars", "The Matrix", "Forrest Gump"];
console.log(toUpper(head(movies)));
```

Let's keep in mind that this example is very simple. But in both examples, we
have some issues.

In the first example, one problem is that we have a couple of unnecessary
variables _firstMovie_ and _upperMovie_, and also, we have to tell the program
what to do every step of the way. Step one, find the first item in the array,
step two, transform the text to uppercase, step three, print it.

In the second example, we removed the issue of the unnecessary variables but
now, we have a code a little harder to read, because we have to read it from the
inside out.

And how would that work with a composition?

First, we will use the two functions already created _head_ and _toUpper_ and we
will compose them into a third one. And then we will call that function.

```javascript
var movies = ["Star Wars", "The Matrix", "Forrest Gump"];
var uppercasedFirstMovie = compose(toUpper, head);
console.log(uppercasedFirstMovie(movies));
```

So, what's happening here? First, we have a function _uppercasedFirstMovie_ that
describes exactly what it's doing without having any line of code written
specifically for it. It is just the result of the combination of two other
functions. Don't worry about the compose function; we'll talk about that in a
moment.

And then we're logging the result. At this point, one could say that we still
have an inside-out way of reading the code, so let's fix that.

```javascript
var movies = ["Star Wars", "The Matrix", "Forrest Gump"];
var uppercasedFirstMovie = compose(toUpper, head);
var logMovie = compose(console.log, uppercasedFirstMovie);
logMovie(movies);
```

See? With another composition, a _logMovie_ function was created combination the
_console.log_ and the previously created function _uppercasedFirstMovie_. Now,
one just have to call _logMovie_ and pass in the array.

The beauty of this code is that we have small functions that are describing what
the code is supposed to do. We're not telling every step of the way how to do
it. That's the **declarative** way of programming.

That's great but what is that _compose_ function? I haven't shown it yet, so
let's see an implementation of it.

```javascript
var compose = function (f, g) {
  return function (data) {
    return f(g(data));
  };
};
```

Compose is a function that takes two other functions as arguments, and return a
new function. That new function takes in the data that will be transformed and
will call both functions from right to left passing the data to first one and
its result to the second.

Why from right to left? Well,
[because Math](https://en.wikipedia.org/wiki/Function_composition). Functional
programming is all about applying Math principles to programming, and that's how
it works within Math.

And talking about Math, the idea of composition is all about Math. The idea is:
if you a function f that takes A as an argument, and the result is B. Then, you
have a function g takes B as an argument, and the result is C, you can say that
the result of the composition of g and f when having A as an argument will
always result in C.

But don't take my word for it, check this image:

![Math composition](//upload.wikimedia.org/wikipedia/commons/thumb/3/38/Example_for_a_composition_of_two_functions.svg/220px-Example_for_a_composition_of_two_functions.svg.png?style=centerme)

OK, that's the Math of it and the theory. Now let's get back to the code.

The above implementation of _compose_ is a very simple one, that does not take
many things into consideration, for instance, what if I'd like to compose more
than two functions, like so:

```javascript
var logMovie = compose(console.log, toUpper, head);
```

Well with that implementation we can't. But some libraries can do it. In my
previous post on curried functions I talked about [Ramda](https://ramdajs.com)
and I'll be using it in the next examples as well.

So, using Ramda, it's possible to compose multiple functions:

```javascript
var movies = ["Star Wars", "The Matrix", "Forrest Gump"];
var logMovie = R.compose(console.log, toUpper, head);
logMovie(movies);
```

Ramda even has the _toUpper_ and _head_ functions, so we wouldn't have to write
those.

```javascript
var movies = ["Star Wars", "The Matrix", "Forrest Gump"];
var logMovie = R.compose(console.log, R.toUpper, R.head);
logMovie(movies);
```

Now let's get a little deeper and say we have an array of movie objects:

```javascript
var movies = [
  {
    title: "Star Wars",
    director: "George Lucas"
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski"
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis"
  }
];
```

And with that array, I want to return the first name of director from the first
movie.

One could write it this way:

```javascript
var directorsFirstName = R.compose(console.log, R.head, R.split(" "), R.prop("director"), R.head);
directorsFirstName(movies); // George
```

OK. There's a lot in this piece of code, so let's review it step by step.

From right to left:

R.head: will take the first element in the array, in this case:
`{ title: 'Star Wars', director: 'George Lucas' }`.

R.prop('director'): this is a Ramda function that will look for the value of a
property in a object, in this case, we're looking for the _director_ property,
so the result is: 'George Lucas.'

R.split: this is also a Ramda function, that will split a string by the text
passed in as a parameter, so the result is: ['George', 'Lucas'].

R.head: well, you know that one, the result is: 'George'.

And finally the result will be logged to the console.

The great thing is, all of this was achieved without even writing a new line of
logic. A new function was created by combining all those other ones that already
existed.

Another important thing to mention is that those two functions _split_ and
_prop_ are curried functions that take two arguments. _split_ takes a separator
and a string, and _prop_ takes a property name and an object.

Because of the nature of composition, where the return value of a function will
be passed as an argument to the next one, each function in the composition must
expect only one argument. So when building the composition we have to partially
apply those functions that expect more than one argument. That's the importance
of currying when composing functions.

Another way to write the same composition and maybe making it a little bit more
clear to read is this way:

```javascript
var splitSpace = R.split(" ");
var findDirector = R.prop("director");
var directorsFirstName = R.compose(console.log, R.head, splitSpace, findDirector, R.head);
directorsFirstName(movies); // George
```

_split_ and _prop_ were partially applied before the composition and assigned to
_splitSpace_ and _findDirector_ respectively. Those functions now take only one
argument and can be used in the composition. **Both examples are equivalent.**

To finish, one last example. Let's find the first name of all directors in all
the movies.

Now, instead of retrieving the first item of the array, we'll be iterating over
it. Sounds like a job for _map_.

Every array has a map function, but the problem with that function is that it
will act on an instance of an array. And what we want to do is compose the _map_
function to operate on any instance of a movies array. So, we'll be using the
_map_ function provided by Ramda which is also a curried function.

Here's how it looks:

```javascript
var directorsFirstNames = R.compose(
  console.log,
  R.map(R.compose(R.head, R.split(" "), R.prop("director")))
);

directorsFirstNames(movies);
```

In the above example, we have two compositions. One that will log the results of
the mapping, and one that will be applied to every item in the array.

The idea is the same as before, but let's split that a bit to make it more
readable.

```javascript
var directorsFirstName = R.compose(R.head, R.split(" "), R.prop("director"));

var logDirectors = R.compose(console.log, R.map(directorsFirstName));

logDirectors(movies);
```

Now we have two functions; _directorsFirstName_ will return the first name of a
director from a movie object, just as before. This function is passed to the
_map_ function which is curried and is now waiting for an array of movies to be
executed.

_logDirectors_ is a function that will take the result of the mapping and log it
to the console.

Now, when we call _logDirectors_ and pass in the movies array, the _map_
functions has all the arguments it needs to execute so that it will call
_directorsFirstName_ for each of its elements.

That's neat! And again just using the power of combining functions.

And that's it for today.
