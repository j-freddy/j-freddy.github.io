---
layout: post
title: Bezier Curves
date: May 8, 2022
author: Freddy
cover_img: "blog/bezier-curves/bezier-road.png"
summary: |
  If you've ever worked with vector art, you've almost certainly come across
  Bezier curves. But what exactly are they? This article explains how to
  construct a Bezier curve, discusses where they are used, and describes
  underlying mathematics.
cover_src: "https://assetstore.unity.com/packages/tools/utilities/b-zier-path-creator-136082"
scripts: |
  <script src="../assets/js/blog/bezier-curves/point.js"></script>
  <script src="../assets/js/blog/bezier-curves/bezierCurve.js"></script>
  <script src="../assets/js/blog/bezier-curves/GUI.js"></script>
  <script src="../assets/js/blog/bezier-curves/main.js"></script>
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/bezier-curves/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

A Bézier curve is smooth and continuous.

It is not computationally expensive, so it is used in computer graphics (drawing
fonts and other vector images). It also has nice properties, for example, its
derivatives are easy to compute. Hence, its application extends to robotics and
modelling highway design.

## What is a Bezier curve?

Let's begin by linear interpolating (lerping) over 2 points. That is, we move
from 1 point to the other.

<img src="{{img_dir}}lerp.gif"
     alt="lerp-1" width="240px" class="img-thumbnail">

Now, consider 3 points **P**, **Q**, **R**. Lerp over **P** and **Q**, and lerp
over **Q** and **R**. Let's call the moving points **A** and **B**.

<img src="{{img_dir}}lerp-double.gif"
     alt="lerp-2" width="240px" class="img-thumbnail">

Now, lerp over **A** and **B**, and we get a curve!

<img src="{{img_dir}}quadratic-bezier-curve.gif"
     alt="quadratic-bezier" width="240px" class="img-thumbnail">

This is the idea behind constructing a Bezier curve. We call **P**, **Q**, **R**
our **control points**. With 3 control points, we have 2 stages of lerping to
generate a quadratic Bezier curve. We can add an additional control point, which
generates a cubic Bezier curve through 3 stages of lerping.

<img src="{{img_dir}}bezier-curve.gif"
     alt="cubic-bezier" width="240px" class="img-thumbnail">

We can keep adding control points indefinitely, although quadratic and cubic
Bezier curves are used most often.

<div class="callout callout-success">
  You can observe that, by construction, a Bezier curve is extremely
  lightweight! To define a cubic Bezier curve, you only need 4 control points.
</div>

By moving the control points, we can form all kinds of
curves. Here's an exotic curve below.

<img src="{{img_dir}}bezier-loop.gif"
     alt="cubic-bezier" width="240px" class="img-thumbnail">

We can generate further shapes by joining multiple Bezier curves together to
form **B-splines**. We will explore this later.

## Try it out yourself!

Drag the control points with your mouse.

<canvas id="my-bezier-canvas" width="300" height="240">
     Your browser does not support canvas.
</canvas>

\
([Source code](https://github.com/j-freddy/bezier-curves/tree/interactive))

## Bezier curves in vector art

Here is a path I drew in Inkscape, a vector editor.

<img src="{{img_dir}}inkscape-curve.png"
     alt="example-inkscape" width="480px" class="img-thumbnail">

Selecting the path reveals some details.

<img src="{{img_dir}}inkscape-curve-detail.png"
     alt="example-inkscape-detailed" width="480px" class="img-thumbnail">

These details reveal that the path is, in fact, 3 cubic Bezier curves fused
together. We annotate one curve below.

<img src="{{img_dir}}inkscape-curve-annotated.png"
     alt="example-inkscape-annotated" width="480px" class="img-thumbnail">

Recall how Bezier curves are lightweight: they are defined very easily. In fact,
this is how the path is defined (in the `.svg` file).

```xml
<path
  d="m 30.980769,120.80769 c 20.076924,-12.63461 30.980768,20.94231 47.25,
     -1.21154 16.269229,-22.153843 39.115381,-25.269227 36.000001,-9 -3.11539,
     16.26923 -10.21154,20.07693 -15.92308,15.23077"
  id="path1901"
/>
```

A quick count yields 10 pairs of coordinates. This makes sense, as we expect 12
control points for 3 cubic Bezier curves, but 2 points are shared.

## The maths behind Bezier curves

### De Casteljau's algorithm

Recall how we constructed Bezier curves through recursive lerping. To lerp
between 2 points $$p$$ and $$q$$, we use this equation:

$$(1 - t)p + tq \quad t \in [0, 1]$$

Let $${p_0, \ldots, p_n}$$ be the control points. Define the following
recurrence relation.

$$
\begin{align}
  &p_i^{(0)}(t) = p_i & &i = 0, \ldots, n\\
  &p_i^{(j)}(t) = (1 - t)p_i^{(j-1)} + t p_{i+1}^{(j-1)} & &i = 0, \ldots, n-j
\end{align}
$$

Intuitively, $$p_i^{(j)}(t)$$ describes the intermediary lerped points at time
$$t$$. The actual point along the Bezier curve at time $$t$$ is
$$p_0^{(n)}(t)$$, which we denote as $$B(t)$$.

### Bernstein form

By expanding the recurrence relation in De Casteljau's algorithm, we get the
explicit representation. This is the **Bernstein form**.

As a reminder, $${p_0, \ldots, p_n}$$ are the control points, and $$B(t)$$ is
our point along the Bezier curve.

$$
\begin{align}
  &B(t) = \sum_{i=1}^n b_{i, n}(t) p_i & & \\
  &b_{i, n}(t) = \binom{n}{i} (1-t)^{n-i} t^i & &\text{(Bernstein basis polynomials)}
\end{align}
$$

<div class="callout callout-danger">
  This is faster than De Casteljau's algorithm, but less numerically stable
  (that is, less accurate under perturbed input data).
</div>

In this form, it is easy to compute the derivative of any point along a Bezier
curve. This is useful in applied mechanics, for example, when the vertical
heights of roads or other platforms are modelled as Bezier curves.

$$B'(t) = n \sum_{i=0}^{n-1} b_{i, n-1}(t) (p_{i+1} - p_i)$$

## Further reading

- On a [separate blog post]({{site.baseurl}}{%- link _posts/2022-05-08-programming-bezier-curves.md -%}),
I give a tutorial on how to write a program that draws Bezier curves.
- [The Beauty of Bezier Curves](https://www.youtube.com/watch?v=aVwxzDHniEw) is
an exceptional, beginner-friendly video that discusses more properties of Bezier
curves.
