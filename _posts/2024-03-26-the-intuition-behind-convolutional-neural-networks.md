---
layout: post
title: "The Intuition behind Convolutional Neural Networks"
date: Mar 26, 2024
author: Freddy
cover_img: "blog/local-gpt/thumb.jpg"
summary: |
  TODO
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/convnets/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

## Motivating Background

The core of all problems can be described as a mapping from an input space to an
output space, and our goal is to solve this mapping (or approximate it as best
as we can in practical settings), whether it be via machine learning or other
methods.

For example, image classification involves mapping an image to a class label,
while image segmentation involves mapping an image to a pixel-wise mask (or
simply, an image to another image).

Before Convolutional Neural Networks (ConvNets) became mainstream, neural
networks often consisted of fully-connected (FC) layers. The gist of an FC layer
can be boiled down to a linear layer followed by an activation function.

<div class="callout callout-info">
  You are probably familiar with this scalar linear equation:

  $$ z = mx + c $$

  When <b>x</b> and <b>y</b> are vectors, <b>m</b> becomes a matrix and <b>c</b>
  becomes a vector, which we denote as <b>W</b> and <b>b</b> respectively.

  $$ z = Wx + b $$

  Then, we apply the activation function, e.g. sigmoid.

  $$ \hat{y} = \sigma(z) = \sigma(Wx + b) $$

  This is an FC layer that maps a 1-channel input to a 1-channel output.
</div>

A linear layer with activation is a **universal approximator**. This means given
**any** input, the weights $${W}$$ and bias $${b}$$ can be tuned such that the
ouput is very close to the true output.

Let's consider a binary image segmentation task, for example, given an image,
identify the cat. A naive approach would be to take each pixel and concatenate
into a 1D vector. Then, apply a linear layer with sigmoid activation to output
another 1D vector of the same shape, which can be unfolded to represent the
segmented output. However, there are 2 major problems:

1. Neighbouring pixels are related to each other. By concatenating the image, we
   are losing spatial information.
2. The network only learns a global approximation to the current input image. It
   does not generalise well to new images.

The 2nd problem is known as **high bias**, and it is demonstrated below. Say our
network performs well on the training image.

<div class="mb-3">
  <img src="{{img_dir}}cat-1.png"
      alt="train-image" width="324px" class="img-thumbnail me-3">

  <img src="{{img_dir}}mask-1.png"
      alt="train-segmented" width="324px" class="img-thumbnail">
</div>

However, our 1-layer network is very rigid and generates the same mask every
time without variation. It incorrectly segments the test image.

<div class="mb-3">
  <img src="{{img_dir}}cat-2.png"
      alt="train-image" width="324px" class="img-thumbnail me-3">

  <img src="{{img_dir}}mask-2.png"
      alt="train-segmented" width="324px" class="img-thumbnail">
</div>

In this case, even though we are using a global approximator, it is not good
enough - we'd have to retrain the network every time we encounter a new image.
More generalisable models involve deeper layers to capture local patterns, but
stacking FC layers result in a large number of parameters which is infeasible
for imaging tasks. Plus, spatial information is still not being leveraged.

## Convolutional Neural Networks

In essence, what we've previously done was to look at the entire image at once
in 1 FC layer. The idea behind ConvNets is to shrink the window down, and look
at patches of the image at a time.

Since each neuron now only has access to its corresponding patch, it is forced
to learn local patterns. We continue to add more layers, increasing its
receptive field so the neurons in deeper layers can learn global patterns while
preserving spatial invariance.

Let's dive into the details.

### Formulation
