---
layout: post
title: "Support Vector Machines"
date: February 24, 2023
author: Freddy
# cover_img: "blog/site-philosophy/donuts.png"
summary: |
  TODO Summary
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/svm/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

## Motivation

Say we have two types of fungi in our backyard: honey mushroom and autumn
skullcap. We also have some data points, where each data entry records the type
of fungi, as well as its height and cap width. We plot the data points as such.

[TODO Image]

We can empirically observe a relationship between the features of the fungi
(i.e. height and cap width) and its type. In fact, we can draw a line between
the features to separate between the 2 types.

This line is now a very simple model! We can use this model to predict the type
of new fungi in our backyard. Say we go measure a fungi and get a height of 12cm
and cap width of 11cm.

[TODO Image]

The model predicts the fungi as honey mushroom. But what if we drew the line a
bit differently? Consider the model below. The line still separates our original
data perfectly, but now our model predicts the fungi as autumn skullcap.

[TODO Image]

So our question is: how do we determine the "best" or optimal line?

This leads us to support vector machiines (SVMs). An SVM is a very powerful
supervised learning method that mathematically formulates a model for binary
classification.

<div class="callout callout-info">
  Woah! I've thrown in a lot of machine learning terminology already. Let's go
  through them.
  <br /><br />

  Binary classification refers to the task of categorising input data into one
  of 2 classes. In our case, the input data is the set of features describing
  the fungi: height, cap width. Our 2 classes are honey mushroom and autumn
  skullcap.
  <br /><br />

  Supervised learning refers to training a model using data points with labels.
  In our case, we have some initial data points where we already know the type
  of mushroom. The counterpart is unsupervised learning: we have the set of
  features (height, cap width) but no corresponding label during training.
</div>

<div class="callout callout-success">
  SVM is a supervised learning technique. However, unsupervised learning is also
  very useful! For example, we can train a model to cluster data points into
  groups, or perform dimensionality reduction.
</div>

We will start off with the simplest case: finding the optimal line that
perfectly separates data points into 2 groups. Later, we consider what to do if
no such line exists. We give 2 examples below.

[TODO Image for soft-margin classifier, and image for non-linear classifier
(kernel trick)]

## Hard-margin classifier

A hard-margin classifier defines a hard linear boundary that perfectly separates
the 2 classes. We will derive the loss function from scratch.

### Initial steps

Let $${x_1, x_2}$$ represent height and cap width. We can define a linear model
as:

$$w_1 x_1 + w_2 x_2 + b = 0$$

The optimal line is determined by $${w_1, w_2}$$ and $$b$$. This can be
rearranged to slope-intercept form:

$$x_2 = -\frac{w_1}{w_2} x_1 - \frac{b}{w_2}$$

Here, we make an important observation. The gradient of the line is
$${
  \begin{bmatrix}
    1 \\
    -\frac{w_1}{w_2}
  \end{bmatrix}
}$$. That is, as $$x_1$$ moves by $$1$$, $$x_2$$ moves by
$${-\frac{w_1}{w_2}}$$. This is analogous to $${y = mx + c}$$: as $$x$$ moves by
$$1$$, $$y$$ moves by $$m$$.

Define $${w = \begin{bmatrix}
  w_1 \\
  w_2
\end{bmatrix}}$$.

$$
\begin{bmatrix}
  w_1 \\
  w_2
\end{bmatrix} \cdot
\begin{bmatrix}
  1 \\
  -\frac{w_1}{w_2}
\end{bmatrix} = 0
$$

Hence, $$w$$ is orthogonal to the gradient.

### Extending to higher dimensions

We can partition a 2D plane into 2 regions using a 1D line. Similarly, we can
partition a 3D space into 2 regions using a 2D plane.

In general, we can partition an $$n$$-dimensional space using an
$${(n-1)}$$-dimensional hyperplane.

$$w \cdot x + b = 0$$

Our previous observation still holds: $$w$$ is orthogonal to the gradient of our
hyperplane.

### Formulating the problem

We want the maxmimum margin hyperplane: let $${c_1, c_2}$$ be the distance
between the hyperplane and the closest points to it from each class. We denote
the closest points $${x_1, x_2}$$. Hence, the hyperplane should be defined such
that it perpendicularlly bisects the line segment formed by $$c_1$$ and $$c_2$$.
Then, $${c_1 = c_2}$$. We can always normalise our data, so we generalise $${c_1
= 1}$$.

Define our 2 classes as $${\{+1, -1\}}$$. Define the binary classifier as
follows:

$$
  c = \begin{cases}
    +1 &  w \cdot x + b \geq 0 \\
    -1 & \text{otherwise}
  \end{cases}
$$

Then, our problem is to derive the margin between $${w \cdot x_1 + b = 1}$$ and
$${w \cdot x_2 + b = -1}$$.

[TODO Image - Computer Vision presentation 8 page 62]

Define the margin size as $$m$$. Then $${x_2 = x_1 + mn}$$, where $$n$$ is the
standard normal to $${w \cdot x_1 + b = 1}$$. Now, we have:

$$
\begin{align}
  w \cdot x_1 + b &= 1 \\
  w \cdot (x_1 + mn) + b &= -1
\end{align}
$$

Subtracting equation 2 from 1 we get:

$$mw \cdot n = 2$$

We now use our previous observation to formulate $$n$$ as $$\frac{w}{\|w\|}$$.
Hence, $${m = \frac{2}{\|w\|}}$$.

SVM aims to solve this problem.

$$
\begin{align}
  \max_{w, b} & \frac{2}{\|w\|} \\
  \text{subject to} \ & w \cdot x_i + b \geq +1 \quad y_i = +1 \\
   & w \cdot x_i + b \leq -1 \quad y_i = -1 \quad \text{for each datapoint ${(x_i, y_i)}$}
\end{align}
$$

This can be reformulated to the following optimisation problem:

$$\min_{w, b} L(w, b) = \|w\|^2 + \lambda \sum_{i=1}^N \max{(0, 1 - y_i (w \cdot x_i + b))}$$

### Training the model: Gradient descent

We formulated a loss function $$L$$ that we want to minimise.

<!--

- gradient descent
- advanced: kernel trick
- frameworks? PyTorch, scikit-learn
- good performance until 2012 when Neural Networks start to take over
  - future: is SVM still useful?
- follow-up blog: programming SVM

-->
