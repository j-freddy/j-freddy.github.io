---
layout: post
title: "Support Vector Machines"
date: February 24, 2023
author: Freddy
# cover_img: "blog/site-philosophy/donuts.png"
summary: |
  A support vector machine is a powerful and simple machine learning
  architecture that used to be state-of-the-art in image classification. In this
  article, we delve into the intricacies of support vector machines and its
  applications in linear, non-linear, binary and multi-class classification.
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/svm/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

## Motivation

Say we have two types of fungi in our backyard: honey mushroom and velvet
shank. We also have some data points, where each data entry records the type
of fungi, as well as its height and cap width. We plot the data points as such.

<img src="{{img_dir}}data.png"
     alt="fungi-data-points" width="640px" class="img-thumbnail">

We can empirically observe a relationship between the features of the fungi
(i.e. height and cap width) and its type. In fact, we can draw a line between
the features to separate between the 2 types.

<img src="{{img_dir}}line.png"
     alt="fungi-data-points-line" width="640px" class="img-thumbnail">

This line is now a very simple model! We can use this model to predict the type
of new fungi in our backyard. Say we go measure a fungi and get a height of 9
and cap width of 12.8.

<img src="{{img_dir}}line-pred.png"
     alt="fungi-prediction" width="640px" class="img-thumbnail">

The model predicts the fungi as honey mushroom. But what if we drew the line a
bit differently? Consider the model below. The line still separates our original
data perfectly, but now our model predicts the fungi as velvet shank.

<img src="{{img_dir}}line-alt.png"
     alt="fungi-prediction-alt" width="640px" class="img-thumbnail">

So our question is: how do we determine the "best" or optimal line?

This leads us to support vector machines (SVMs). An SVM is a very powerful
supervised learning method that mathematically formulates a model for binary
classification.

<div class="callout callout-info">
  Woah! I've thrown in a lot of machine learning terminology already. Let's go
  through them.
  <br /><br />

  Binary classification refers to the task of categorising input data into one
  of 2 classes. In our case, the input data is the set of features describing
  the fungi: height, cap width. Our 2 classes are honey mushroom and velvet
  shank.
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

We will start off with the simplest case: finding the optimal **linear** model
that separates data points into exactly **2** groups. Later, we briefly discuss
generalising this to non-linear models that classify points into an arbitrary
number of groups.

## Binary linear classifier

A hard-margin binary classifier defines a hard linear boundary that perfectly
separates the 2 classes. We start by deriving the optimisation problem from
scratch.

<div class="callout callout-warning">
  Warning: This section is maths-heavy. You can skip to "Generalisations and
  extensions".
</div>

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

We want the maximum margin hyperplane: let $${c_1, c_2}$$ be the distance
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

A hard-margin binary linear classifier can be described as the following
optimisation problem.

$$
\begin{align}
  \max_{w, b} & \frac{2}{\|w\|} \\
  \text{subject to} \ & w \cdot x_i + b \geq +1 \quad y_i = +1 \\
   & w \cdot x_i + b \leq -1 \quad y_i = -1 \quad \text{for each datapoint ${(x_i, y_i)}$}
\end{align}
$$

However, what if there is no such clear-cut line?

<img src="{{img_dir}}data-soft.png"
     alt="fungi-data-alt" width="640px" class="img-thumbnail">

In this case, we allow training points to be misclassified by no longer
enforcing the 2 constraints - instead, we add a penalty term for every
misclassified point. This is called a soft-margin classifier and can be
reformulated as the Hinge loss:

$$\min_{w, b} L(w, b) = \|w\|^2 + \lambda \sum_{i=1}^N \max{(0, 1 - y_i (w \cdot x_i + b))}$$

If a point is correctly classified, the penalty term is $$0$$. Otherwise, the
penalty is how badly the point is misclassified, defined by the distance to
line: $${1 - y_i (w \cdot x_i + b)}$$.

### Training the model: Gradient descent

We formulated a loss function $$L$$ that we want to minimise. To find optimal
values of our parameters $$w$$ and $$b$$, we initialise $$w$$ and $$b$$ to
arbitrary values then use gradient descent to finetune them.

$$
\begin{align}
  w^{(k+1)} &= w^{(k)} - \alpha \triangledown_w L(w^{(k)}, b^{(k)}) \\
  b^{(k+1)} &= b^{(k)} - \alpha \triangledown_b L(w^{(k)}, b^{(k)})
\end{align}
$$

where $${w^{(k)}, b^{(k)}}$$ are the values at iteration $$k$$ and $$\alpha$$ is
the learning rate.

<div class="callout callout-info">
  Our loss function includes the following:

  $$\sum_{i=1}^N \max{(0, 1 - y_i (w \cdot x_i + b))}$$

  <b>N</b> denotes the number of training data samples. If <b>N</b> is very
  large, it takes lots of time to compute <b>L</b>. Do we have a workaround?
  <br /><br />

  The solution is to use stochastic gradient descent (SGD): instead of using the
  entire dataset to compute <b>L</b> each iteration, we only use a random subset
  (mini-batch). This allows us to perform each iteration faster while still
  working towards the optimal values of <b>w</b> and <b>b</b>. The term now
  becomes:

  $$\sum_{i \in M \subset N} \max{(0, 1 - y_i (w \cdot x_i + b))}$$

  where <b>M</b> is a different random subset every iteration.
</div>

After training, this is the optimal model for our fungi training data.

<img src="{{img_dir}}line-optimal.png"
     alt="fungi-optimal-model" width="640px" class="img-thumbnail">

For our soft-margin example, the optimal model is shown below.

<img src="{{img_dir}}line-optimal-soft.png"
     alt="fungi-optimal-model-soft" width="640px" class="img-thumbnail">

## Generalisations and extensions

### Multi-class classification

SVMs are intrisincally for binary problems. There are ways to reformulate
multi-class problems to be solved with SVM. Let's assume there are 4 classes:
apple, banana, cherry, dates.

- **One-to-Rest**: We decompose the original problem into 4 binary problems:
  apple vs other classes, banana vs other classes, etc.
- **One-to-One**: We have a binary problem for each pair of classes: apple
  vs banana, apple vs cherry, banana vs cherry, etc.

<img src="{{img_dir}}multiclass.webp"
     alt="multiclass-example" width="420px" class="img-thumbnail">

### Kernel trick

SVMs intrinsically describes linear relationships. The kernel trick applies a
kernel that maps data points to a higher dimensional space that may be linearly
separable.

<img src="{{img_dir}}kernel-trick.png"
     alt="kernel-trick" width="640px" class="img-thumbnail">

## Frameworks

[scikit-learn](https://scikit-learn.org/stable/auto_examples/svm/plot_iris_svc.html)
provides utilities that fully support SVMs in Python.

<!-- TODO Example code -->

## Are SVMs outdated?

<img src="{{img_dir}}advancement-over-time.png"
     alt="advancement-over-time" class="img-thumbnail">

The figure above shows the improvement of image classification models over time
on the ImageNet dataset. SVMs were state-of-the-art models for image
classification until the publication of AlexNet in 2012, which paved way for
convolutional neural networks (CNNs) such as ResNet. Since 2017,
state-of-the-art models have moved to transformers (like Google's BERT and
OpenAI's GPT).

Interestingly, the architecture for AlexNet is very similar to LeNet (1998) and
neural network concepts existed in the 1980s. However, neural networks only took
off decades later due to advancements in hardware and availability of large
datasets.

From this, we can make 2 arguments:

1. The newer state-of-the-art architectures like CNNs and transformers have
   millions (even billions) of tunable parameters. For simple tasks like digit
   handwriting recognition, SVMs perform well (see stats below) and offer a much
   cheaper solution to CNNs and transformers.
2. With rapid technology advancements in many fields, SVMs has potential to once
   again become state-of-the-art in the future.

<img src="{{img_dir}}digit-recognition.png"
     alt="digit-recognition-stats" width="360px" class="img-thumbnail">

## Further reading

- The [Wikipedia page](https://en.wikipedia.org/wiki/Support_vector_machine) on
  SVMs is very well documented
- Stanford CS229 has a [comprehensive
  lecture](https://www.youtube.com/watch?v=lDwow4aOrtg) on SVMs, with a focus on
  underlying mathematics and fundamentals
- CS229: The [follow-up video](https://www.youtube.com/watch?v=8NYoQiRANpg)
  mathematically explains the kernel trick
- SVMs involve numerical data. For image classification, this involves
  describing an image as a vector of floats. Simply taking the RGB values of all
  pixels is too inefficient, so we need a way to locate interest points. One
  such algorithm is
  [SIFT](https://docs.opencv.org/4.x/da/df5/tutorial_py_sift_intro.html).
