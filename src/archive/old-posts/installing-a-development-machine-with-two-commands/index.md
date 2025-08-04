---
title: "Installing a development machine with two commands"
description: "Installing a development machine with two commands"
date: "2013-08-25"
published: true
categories:
  - powershell
  - chocolatey
summary: This article shares a script that automates the installation and configuration
  of essential applications on a development machine. By utilizing PowerShell
  and Chocolatey package manager, you can easily set up tools like Git, Ruby,
  Node.js, editors, browsers, and more with just two commands.
---

Recently I had to prepare two development machines, a new notebook with Windows
8 and a VM running Windows 7 and honestly, as much as I like a new machine,
wasting a lot of time installing applications and configuring them is not
something I find entertaining. Besides, there are always some things that I'm
not used to doing every day, and by the time I need to do it, I don't remember
how. For instance, how do I generate an RSA key for use with ssh?

Anyway, this time, instead of manually installing everything, I decided to make
a script that does all these things for me automatically. Using
[PowerShell](http://technet.microsoft.com/en-us/scriptcenter/dd742419.aspx) e
[Chocolatey](http://chocolatey.org).

![Chocolatey](./chocolateyicon.gif) I think PowerShell is well known, so I will
not spend much time with it. About Chocolatey, it is a package manager for the
Windows command prompt. It works more or less like the apt-get on Linux or brew
on the Mac. It is a free and open source tool, very interesting and is
relatively new compared to the other platforms, but it works fine in Windows and
is very practical when trying to avoid getting a bunch of installers. There's
already
[a large variety of applications available to be installed through it](http://chocolatey.org/packages).
But also, if you needed, it's very easy to create a package and publish on
Chocolatey's gallery,
[I've even created a package to install the Ruby DevKit in version 1.9.3 of Ruby](http://chocolatey.org/packages/ruby.devkit.ruby193).

OK, enough of chatting. The complete script that I created
[is available in a gist](https://gist.github.com/vintem/6334646). It is very
simple and its main parts are commented. Feel free to download and modify at
your own will.

## But what does it do?

### Install the following applications using Chocolatey

- Git
- Poshgit
- Ruby (1.9.3)
- Node.js
- WebPI
- Notepad++
- Sublime Text
- ConEmu
- Python
- .NET Framework (4.0 e 4.5)
- Putty
- Firefox
- Chrome
- Fiddler
- Filezilla
- Winrar
- MongoDB
- Nuget Package Explorer
- Skydrive
- Evernote
- Windows Installer (3.1 e 4.5)

Optionally, during the execution of the script it asks if you want to install
SQL Express 2012 (also using Chocolatey).

### Customizing PowerShell and Git Bash

I have created some aliases for both PowerShell and Git Bash, so I download them
automatically and add these customizations in their respective customization
files.

### Setting up Git

Most of the time I use the Git as my repository or when I can't use it I use
[git svn](http://git-scm.com/book/ch8-1.html) and I have some global settings
that I like to use. Some file extensions that I usually ignore, and some
specific shortcuts for Git. So I also download these settings from other gists
that I have.

### Gems and npm packages

There are some Ruby gems that I always use which I install automatically, after
that some npm packages are also installed.

### Generating a RSA key

Finally, the last thing I do is to generate an RSA key that I'll use connect
thru SSH into other terminals, or on GitHub.

## Running the script

Running the script requires two commands, but first,
[download the script from the gist](https://gist.github.com/thitemple/6334646).
After that, open **PowerShell as Administrator**. To run a script downloaded
from the internet you need to change the execution policy of PowerShell, so
type:

```bash
Set-ExecutionPolicy Unrestricted
```

After that, just run the script. Assuming it is on the desktop, execute:

```bash
~/Desktop/dev_setup.ps1
```

And that's it, you will have all the applications installed. Sometime during the
execution of the script it will ask if you want to install SQL Express and also
a password for the RSA key. But that's how you will have a developer machine
ready with only two commands.

PS: I tried to make Visual Studio 2012 to be installed automatically as well,
but honestly, there is not much documentation about it and I thought it was not
worth the work. After all, in this case the only thing needed is to mount an ISO
and follow the installation steps. For just one application I think it's OK.

If you were too lazy to go look at it, here's
[the complete script](https://gist.github.com/vintem/6334646#file-dev_setup-ps1).
