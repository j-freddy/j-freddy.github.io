---
layout: post
title: Bezier Curves
date: April 19, 2022
author: Freddy
cover_img: "blog/bezier-curves/bezier-road.png"
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/bezier-curves/" -%}
</div>

<span id="blog-summary">
If you've ever worked with vector graphics, you've almost certainly come across
Bezier curves. But what exactly are they? This article introduces the idea
behind a Bezier curve and discusses its applications.
</span>

A Bézier curve is smooth and continuous.

It is not computationally expensive, so it is used in computer graphics (drawing
fonts and other vector images). It also has nice properties, for example, its
derivatives are easy to compute. Hence, its application extends to robotics and
modelling highway design.

## What is a Bezier curve?

Let's begin by linear interpolating (lerping) over 2 points, **A** and **B**.
Call this point **P**.

<img src="{{img_dir}}temp-1.gif"
     alt="lerp-1" width="240px" class="img-thumbnail">

We add another point **C**, and also lerp over **B** and **C**, which we call
**Q**.

<img src="{{img_dir}}temp-1.gif"
     alt="lerp-2" width="240px" class="img-thumbnail">

Now, lerp over **P** and **Q**, and we have a curve!

<img src="{{img_dir}}temp-2.gif"
     alt="quadratic-bezier" width="240px" class="img-thumbnail">

This is the idea behind constructing a Bezier curve. With 3 initial points, we
have 2 stages of lerping to generate a quadratic Bezier curve. We can add
another initial point **D**, which requires 3 stages of lerping to generate a
cubic Bezier curve.

<img src="{{img_dir}}temp-3.gif"
     alt="cubic-bezier" width="240px" class="img-thumbnail">

We can keep adding points indefinitely, although quadratic and cubic Bezier
curves are used most often. You can observe, by construction, a Bezier curve is
extremely lightweight! To define a cubic Bezier curve, you only need 4 points.

## Bezier curves in vector art

Here is a path I drew in Inkscape, a vector editor.

<img src="{{img_dir}}inkscape-curve.png"
     alt="example-inkscape" width="480px" class="img-thumbnail">

Selecting the path reveals some details.

<img src="{{img_dir}}inkscape-curve-detail.png"
     alt="example-inkscape-detailed" width="480px" class="img-thumbnail">

These details reveal that the path is, in fact, composed of 3 cubic Bezier curves.
We annotate one curve below.

<img src="{{img_dir}}inkscape-curve-annotated.png"
     alt="example-inkscape-annotated" width="480px" class="img-thumbnail">

Recall how Bezier curves are lightweight: they are defined very easily. I
opened the path in a text editor, and copied the relevant snippet below.

```xml
<path
  d="m 30.980769,120.80769 c 20.076924,-12.63461 30.980768,20.94231 47.25,
     -1.21154 16.269229,-22.153843 39.115381,-25.269227 36.000001,-9 -3.11539,
     16.26923 -10.21154,20.07693 -15.92308,15.23077"
  id="path1901"
/>
```

A quick count yields 10 pairs of coordinates. This makes sense, as we expect 12
points for 3 cubic Bezier curves, but 2 points are shared.

## Try it out yourself!

<!-- This might be viable -->
<!-- assets/js/bezier-curve/script.js (probably better as multiple files) -->
<!-- Or -->
<!-- assets/js/bezier-curve.js -->
<canvas id="my-bezier-canvas" style="border: 1px solid black">
</canvas>

## Further reading

[code Bezier curve]({{site.baseurl}}{%- link _posts/2022-04-22-programming-bezier-curves.md -%})

- using polynomials to define the curves
  - De Casteljau's algorithm (recursive) is slower but more numerically stable
- features of Bezier Curves (e.g. easily find derivatives)
- applications
