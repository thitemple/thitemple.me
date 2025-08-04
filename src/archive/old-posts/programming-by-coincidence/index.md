---
title: "Programming by Coincidence"
description: "Programming by Coincidence"
date: "2013-07-16"
published: true
categories:
  - career
summary: Delve into the mindset of a programmer who values continuous learning and
  understanding in the face of technical challenges. Explore the dangers of
  programming by coincidence, the limitations of repetitive solutions, and the
  importance of gaining knowledge and experience. Discover the rewards of taking
  the red pill and expanding your understanding in the ever-evolving world of
  programming.
---

I like to program, and I like the technical challenges that programming brings.
But what I like most is the constant learning that is part of the job.

Because of all that, I never understood or liked phrases like "if it works,
don't change it" or "do not touch that code because otherwise it stops working."
As someone who likes to learn, my first question is why it will crash? Or, why
can't I change it? Or, what will crash?

Information on various subjects are available very easily (for some even a
little more than others, right NSA?) Then I see no sense not to delve into
subjects. [Scott Hanselman](http://www.hanselman.com/), in a great post, said
that [the internet is not a black box](http://vintem.me/1dAms6P). Quoting a
phrase from that post that summarizes what I mean:

> Scott Hanselman: http://bit.ly/1dAms6P
>
> > The Internet is not a black box. Look inside. When coding on the web,
> > remember that effectively NOTHING is hidden from you.

NOTHING IS hidden from you, emphasis on NOTHING.

In the book
[The Pragmatic Programmer](http://www.amazon.com/gp/product/020161622X/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=020161622X&linkCode=as2&tag=tempcodi0f-20),
Andrew Hunt and David Thomas dedicated a chapter to programming by coincidence,
and they open the chapter with a very interesting metaphor. They compare a
programmer coding by trial and error, solving problems in a random way and
without knowledge of the matter to a soldier walking into a minefield. The
soldier can take one, two, several steps without stepping on a mine, think that
he's doing something right, but it's just a random walk one hour he can step on
a mine and explode.

![Minefield](./falklands-minefield1.jpg)

Another common thing we usually see when people do not understand the problem is
the tendency to solve things always the same way, it is the case of that old
phrase "if you only have a hammer every problem is a nail." It seems that it is
a magic formula, if it worked for a problem, it should work for others.

Also in this sense, one could solve a problem by passing invalid data to a
method that results in an unexpected response from the program. But if your only
source of analysis is the answer to that call with invalid data when that
program is fixed, your call will not work anymore because that coincidence was
modified.

![Coincidence](./coincidence1.jpg)

And the worst in my opinion, is the ignorance that it generates. Even today I
still see people who think POST is more secure than GET only because the data
are not sent in the URL!

**Choosing the red pill**

<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/xFhn_GUAhGU"
	title="YouTube video player"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
></iframe>

And yes, understanding and learning things is hard work, it takes time. Taking
the red pill sometimes means putting into practice to learn, or, as Yogi Berra
said one:

> Mastering knowledge alone, without experience, isn’t effective
>
> <cite>-- Yogu Berra</cite>

**But how far to go?**

This is a difficult line to draw. In general, I try to understand enough to
solve the problem I am facing and anything else I leave to read later.

For example, I was studying Backbone.js using
[this tutorial](http://vintem.me/12QNKkh). The author uses the
[AMD pattern](http://vintem.me/15yM296) implemented
[Require.JS](http://requirejs.org/). I could just follow the tutorial, and that
would solve the problem, but what I decided to do was to read a little about
Require.JS on its website to understand how it works and then read about the AMD
pattern when I had a bit more time. This tutorial also uses Node.js, so, after I
went exploring a bit about Node.js :)

Of course, there isn't a rule, and no one can tell where each one should go or
stop. It's you who should draw the line between what is required information and
what is procrastination, always trying to be pragmatic.

The most important thing is to let laziness aside and understand what you are
doing. Don't just pick the first answer on StackOverflow. After all, you also
wouldn't like that a doctor gave you a drug just because this drug worked for
stomachache on another person, and you want her to examine and tell you why this
drug will work, isn't it?
