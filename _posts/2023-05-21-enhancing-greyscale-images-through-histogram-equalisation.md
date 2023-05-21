---
layout: post
title: "Enhancing Greyscale Images through Histogram Equalisation"
date: May 21, 2023
author: Freddy
cover_img: "blog/svm/thumb.png"
summary: |
  TODO
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/svm/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

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
