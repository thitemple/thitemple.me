---
title: "jQuery Validation Globalization with ASP.NET MVC 3"
description: "jQuery Validation Globalization with ASP.NET MVC 3"
date: "2011-09-18"
published: true
categories:
  - code
summary: Discover how to globalize the jQuery validation feature in ASP.NET MVC 3 using
  the jQuery Globalize plugin. This article provides a simple solution to
  overcome issues with date validation patterns, allowing you to adapt the
  validation to different cultures effortlessly. Follow the step-by-step guide
  and enhance your client-side validation experience.
---

ASP.NET MVC 3 has a great feature, which is client validation using jQuery
plug-in's [jQuery validations](http://docs.jquery.com/Plugins/Validation) and
using a Microsoft script the validation is made without the need of any other
special code. You just have to use the attributes from
System.ComponentModel.DataAnnotations namespace. For those who don't know, to
use this validation you just need to add the following script references (which
are included in the default template when a new Asp.Net Mvc 3 gets created):

```html
<script src="@Url.Content("~/Scripts/jquery.min.js")" type="text/javascript"></script>
<script src="@Url.Content("~/Scripts/jquery.validate.min.js")" type="text/javascript"></script>
<script src="@Url.Content("~/Scripts/jquery.validate.unobtrusive.min.js")" type="text/javascript"></script>
```

Pretty simple actually! But there is an issue, this script is not globalized.
So, let's say you have an attribute inside your class of the DateTime type and
you'd like to validate it, for instance, I had a class which among other things
had a DateTime. Just to make things simples, it was something like this:

```csharp
public class Person
{
    public string Name { get; set; }
    public string Sex { get; set; }
    public string Rg { get; set; }

    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [DataType(DataType.Date)]
    public DateTime? BirthDate { get; set; }
}
```

Having a filled in form with the date 16/09/1980, for instance, automatically it
was detected as an invalid date since the expected is a date using the pattern
mm/dd/yyyy, but of course, here in Brazil the pattern is different, it is
dd/mm/yyyy.

So how can I fix it?

First of all, I have to use the
[jQuery's plug-in Globalize](https://github.com/jquery/globalize). I just have
to add references to two scripts.

```html
<script type="text/javascript" src="@Url.Content("~/Scripts/globalize.js")"></script>
<script type="text/javascript" src="@Url.Content("~/Scripts/cultures/globalize.culture.pt-BR.js")"></script>
```

After that, all it has to be done is set the desired culture and write a small
function to parse the date using the Globalize parseDate function:

```js
Globalize.culture("pt-BR");
$.validator.methods.date = function (value, element) {
  return this.optional(element) || Globalize.parseDate(value);
};
```

It couldn't be simpler!
