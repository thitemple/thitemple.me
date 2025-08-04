---
title: Five things you should be doing on code reviews
description: Five things you should be doing on code reviews
date: "2015-10-26"
published: true
categories:
  - agile
  - code review
summary: Discover the importance of code reviews and learn about five crucial goals to
  focus on during the process. From ensuring high-quality tests and clear naming
  conventions to sharing knowledge, identifying architectural flaws, and
  fostering a learning environment, these practices will elevate your code
  review experience.
---

Code review or peer review, as is also known, is the practice of someone
different from the author of the code to review it before it's pushed and going
into production.

I have worked for many years without putting code reviews into practice. Now, I
have been doing it for a few years, and I've got to tell you, I don't want to
get back to not doing it again.

There are many and different benefits when doing code reviews, but what I want
to discuss today is what one should aim for when doing a code review.

Here are five goals, in no particular order:

1.  **Make sure there are good quality tests**: automated tests aren't just
    important, they're one of the practices that separate a professional
    developer from someone not so professional. So I'm assuming you're writing
    them. But it's important to check if the written tests have real meaning.
    Sometimes we write tests (intentionally or not) that just makes that
    freaking bullet become green. Never forget: test code is as important as
    production code.
2.  **Check for good names**: naming is hard, so when the author of the code is
    explaining it to you, make sure that what you're hearing means the same
    thing that you're reading. Sometimes we forget to rename that x variable,
    sometimes it was a lack of inspiration or even that the intent of the naming
    was not clear. It's important that other people can follow the intent of the
    code just by reading it after all the code is the living documentation. And,
    I don't know about you, but I tend to forget what I did yesterday, imagine
    trying to remember what I did last month.
3.  **Sharing the knowledge**: we can't know for sure who is going to maintain
    the code being shipped today. Maybe the author is leaving, maybe there's a
    problem or she's on vacation. It's important that somebody else has at least
    some idea about how the feature was implemented.
4.  **Watch for architectural flaws**: not everything has to be made your way,
    but if you think there's a possible flaw, that's the time to say it. An
    unnecessary dependency, too many parameters in a function, failing to
    encapsulating logic by overexposing it, all those things should be taken in
    consideration. First, try to understand why it was written that way, and if
    you think there's a better solution, say it.
5.  **Learn/teach new things**: this is not about the domain you're working on,
    it's about the tech. Maybe you know something you can teach (that hidden
    corner of the language or platform), or, you may be learning something new.
    It doesn't matter who's on the other side of the review, there's always
    something to learn and/or to teach. Be open-minded.

Those are all valid and important points, but it is also important to keep in
mind that it's not the person who wrote the code whose being reviewed, it is the
code that's being reviewed. Also, be polite, it doesn't cost a thing and you
will avoid a defensive reaction. Before saying, "this is wrong" ask why it was
written that way. Maybe there's a good reason, maybe not, then you can express
why you think it should be written in a different way.
