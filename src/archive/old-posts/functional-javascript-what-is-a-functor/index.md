---
title: Functional JavaScript - What is a Functor?
description: Understand in a very simple way what is a Functor
date: "2016-06-16"
categories:
  - javascript
  - functional programming
  - functor
  - ramda
published: true
summary: Explore the concept of functors in functional programming with JavaScript.
  Learn how functors can help solve common coding problems in a functional
  style, such as handling null or undefined values. Dive into examples and
  understand the principles behind functors.
---

When you first start looking into functional programming, you hear a lot of
scary terms such as functors, monads, monoids, lift, fold, etc. Some of those
things are sort of complicated to understand if you don't have a master's degree
in Math, others are not that complex. In any case, those things are generally
very useful.

Many times you don't even have to know what the terminology means, we just use
it and follow with our life. For instance, in languages that are purely
functional or have a functional first approach, things like Functors are part of
the language, and we don't have to worry about them.

That's not the case of JavaScript as we have to write our Functors, or use a
library that does it for us.

## Why would you care?

Well, because functors help us solve a lot of problems when writing code in a
functional style. We can use functors to manage null or undefined, to handle
errors, to make async calls, among other things. They are an important piece of
any functionally styled application.

## So what is it?

And please, not the math explanation...

Simply put, a functor is a value (in JS it's an object) that:

1.  Has a map method that expects a function
2.  The expected function can return any kind of value
3.  The map function will return another functor of the same type (as the
    original functor)

## I still don't get it, give me an example

Let's see one of the most simple Functors, the Maybe.

Maybe is used to handle null and undefined values, so our code won't break if we
have one of those. Let's see an example of how to use Maybe:

```js
const movie = new Maybe({ title: "Star Wars" });
```

Also, it's common to have an _of_ function to help us create the Maybe value.

```js
const movie = Maybe.of({ title: "Star Wars" });
```

Ok, that's good! Now the rule number one says that a Functor must have a method
called map that expects a function as a parameter. And rule number two says that
function must return any kind of value. So let's put that to use:

```js
const getMovieTitle = (movie) => movie.title;

const movie = Maybe.of({ title: "Star Wars" });

const movieTitle = movie.map(getMovieTitle); // Maybe('Star Wars');
```

Here we have a getMovieTitle function that receives a movie and returns its
title. We pass that function to the map method. And the map method will call the
given function if inside the Maybe value (in this case the variable movie),
there's a value that is not null nor undefined.

Finally, the map function will return another Maybe value containing the result
of the getMovieTitle function, which will be a Maybe with the value 'Star Wars'.

That's it. That's what a Functor is.

Here's how one could write the Maybe Functor:

```js
const Maybe = function (val) {
	this.__value = val;
};

Maybe.of = function (val) {
	return new Maybe(val);
};

Maybe.prototype.map = function (f) {
	return this.__value !== null && this.__value !== undefined
		? Maybe.of(f(this.__value))
		: Maybe.of(null);
};
```

What we have here is a constructor that will save a value, in a "private"
variable. Then the _of_ function will be used to help us create new Maybe
values. And finally, the real purpose of the Maybe functor that is its map
function, which will check for null or undefined and call the function passed in
as the argument.

See how the map function respects the third rule? It will always return another
Maybe, be that with the returned value from the function or with null.

## But I've heard that a Maybe is a Monad

Well, Maybe could be a Monad as well. It only has to implement its interface and
follow its rules. If you know a language like C# or Java, it's the same as
having a class that implements two different interfaces. So yeah, you can have a
Maybe value that is a Functor and also a Monad.

## A note about classes in JavaScript

I'm about to commit a functional heresy here. In JavaScript
[a class is just some syntactic sugar](/blog/talking-about-es15-classes/) over a
constructor function. So one could write the Maybe Functor using a class, like
this:

```js
class Maybe {
	constructor(val) {
		this.__value = val;
	}

	map(f) {
		return this.__value !== null && this.__value !== undefined
			? Maybe.of(f(this.__value))
			: Maybe.of(null);
	}

	static of(val) {
		return new Maybe(val);
	}
}
```

The results of this and the previous example are the same.

And why is that a functional heresy you might ask? Well, because in functional
programming is about functions, and classes are from another paradigm, they're
from OOP and, although we can mix both and the results are the same, we should
write code for the next person reading it. If you agree with your teammates that
those types can be written using classes, then it's OK.

## What's next

Next, I'll be talking about how to put a few Functors into practice.
