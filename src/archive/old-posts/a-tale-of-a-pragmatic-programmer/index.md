---
title: A tale of a Pragmatic Programmer
description: Some of the lessons I've learned after reading The Pragmatic Programmers book.
categories:
  - books
date: "2016-01-27"
summary: Dive into the timeless wisdom of "The Pragmatic Programmer" book and discover
  valuable insights that every programmer should know. Explore topics such as
  software entropy, avoiding gradual pitfalls, the importance of refactoring,
  and taking pride in your work. Learn from the experiences shared in this
  engaging article.
published: true
---

[The Pragmatic Programmers](https://amzn.to/1KGgBxX) is a technical book
from 1999. Actually, to consider it just a technical book does not do justice to
the book. In my opinion, it's a timeless compilation of solutions, tips and
wisdom that every programmer that cares about his or her craft should read.

[![](https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=020161622X&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=tempcodi0f-20)](https://www.amazon.com/gp/product/020161622X/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=020161622X&linkCode=as2&tag=tempcodi0f-20&linkId=6QYSJR2Z4HZWZZUQ)

I'm not writing a review of the book, and I'm sure you can quickly find many of
those. This is I, sharing some of what I learned from reading the book for the
second time.

The book is divided into self-contained sections, so one does not need to read
the book from cover to cover. But I'm sharing some lessons I learned that are
related to one another. Of course, this is not a complete overview of the book,
but I'm sure you got the idea.

Let's start with...

## Software Entropy

In software entropy, we learn that when disorder increases, the software tends
to rot.

> Researchers in the field of crime and urban decay discovered a fascinating
> trigger mechanism, one that very quickly turns a clean, intact, inhabited
> building into a smashed and abandoned derelict. A broken window.

The "Broken Window Theory" was also used by the police of New York to fight
crime. The lesson is simple: fix the small problems to avoid the big ones.

The same lesson can be applied to us when writing code. You might think that
this is just a small patch, a mere _if_, just a _magic string_ that will do no
harm. The next developer that touches that code will see that and think, well,
if it was done before by another one, I'm sure I can do that as well.

That's when the disorder starts to grow.

Which leads us to...

## Stone Soup and Boiled Frogs

> ... they say that if you take a frog and drop it into boiling water, it will
> jump straight back out again. However, if you place the frog in a pan of cold
> water, then gradually heat it, the frog won't notice the slow increase in
> temperature and will stay put until cooked.

I guess this sounds familiar, I bet we have all been cooked slowly (at least)
once. I'm sure I have.

It all starts with simple changes, those that almost never will do any harm, but
then, you combine those with some other ones. "I'm just going to inherit this
class" they say, or "why not just copy, paste and make some adjustments" you
hear, "just do it quickly, we'll come back later and clean it up afterwards".
The examples could go on.

After a while, you're surrounded by boiling water, and there's nothing left to
do: you're cooked.

So to avoid that, let's do some...

## Refactoring

In 1999, refactoring might have been a new thing, a new idea, in theses days,
not so much.

The lesson here - that should also be a mantra - is that Pragmatic Programmers
always leave code better than they found. If you see something that can be
improved, do it. You know the drill, if you see:

- magic numbers and or strings, create constants
- case statements that could become a more extendable pattern
- large functions or classes that can be split
- functions with a large count of parameters
- poorly named variables and functions
- missing unit tests
- and the list could go on

So, when you're ready to commit your changes, be sure not to leave any broken
windows behind. And if you are working on a code base that's not in a good
shape, make sure that the changes you're making aren't just fixing some bug or
adding some new feature, they're also making the code look better and more
maintainable.

Refactoring is also about been proud of your work, bit by bit.

And talking about been proud, we should all have...

## Pride and Prejudice

> Pragmatic Programmers don't shirk from responsibility. Instead, we rejoice in
> accepting challenges and in making our expertise well known. If we are
> responsible for a design, or a piece of code, we do a job we can be proud of.

Every commit is you signing your work. Every time you change something, your job
might be subject of some other developer evaluating it.

Write something you can be proud of, that you can stand behind. You might not
own the code, and certainly we don't want code that belongs to a company to be
owned by one individual. But you should feel good about yourself next time
you're making a change, after all, it was a **well thought crafted piece of
code**.
