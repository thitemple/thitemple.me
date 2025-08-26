---
title: How to setup testing using Typescript, Mocha, Chai, Sinon, Karma and Webpack
description: How to setup testing using Typescript, Mocha, Chai, Sinon, Karma and Webpack.
categories:
  - code
date: "2016-02-02"
published: true
summary: Learn how to set up a testing project using TypeScript, Mocha, Chai, Sinon,
  Karma, and Webpack. Follow a step-by-step guide to configure the necessary
  packages and files, including the Webpack config file, Karma configuration
  file, and TypeScript config file. Explore sample test examples and start
  running tests with ease.
---

Sometimes in our field putting together the pieces of the puzzle is a hard task,
especially with the always moving forward nature of open source software.

So here's how I managed to setup a testing project using Typescript, Mocha,
Chai, Sinon, Karma and Webpack.

**TL/DR:**
[The code is available on GitHub.](https://github.com/thitemple/TypescriptMochaWebpackDemo)

## The NPM packages

Let's start with the packages we have to install.

```bash
npm install typescript webpack ts-loader chai karma karma-chai karma-mocha karma-phantomjs-launcher karma-sinon karma-typescript-preprocessor2 karma-webpack mocha phantomjs-prebuilt sinon --save-dev
```

## The Webpack config file: webpack.config.js

It is a pretty straight forward Webpack config file, where I set up an entry
point to the `src\app.ts` file and, an output to a bundle.js file. Also, I changed
the supported extensions, and I configured the ts-loader to compile the
Typescript files.

```js
module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "dist/bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ""]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  }
};
```

## The karma configuration file: karma.conf.js

This is the tricky part: the karma config file.

```js
var webpackConfig = require("./webpack.config");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai", "sinon"],
    files: ["test/*.ts"],
    exclude: [],
    preprocessors: {
      "test/**/*.ts": ["webpack"]
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    singleRun: false,
    concurrency: Infinity
  });
};
```

Check out the files property. The only files included are the test files and, in
the case of this example, all test files are in a test directory.

Why is that? Well, that's because of the nature of Webpack. Webpack works with
entry points and, it will look for the dependencies of those entry points, build
and bundle them. When testing, the entry point **is the test file**. So, no need
to add the test subject files, they will be loaded by Webpack.

In frameworks we have to specify mocha, chai and sinon as the frameworks we'll
be using.

The last thing I want to point out to this file is the Webpack configuration.

First, we have to tell karma to pre-process all test files using Webpack.

Next we have to configure Webpack itself, we could copy and paste the code from
the Webpack config file, but we don't want to repeat ourselves, right? So we can
import the Webpack config file and reuse its configurations.

## The Typescript config file: tsconfig.json

This file is also pretty straight forward. The most important setting is a
module. Because Webpack does not support ES6 modules (Version 2 will support
them), we have to compile the modules to CommonJS. Besides that, there's nothing
special to do here.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs"
  },
  "exclude": ["node_modules"]
}
```

## Type definitions

If you are using Typescript, I imagine you'll need the type definitions from the
libraries you're using. I'm using TSD to manage those. I won't get into the
details, but TSD is an easy way to query, install and maintain those type
definitions.

To use it, you have to install it globally using node. With tsd installed we can
install the types with the commands:

```bash
tsd init
tsd install mocha chai sinon -s
```

## Starting the tests

To keep it simple to start the tests, I added a test script to the package.json
file. So, to run the tests all one have to is: _npm test_

## The tests

This post is not about how to write tests, and it's about how to set up the
infrastructure before testing.

In any case, here are a few examples I wrote.
[You can find this complete project on GitHub](https://github.com/vintem/TypescriptMochaWebpackDemo).

#### MoviesViewModel.ts:

```ts MoviesViewModel.ts
import { Movie, movieDataService } from "./MovieDataService";

export default class MoviesViewModel {
  movies: Array<Movie>;
  selectedMovie: Movie;

  constructor() {
    this.movies = movieDataService.loadMovies();
  }

  select(movie: Movie) {
    this.selectedMovie = movie;
  }

  rate(rating: number) {
    this.selectedMovie.rating = rating;
    movieDataService.save(this.selectedMovie);
  }
}
```

#### MovieDataService.spec.ts:

```ts MovieDataService.spec.ts
import MoviesViewModel from "../src/MoviesViewModel";
import { movieDataService, Movie } from "../src/MovieDataService";
import { expect } from "chai";

describe("MoviesViewModel", () => {
  let viewModel: MoviesViewModel;
  let movieDataServiceStub: Sinon.SinonSpy;
  beforeEach(() => {
    sinon.stub(movieDataService, "loadMovies").returns([new Movie("The Matrix", 1998, 5)]);
    movieDataServiceStub = sinon.spy(movieDataService, "save");
    viewModel = new MoviesViewModel();
  });

  afterEach(() => {
    sinon.restore(movieDataService.loadMovies);
    sinon.restore(movieDataService.save);
  });

  it("should load movies", () => {
    expect(viewModel.movies.length).to.be.equal(1);
  });

  it("should be able to select a movie", () => {
    viewModel.select(viewModel.movies[0]);
    expect(viewModel.selectedMovie).to.be.equal(viewModel.movies[0]);
  });

  it("should save rated movie", () => {
    viewModel.select(viewModel.movies[0]);
    viewModel.rate(4);
    expect(movieDataServiceStub.called).to.be.true;
  });
});
```

And that's it, I hope it's useful.
