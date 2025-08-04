---
title: Unit testing using Typescript and Mocha
description: How to setup testing using Typescript and Mocha
categories:
  - code
date: "2016-05-05"
published: true
summary: Learn how to set up unit testing in TypeScript using Mocha without the need
  for Webpack and Karma. Discover the necessary configurations, including
  installing ts-node and updating the package.json file. Simplify your testing
  setup and target ES6 with ease.
---

Not long ago I wrote a post on
[how to setup testing using Mocha, Chai, Karma, Webpack, Sinon and TypeScript](/blog/how-to-setup-testing-using-typescript-mocha-chai-sinon-karma-and-webpack/)
and although this is something I still use today, using karma and Webpack might
be an overkill scenario.

**Warning:** if you are using Webpack to bundle other things such as CSS and/or
SASS, for instance, this setup won't work for you.

Why overkill you might ask? Well, if all you're doing is writing some TypeScript
and bundling it, you don't need Webpack to load your modules, Node can do it.
And you probably don't need to load a browser, you might be writing code that is
independent of the browser, or in your tests you might be using something such
as [jsdom](https://www.npmjs.com/package/jsdom).

The configuration is straightforward, but it might take some time to find that,
so that's why I'm writing this post.

First, to load tests written in TypeScript, we need to install
[ts-node](https://www.npmjs.com/package/ts-node).

```bash
npm i ts-node -D
```

Next, what I added to scripts to the package.json file.

```json
  "scripts": {
    "test": "mocha --opts mocha.opts && rm -rf test",
    "test:auto": "mocha --opts mocha.opts --watch",
    "start": "webpack-dev-server"
  },
```

In those scripts, the important part is that I'm telling mocha to look for its
options in a mocha.opts file.

Here's that file:

```
--require ts-node/register
--reporter dot
--watch-extensions tsx,ts
app/**/*.spec.tsx
app/**/*.spec.ts
```

We have to tell mocha to require ts-node, I'm also changing the reporter, but
that's optional.

Next, I'm setting up mocha to watch for tsx and ts extension files, so that when
those change it will rerun the tests. By default, it watches only js files.

Finally, by default mocha looks for tests in a test folder and only for .js
files. I'm telling mocha to look for .spec.tsx and .spec.ts files inside the app
directory and its subdirectories.

PS: As of Node.JS 6, Node's support for ES6 features has increased a lot. That
means that when writing TypeScript code, we can set the compiler to target ES6
safely.
