---
layout: post
title: "On the Philosophy and Design Choices of this Site"
date: January 26, 2023
author: Freddy
cover_img: "blog/site-philosophy/donuts.png"
summary: |
  Why does this site look the way it looks? In this article, I explain my
  choices and my vision, as well as a look into the web frameworks and tools
  used.
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/site-philosophy/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

Ever since I started dabbling with HTML&CSS, I've always liked the idea of
coding up my own website portfolio. Creating a website is all cool - I don't aim
to create something extremely fancy or technically difficult (I save them for
other projects!). Plus, I have sufficient experience in web development to pick
up new frameworks comfortably. The struggle is creating a site I'm satisfied
with. After all, this is a personal site and despite not looking for something
overly fancy or decorated, I want it to be distinct, reflective and
representative. This is my 3rd attempt at designing my personal site, and I'm
looking to get it right this time!

<div class="callout">
  My 1st site is hosted at
  <a href="https://imptj.github.io">https://imptj.github.io</a>,
  which now acts as a redirect. However, you can still dig it up in version
  control as the repository is publicly available.<br /><br />
  
  My 2nd site used to be hosted with this url, but is now archived
  <a href="https://github.com/j-freddy/old-site">here</a>.
</div>

## Philosophy

Before starting, I wanted to establish a firm vision: to create a site that
presents and maintains my identity. This stemmed from my dissatisfaction with
previous personal sites.

I wanted to be reflected within my site: the designs, colours, backgrounds etc.
are to be crafted with precision and care.

I also have a side vision: to write and maintain articles. I grow increasingly
frustrated at all these online resources with amazing content plagued by rubbish
design or artifical distractions (e.g. ads or pop-ups that ask readers to
subscribe to their weekly newsletter). I pledge to provide insteresting,
accessible and beginner-friendly<sup>[[1]](#note1)</sup> content presented
in a clean, minimalistic environment.

<sup><a name="note1">[1]</a> For the most part. At least, for the starting
sections of each article.</sup>

<div class="callout callout-success">
  The width of these blog posts are designed for easy reading. Obviously if the
  text spanned the entire screen, it becomes hard to read i.e. moving to the
  next line. So what is the ideal width?<br /><br />

  I adopt a similar width to 80 characters per line. This is standard pratice
  for most programming languages these days, and is thought to have been
  inherited from teletypewriters that support 70-80 characters per line. This
  was then adopted by IBM who developed punched cards consisting of 80
  characters per line.
</div>

Finally, my site should not feel gloomy. The greyscale theme on a previous
iteration was a big flaw.

<img src="{{img_dir}}old-site.png"
     alt="old-site" class="img-thumbnail">

## Frameworks, tools and APIs

### Jekyll

[Jekyll](https://jekyllrb.com/) is a powerful static site generator that allows
you to easily manage site resources. It also comes with built-in packages to
create and maintain blog posts easily. Finally, it comes with Liquid: a template
language that allows loops and conditions within HTML, providing capabilities
akin to Jinja for Flask and Django.

For this site, I opted with the default Jekyll template theme: Minima. I chose
not to use a pre-built theme, as I want to follow my vision statement and fully
customise my site. Using a minimalistic template is nice, however, as in a
previous iteration I chose to set up Jekyll from scratch and in retrospect it
was time-consuming writing boiler-plate code (although a good learning
experience!).

<div class="callout callout-warning">
  Jekyll is a site generator. You need good web development fundamentals to use
  it, i.e. fluency in HTML, CSS and JavaScript.
</div>

### BootStrap

[BootStrap](https://getbootstrap.com/) is a powerful frontend toolkit. For the
most part, I leverage BootStrap's utility features and restyle built-in
components like buttons and pills. It also offers good support for creating
dynamic components (i.e. the site is compatible for computers and mobile
devices).

### SCSS

[Syntactically Awesome Style Sheets](https://sass-lang.com/) offers useful
utilities like macros for CSS (similar to C macros, or functions). I use it as a
step-up from vanilla CSS.

### Colour

[Open color](https://yeun.github.io/open-color/) is a colour scheme that I
regularly adopt whenever I find colour presentation important, e.g. presentation
slides.

My site's main colours are:

<img src="{{img_dir}}palette.svg"
     alt="palette" width="540px" class="img-thumbnail">

### Font Awesome

[Font Awesome](https://fontawesome.com/) is a library that provides free,
minimalistic vector icons that I sprinkle on my site.

## More random information

### Airplanes

The airplanes background that appears on all pages (except blog posts) is a
cropped vector trace using Inkscape. The original image is shown below. I used
to use it as my Desktop wallpaper.

<img src="{{img_dir}}bg-og.jpg"
     alt="airplanes-background" class="img-thumbnail">

### Donut

The donut background that appears on the home page comes from a fan illustration
of Donut Hole by Hachi (see 2:53 of
[video](https://www.youtube.com/watch?v=vfN-NBBfpPY)).

### Blog cover

The background from the main blog page is also a cropped vector trace using
Inkscape. The original image is a photo I took of some birds.

<img src="{{img_dir}}birds.jpg"
     alt="birds-background" class="img-thumbnail">

### Earmuffs

I wear earmuffs when cold.

And that's it on the philosophy and design choices of my site! Now try to find
the easter eggs. :)
