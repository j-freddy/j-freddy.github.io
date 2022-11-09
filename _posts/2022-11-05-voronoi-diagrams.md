---
layout: post
title: "Voronoi Diagrams"
date: November 5, 2022
author: Freddy
cover_img: "blog/voronoi-diagrams/cover.png"
summary: |
  Back-end JavaScript and Node.js has been on the rise in recent years, so code
  performance analysis is necessary. This article presents a look into the
  performance of different ways to loop through an array in JavaScript.
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/voronoi-diagrams/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

## Introduction

A Voronoi diagram is a plane that is partitioned into multiple regions called
**cells**. It is a powerful tool that is used to render graphics such as
rippling water and 3D terrain.

We start with an arbitrary collection of points, called **seeds**.

<img src="{{img_dir}}seeds.png"
     alt="random-seeds" width="360px" class="img-thumbnail">

Then, for each pixel on the plane, give it a specific colour corresponding to
the closest seed to that pixel.

<img src="{{img_dir}}seeds-filled.png"
     alt="seeds-with-coloured-pixels" width="360px" class="img-thumbnail">

This rule is known as the **nearest neighbour classifier**: we classify each
pixel to its nearest seed. We have now created a Voronoi diagram!

<div class="callout callout-success">
  Clearly, a Voronoi diagram doesn't require much storage space: only the seeds
  are needed to uniquely define the partitions.
</div>

<div class="callout callout-info">
  <p>There are multiple ways of interpreting the construction of a Voronoi diagram.
  However, the nearest neighbour interpretation explains 2 nice features of
  these diagrams.</p>
  <ol>
    <li>Take any 2 adjacent cells, and connect the corresponding seeds to form a
    line segment. The edge of the 2 cells is a perpendicular bisector of this
    line segment.</li>
    <li>Each vertex is equidistant to 3 seeds.</li>
  </ol>
</div>

Alternatively, we can think of constructing a Voronoi diagram as the following
procedure:
1. Start with some arbitrary seeds. We can think of each seed as a circle of
   radius 0.
2. Expand the radius of each seed.
3. When the circles overlap, replace the overlapped curves with a straight line.
4. Continue to expand the radius until only straight lines are remaining on the
   plane.

The gif below demonstrates this method.

<img src="{{img_dir}}voronoi-growth.gif"
     alt="visualising-voronoi-growth" width="360px" class="img-thumbnail">

## Voronoi patterns in nature

Like the golden ratio, Voronoi patterns also appears everywhere in nature. Here
are some examples!

### Drying mud

<img src="{{img_dir}}drying-mud.png"
     alt="drying-mud" class="img-thumbnail">

### Soap bubbles

<img src="{{img_dir}}soap-bubbles.jpg"
     alt="soap-bubbles" class="img-thumbnail">

### Giraffe

<img src="{{img_dir}}giraffe.jpg"
     alt="giraffe" class="img-thumbnail">

### Honeycombs

<img src="{{img_dir}}honeycombs.jpg"
     alt="honeycombs" class="img-thumbnail">

## Time complexity analysis

<!--
- voronoi: efficiency
  - compute: Fortune's algorithm: O(n log n)
  - storage: only need to store seeds
  - efficiency in animations: move the seeds to move the cell
-->

## Application: Texturing water

<!--
  Plop the demo here.
  - animate water
  - texture water (voronoi: distance transform)
 -->

## Further reading

<!--
- further reading
  - l-systems for generating trees & fractals
  - Unity3D
  - http://www.cs.tufts.edu/comp/163/notes05/voronoi_handout.pdf
  - extension: we can use metrics other than Euclidean distance, e.g. Manhattan distance
-->
