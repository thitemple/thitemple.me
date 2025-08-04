---
title: Async await with ES6/Babel and TypeScript
description:
  How to make asynchronous calls using async await with ES6/Babel and TypeScript
categories:
	- code
date: "2016-02-17"
published: true
summary:
  Learn how to enhance your asynchronous programming skills using async/await in
  JavaScript. Explore how async/await simplifies code readability and error
  handling. Discover how to use async functions with Babel and Webpack, as well
  as TypeScript, and leverage their combined power to streamline your
  development workflow.
---

Promises are an excellent way of making asynchronous calls, and they're most
definitely an improvement over working with only callbacks. Take the following
example, calling a URL that returns a movie:

```js
fetch("http://www.omdbapi.com/?t=The Matrix")
	.then((response) => {
		return response.json();
	})
	.then((movie) => {
		console.log("The movie object:", movie.Title);
	})
	.catch((reason) => {
		console.log("The reason for the erro:", reason);
	});
```

The fact that we are using methods such as then and catch make for a much more
readable code. And that's a great thing to aim for, to have a good readable
code.

## Enter async/await

Now with async/await we can make the code look even more readable.

```js
async function getMovieAsync() {
	let response = await fetch("http://www.omdbapi.com/?t=The Matrix");
	let movie = await response.json();
	console.log(movie.Title);
}
getMovieAsync();
```

So what's happening here? And does this work?

<iframe
	src="https://giphy.com/embed/3o7ZeF03Nfo2k1G3de"
	width="480"
	height="270"
	frameBorder="0"
	class="giphy-embed"
	allowFullScreen
	title="What the hell?"
></iframe>
<p>
	<a href="https://giphy.com/gifs/justin-g-3o7ZeF03Nfo2k1G3de">via GIPHY</a>
</p>

Well, underneath it's all about Promises and some syntactic sugar over them.

First, the **await** keyword can only be used inside an **async** function, like
in the above example.

Second, we can only **await** for a function that returns a Promise. In the
above example, the fetch function returns a Promise (that will be a Response
object), and the JSON function also returns a promise that will be a movie
object.

All async functions return promises. So in the case of the getMovieAsync, it
could be called as follows:

```js
async function getMovieAsync() {
	let response = await fetch("http://www.omdbapi.com/?t=The Matrix");
	let movie = await response.json();
	return movie;
}
getMovieAsync().then((movie) => console.log(movie.Title));
```

That's great and for sure it makes for a more readable code. We even have a
sense of synchronous code with a simple flow.

## What about error handling?

We have two choices. First is to use a try/catch:

```js
async function getMovieAsync() {
	try {
		let response = await fetch("http://www.omdbapi.com/?t=The Matrix");
		let movie = await response.json();
		return movie;
	} catch (err) {
		console.log(err.message);
	}
}
getMovieAsync();
```

And the second is to use the catch method on the Promise returned by the async
function, like so:

```js
async function getMovieAsync() {
	let response = await fetch("http://www.omdbapi.com/?t=The Matrix");
	let movie = await response.json();
	return movie;
}
getMovieAsync()
	.then((movie) => console.log(movie.Title))
	.catch((reason) => console.log(reason));
```

## Using it today with Babel and Webpack

Async functions are still a proposal for future versions of JavaScript, but it
can already be used with the help of a transpiler such as
[Babel](https://babeljs.io/).

Here's how I configured it to transpile my code. Keep in mind that I'm also
using [Webpack](https://webpack.github.io/) to bundle my files, so there's a
config file for that as well.

First, here are the packages I have installed using npm (I also have a polyfill
for the fetch API installed, which is not needed if you just want to use async
functions).

- babel
- babel-core
- babel-loader
- babel-polyfill
- babel-preset-es2015
- babel-preset-stage-3
- imports-loader exports-loader
- whatwg-fetch

```
npm i babel babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-stage-3 -D

npm i imports-loader exports-loader whatwg-fetch -S
```

Because async functions are still a proposal for the language, Babel does not
compile it by default, hence the babel-preset-stage-3 package.

Now in the .babelrc file, we have to configure Babel to enable stage-3 features.
Here's my file:

```js
{
  "presets": [ "es2015", "stage-3" ]
}
```

Finally, let's configure Webpack. If you don't know Webpack, I strongly advise
you to check their [site and documentation](https://webpack.github.io/docs/).

```js
module.exports = {
	entry: "./src/app.js",
	output: {
		filename: "dist/bundle.js"
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	}
};
```

And that's it.

## Multiple async calls

You know you can make multiple async calls using Promise.all right? If you
don't,
[I've recorded a video about Promises](https://www.youtube.com/watch?v=bZil2xFUf0o).

So how would that work with async? Well, using the power of
[array destructuring](http://templecoding.com/blog/2015/08/19/talking-about-es2015-destructuring/)
this becomes trivial.

```js
const p1 = fetch("http://www.omdbapi.com/?t=The Matrix");
const p2 = fetch("http://www.omdbapi.com/?t=Forrest Gump");
const [r1, r2] = await Promise.all([p1, p2]);
const [movie1, movie2] = await Promise.all([r1.json(), r2.json()]);
```

So here we are, with two promises in _p1_ and _p2_, and then we call Promise.all
passing those promises with the await keyword.

Promise.all will return an array with the responses. Again we make another call
to Promise.all using the await keyword so that we can access the JSON objects.

One more time, with the use of
[array destructuring](http://templecoding.com/blog/2015/08/19/talking-about-es2015-destructuring/)
this is easily achieved.

## Async functions with TypeScript

And what about TypeScript? How can I use async functions with it?

Async functions are part of TypeScript since version 1.7, and it work the same
way as I showed right until now.

The only problem is that for the current version of TypeScript (I'm talking
about 1.8 beta), we can only compile async functions to ES6 code, so in a
tsconfig.json file one would have something like:

```js
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs"
  },
  "exclude": [
    "node_modules"
  ]
}
```

OK, but we know we cannot yet count on browsers to have full support on ES6. So
the way to fix this is by recompiling the code generated by TypeScript.

Because I'm already using Webpack, I'm going to configure it to compile the code
using Babel after it was compiled by TypeScript. So I can have the power of
TypeScript's typing and still use async functions.

To do that, let's begin by installing TypeScript locally and a loader for
Webpack.

```
npm i typescript ts-loader -D
```

Now, let's make some changes to the Webpack config file.

```js
module.exports = {
	entry: "./src/app.ts",
	output: {
		filename: "dist/bundle.js"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ""]
	},
	plugins: [
		new webpack.ProvidePlugin({
			fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"
		})
	],
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader!ts-loader"
			}
		]
	}
};
```

So, the main changes are:

- The resolve key is where I informed what extensions that should be recognized
  by Webpack.
- And the loader, which now compiles the .ts files using TypeScript and after
  that compiles them using Babel. (Ps: the loaders on Webpack work from right to
  left).

That's all. Now we can have the power of TypeScript and use async functions.

```js
interface Movie {
	Title: string;
}

async function load(): Promise<Movie> {
	try {
		let response: Response = await fetch("http://www.omdbapi.com/?t=The Matrix");
		let movie: Movie = await response.json();
		return movie;
	} catch (err) {
		console.log(err.message);
	}
}

load().then((movie) => console.log(movie.Title));
```

And that's it for today.
