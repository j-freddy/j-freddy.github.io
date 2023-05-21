---
layout: post
title: "Enhancing Greyscale Images through Histogram Equalisation"
date: May 21, 2023
author: Freddy
cover_img: "blog/svm/thumb.png"
summary: |
  TODO
scripts: |
  <script src="../assets/js/blog/image-enhancer/main.js"></script>
  <script src="../assets/js/blog/image-enhancer/formHandler.js"></script>
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/image-enhancer/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

Let's start with a demo.

The upper image is the original image and the lower image is the enhanced image.
You can also upload your own image. (Note: The program assumes your image is
greyscale. It will always output a greyscale image.)

<!-- Form -->
<input type="file" id="image-input" accept="image/*" class="mb-3">
<br />
<!-- Original image -->
<img id="original-image" src="{{img_dir}}hills.png" width="480px"
    class="img-thumbnail" />
<!-- Enhanced image -->
<canvas id="output-canvas" class="img-thumbnail">
    Your browser does not support canvas.
</canvas>

([Source code](https://github.com/j-freddy/image-enhancer))

Pretty neat, right? If you play around with it, you'll notice that the image
enhancer works best when the original image has low contrast. If the original
image already has high contrast, the processed image may not be as sharp.

The above program uses a technique called **histogram equalisation**. The
fundamental motivation or goal behind histogram equalisation is to increase
contrast of a low-contrast greyscale image. Image enhancing has many use cases,
such as increasing the quality of a retro photograph for forensic analysis (or
just to make it look nicer!) and pre-processing medical scans before feeding
them to train a convolutional neural network.

<div class="callout callout-warning">
  <b>Disclaimer:</b> In this article, we only consider greyscale images.
  <br /><br />

  Histogram equalisation is mainly used for greyscale images, but it is also
  possible to use them on colour images. We explore this in another post.
  <!-- TODO Link -->
</div>


## How does histogram equalisation work?

If we want to enhance an image, we must spread out its pixel intensities. The
easiest way to achieve this without considering the surroundings of each pixel
would be to define a one-to-one mapping from each pixel intensity to a new one.

For example, here's the (cropped) mapping for the example hills photo. Note that
intensity values range from 0 (black) to 255 (white).

<!-- TODO da list -->

## Behind the scenes: Mathematics

## Let's code histogram equalisation!

<!--
- start with the demonstration
- motivation
    - enhance contrast in low contrast in greyscale images
- histogram equalisation
    - idea: spread out intensity
    - describe how it works: histogram, corresponding CDF, transform CDF to straight line, new histogram
    - nutshell: one-to-one mapping between pixel intensities (show mapping array)
- the maths
    - further reading: that one paper with the explanation involving integrals on how to derive the maths
- the code
    - sklearn
    - custom implementation (just the histogram equalisation bit in javascript)
- disclaimer
    - this does not always improve contrast, but it works well for images with low contrast
-->
