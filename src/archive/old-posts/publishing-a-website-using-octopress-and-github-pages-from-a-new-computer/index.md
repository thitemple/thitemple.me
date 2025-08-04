---
title: "Publishing a website using Octopress and GitHub Pages from a new computer"
description: Publishing a website using Octopress GitHub pages from a new computer
date: "2013-09-03"
published: true
categories:
  - octopress
  - github-pages
summary: This article provides a step-by-step guide on how to publish a website using
  Octopress and GitHub Pages. It specifically addresses the issue of deploying
  updates to the site after cloning the repository on a new machine, offering a
  solution involving a force push.
---

OK, I admit, this post is very specific and it serves more so that I will
**never again** forget how to do this.

This blog is hosted on [GitHub Pages](http://pages.github.com) and is done only
with HTML, no CMS is behind it. But I use [Octopress](http://octopress.org) to
generate HTML files for me.

Everything works great, and this post is not about how to use nor Octopress or
GitHub pages, their documentation is very clear and not many steps are needed to
have a website on GitHub pages for free.

Anyway, when you publish a site on GitHub pages, the code is hosted on GitHub
and visible in the master branch and the generated and processed pages are in a
branch called gh-pages.

## The problem

Everything worked perfectly until I had to make a clone of the repository on
another machine (since I've changed my computer) and had to publish an update to
the site.

These are the steps that were performed:

```bash
git clone git@github.com:usuario/repositorio.git

bundle install #to install the ruby dependencies
```

```bash
rake setup_github_pages
```

The above command creates the directory \_deploy and also a local branch
`gh-pages`.

After I've done my changes I tried to deploy:

```bash
rake gen_deploy
```

And I received the following error:

```bash
! [rejected]     gh-pages -> gh-pages (non-fast-forward)
```

And it also said that the repository has not been updated.

## The solution

After much searching, and because a `git pull` has not solved the problem, I
decided to do a `force push` to deploy it.

For that, I opened the `Rakefile` file and edited the push task. Where it was:

```ruby
system "git push origin #{deploy_branch}"
```

I changed to:

```ruby
system "git push origin +#{deploy_branch}"
```

Note the + sign there, it will make a force push and solve the problem. After a
deployment using the force push, I went back to the task as it was before and
everything started to work normally again.
