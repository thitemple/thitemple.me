---
title: Creating TypeScript typings for existing React components
description: Creating TypeScript typings for existing React components
date: "2016-03-31"
categories:
  - typescript
  - typings
  - react
comments: true
summary: Learn how to create TypeScript typings for existing React components to
  enhance type safety and improve development experience. This article covers
  adding typings to an open-source project and creating internal type definition
  files for components used in your project. Start using TypeScript with
  confidence!
published: true
---

There are a lot of React components available on-line, and if you're using
TypeScript with React, it can't sometimes be a little disappointing because many
of those components don't have their type definitions.

Fear not, creating a type definition file is easy, and because you have already
saved some time at work using a component built by somebody else, maybe you can
use that time and collaborate creating the type definition file for the
component.

In my case, I was working with the
[react-selectize](https://github.com/furqanZafar/react-selectize) component.

I will explain how to add typings for an existing OSS project in case you'd like
to contribute to a project, and also, in the end, I'll explain what is the
difference if you just want to add the typings to your project.

## The package.json file

When adding typings, the easiest way for TypeScript to recognize it, is by
adding a key to the package.json file. Like so:

```json
{
	// ....
	"typings": "./dist/index.d.ts"
}
```

In this case, I'm assuming that when the package is deployed there will be a
folder with an index.d.ts file in it.

If TypeScript does not find a typings key in the package.json file, it will look
for an index.d.ts file in the root of the package's folder.

## The type definition file

Now, on to the d.ts file itself. Here's how we define a type for a React
component.

```js
import * as React from "react";

declare class SimpleSelect extends React.Component<SimpleSelectProps, any> {}

// ...
```

First of, what is the **declare** keyword? Well, inside a d.ts file we cannot
have _actual code_, just type definitions, so, we can't have a class, but we
have to **declare** that a class exists and that's how we do it.

Of course, a component extends from React.Component, and using TypeScript's
generics we declare what is the type of the component's props (in this case
SimpleSelectProps) and the component's state type (in this case any).

As users of the component, we don't care about its state. Just the props which
is the interface we'll be using, so we can declare the state as any.

Now the SimpleSelectProps is an interface with all the possibilities of the
component. If you're lucky, the component you're using will have documentation
you can use as a guide for creating the interface. Otherwise, you'll have to
check the code.

```js
export interface SimpleSelectProps {
  autofocus?: boolean;
  cancelKeyboardEventOnSelection?: boolean;
  className?: string;
  createFromSearch?(items: OptionValue[], search: string): OptionValue;
  defaultValue?: OptionValue;
  delimiters?: [any];
  disabled?: boolean;
  // ...
}
```

Don't forget that if an attribute is not required it should have an ? to
indicate that it's optional.

In the case of react-selectize, it has two components, a SimpleSelect and
MultipleSelect, that's why there's no _export default_. If there were only one
component it could be exported by default like this:

```js
declare class SimpleSelect extends React.Component<SimpleSelectProps, any> {}
// ...
export default SimpleSelect;
```

And that's it for this case.

## Creating an internal (to your project) type definition file

Now, if you just want to add some types for a component you're using in your
project and can't or don't want to modify the original package, you can add a
.d.ts file anywhere in your project, as long as that file is not excluded by the
tsconfig.json file configuration.

In this file, you will create a module with the same name as the package you're
using. Let's use the same example, the react-selectize.

So, if you'd use the component like this:

```js
import { SimpleSelect } from "react-selectize";
```

You'll be creating a module with the same name:

```js
declare module "react-selectize" {
	// type definitions goes here
}
```

All the type definitions will be the same as before, with one exception the
class declaration. Here we don't need the keyword **declare**.

```js
// ...
class SimpleSelect extends React.Component<SimpleSelectProps, any> {}
// ...
```

And that's it for today.
