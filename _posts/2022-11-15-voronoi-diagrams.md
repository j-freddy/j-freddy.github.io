---
layout: post
title: "Voronoi Diagrams"
date: November 15, 2022
author: Freddy
cover_img: "blog/voronoi-diagrams/cover.png"
summary: |
  Voronoi diagrams are essential in the world of technology. Its applications
  cover computer graphics, medical diagnosis, network analysis and fluid
  dynamics. In this article, we introduce the fundamentals of Voronoi diagrams
  and analyse one application in graphics: texturing and animating water.
scripts: |
  <script src="../assets/js/blog/voronoi-diagrams/utils.js"></script>
  <script src="../assets/js/blog/voronoi-diagrams/point.js"></script>
  <script src="../assets/js/blog/voronoi-diagrams/seed.js"></script>
  <script src="../assets/js/blog/voronoi-diagrams/voronoi.js"></script>
  <script src="../assets/js/blog/voronoi-diagrams/main.js"></script>
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

For each pixel on the plane, give it a specific colour corresponding to the
closest seed to that pixel.

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

Alternatively, we can think of constructing a Voronoi diagram as the following:

1. Start with some arbitrary seeds. We can think of each seed as a circle of
   radius 0.
2. Expand the radius of each seed.
3. When the circles overlap, replace the overlapped curves with a straight line.
4. Continue to expand the radius until only straight lines are remaining on the
   plane.

The gif below demonstrates this.

<img src="{{img_dir}}voronoi-growth.gif"
     alt="visualising-voronoi-growth" width="360px" class="img-thumbnail">
<br />
<small>
  Source: https://commons.wikimedia.org/wiki/File:Voronoi_growth_euclidean.gif
</small>

## Voronoi patterns in nature

Like the golden ratio, Voronoi patterns appears everywhere in nature. Here are
some examples!

### Drying mud

<img src="{{img_dir}}drying-mud.png"
     alt="drying-mud" class="img-thumbnail">
<small>
  Source: http://www.geo.cornell.edu/geology/classes/Geo101/101images_fall.html
</small>

### Soap bubbles

<img src="{{img_dir}}soap-bubbles.jpg"
     alt="soap-bubbles" class="img-thumbnail">
<small>
  Source: https://www.physics.upenn.edu/duriangroup/multimedia/klebert/Foam1.jpg
</small>

### Giraffe

<img src="{{img_dir}}giraffe.jpg"
     alt="giraffe" class="img-thumbnail">
<small>
  Source: https://photostockeditor.com/image/giraffe-brown-giraffe-eating-grass-wildlife-59043
</small>

### Honeycombs

<img src="{{img_dir}}honeycombs.jpg"
     alt="honeycombs" class="img-thumbnail">
<small>
  Source: https://unsplash.com/photos/gi1f13S1-64
</small>

## Application: Texturing water

<!--
  Plop the demo here.
  - animate water
  - texture water (voronoi: distance transform)
 -->

To extend a simple Voronoi diagram to emulate water, we have 2 sub-problems.

1. Animate the Voronoi diagram.
2. Shade each cell to resemble water.

Animating the diagram is easy. We can simply move the seeds about. We can
approach this by giving each seed a velocity, and in each frame randomly perturb
the velocity.

To texture the cells, we can use the distance transform to map each pixel to a
shade of colour.

$$f(x, y) = \min{ \left\{0, 1 - \left(\frac{d}{w}\right)^2 \right\} }$$

$$d = \min_{s \in \text{seeds}} { \sqrt{ \left( x - x_s \right)^2 + \left( y -
y_s \right)^2 } } $$

For each pixel, let $$x, y$$ be its position. Then, $$d$$ is the distance from
the pixel to the nearest seed.

Here, $$f$$ is a function that outputs the alpha value of the pixel.
Conventionally, the distance transform is inversely proportional to the square
of the distance, but other exponents also produce decent water textures.

$$w$$ is an arbitrary constant. We can interpret this as the maximum size of the
Voronoi cell. As an example, consider $$w = 100$$. Then, for an arbitrary pixel,
if the distance from the pixel to the nearest seed is more than $$100$$, then
$${1 - \left( \frac{d}{100} \right)^2 < 0 }$$ and $${f(x, y) = 0}$$.

The animation below utilises the distance transform to simulate water.

<!-- Explain the distance transform -->

<canvas id="my-voronoi-canvas" width="360" height="360">
     Your browser does not support canvas.
</canvas>

([Source code](https://github.com/j-freddy/voronoi-diagram/tree/distance-transform))

## Further reading

- [This short paper](http://www.cs.tufts.edu/comp/163/notes05/voronoi_handout.pdf)
  from Tufts university delves deeper into Voronoi diagrams.
- Voronoi diagrams are procedurally generated. Procedural generation is creating
  data algorithmically with computer pseudo-randomness. In this case, we can
  randomly generate the seeds to define a Voronoi diagram. Another example is
  [L-Systems](https://en.wikipedia.org/wiki/L-system) which are useful for
  fractal-like patterns and is used for modelling trees.
- [Fortune's algorithm](https://en.wikipedia.org/wiki/Fortune%27s_algorithm) is
  a sweep-line algorithm that generates a Voronoi diagram in **O(n log n)**
  time, where **n** is the number of seeds.
- Unity3D uses Voronoi in the Shader Graph package, under the Universal Render
  Pipeline. Game developers use these tools to texture and animate water!
- [This](https://litetj.itch.io/ten-minutes-of-existence) is a game I made in
  May 2020 which uses Unity3D's Shader Graph package to texture water.
- In this article, we used the Euclidean distance for Voronoi diagrams. In fact,
  we can use any distance metric, for example, the Manhattan distance (see image
  below).

<img src="{{img_dir}}manhattan-voronoi.png"
     alt="manhattan-voronoi" width="360px" class="img-thumbnail">
