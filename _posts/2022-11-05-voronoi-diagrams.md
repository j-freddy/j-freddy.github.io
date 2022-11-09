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

Alternatively, we can think of constructing a Voronoi diagram as the following
procedure:
1. Start with some arbitrary seeds. We can think of each seed as a circle of
   radius 0.
2. Expand the radius of each seed.
3. When the circles overlap, replace the overlapped curves with a straight line.
4. Continue to expand the radius until only straight lines are remaining on the
   plane.

The gif below demonstrates this interpretation.

<img src="{{img_dir}}voronoi-growth.gif"
     alt="visualising-voronoi-growth" width="360px" class="img-thumbnail">

## Properties of Voronoi diagram

## Voronoi patterns in nature

## Try it out yourself!

## Time complexity analysis

## Application: Texturing water

## Further reading

<!--

- [short] introduction
  - show example
  - show patterns arising in nature: giraffe, drying mud, bubbles
  - applications: water & 3D terrain generation
- voronoi: fundamentals
  - start with 2 points (seeds)
  - expand radius until they overlap
  - overlap => draw a line
  - we have created Voronoi cells
  - https://upload.wikimedia.org/wikipedia/commons/d/d9/Voronoi_growth_euclidean.gif
- voronoi: properties
  - edges: same distance
  - vertices: same distance
- Try it yourself!
  - extension: we can use metrics other than Euclidean distance, e.g. Manhattan distance
- voronoi: efficiency
  - compute: Fortune's algorithm: O(n log n)
  - storage: only need to store seeds
  - efficiency in animations: move the seeds to move the cell
- voronoi: distance transform
  - can be used to texture water
- voronoi: revisiting applications
  - animating water
- further reading
  - l-systems for generating trees & fractals
  - Unity3D

-->
