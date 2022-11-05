---
layout: post
title: "Voronoi Diagrams"
date: November 5, 2022
author: Freddy
cover_img: "blog/benchmarking-loops-in-javascript/timer.png"
summary: |
  Back-end JavaScript and Node.js has been on the rise in recent years, so code
  performance analysis is necessary. This article presents a look into the
  performance of different ways to loop through an array in JavaScript.
---

<!-- <div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/benchmarking-loops-in-javascript/" -%}
</div> -->

<span id="blog-summary">{{ page.summary }}</span>

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
