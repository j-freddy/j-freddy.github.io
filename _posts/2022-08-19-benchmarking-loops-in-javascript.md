---
layout: post
title: "Benchmarking Loops in JavaScript"
date: August 19, 2022
author: Freddy
cover_img: "blog/benchmarking-loops-in-javascript/timer.png"
summary: |
  Back-end JavaScript and Node.js has been on the rise in recent years, so code
  performance analysis is necessary. This article presents a look into the
  performance of different ways to loop through an array in JavaScript.
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/benchmarking-loops-in-javascript/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

In a [previous post]({{site.baseurl}}{%- link _posts/2022-07-16-looping-through-a-list-in-javascript.md -%}),
I claim that for long lists, **for** is fastest, followed by **for of** then
**forEach**. Let's verify this by analysing their performance.

## Choosing a JavaScript engine

Before we set up a benchmarking environment, let's first establish the
JavaScript engine we will use, as different engines run JavaScript differently.
For example, Firefox uses SpiderMonkey: the first mainstream JavaScript engine.
Chrome uses V8, Safari uses JavaScript Core Webkit and Edge uses Chakra.

We plan to benchmark with respect to long lists, and large data is dealt with in
the back-end. So we step away from browsers and choose the most popular back-end
JavaScript runtime environment: Node.js (which also uses V8).

I'll be using Node 14.18.0.

## Benchmarking

Our plan is to generate a long random array and sum it up using either **for**,
**forEach** or **for of**. For each method, we'll time how long this takes,
repeat this 30 times and collect the results.

We'll start off by creating the `measure` function. We'll use [`performance.now`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
to record the start/stop times to high precision.

```javascript
// benchmark.js

const { performance } = require('perf_hooks');

function measure(arr, func) {
  const startTime = performance.now();
  func(arr);
  const endTime = performance.now();
  return endTime - startTime;
}

module.exports = { measure };
```

Now, let's code the looping prototypes.

```javascript
// loops.js

function sumFor(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
}

function sumForEach(arr) {
  let sum = 0;

  arr.forEach(n => sum += n);
}

function sumForOf(arr) {
  let sum = 0;

  for (const n of arr) {
    sum += n;
  }
}

module.exports = { sumFor, sumForEach, sumForOf };
```

We are ready to wrap it all together.

```javascript
// index.js

const fs = require('fs');
const bm = require('./benchmark.js');
const loops = require('./loops.js');

// Let's set array size to 100 million!
const ARR_SIZE = 100000000;
const NUM_EXPERIMENTS = 30;

// Specify which loop prototype we are benchmarking
const func = loops.sumFor;

// Generate experiment data
const arr = Array.from({ length: ARR_SIZE }, Math.random);

// Perform and time experiments
let experimentTimes = [];

for (let i = 0; i < NUM_EXPERIMENTS; i++) {
  const deltaTime = bm.measure(arr, func, debug);
  experimentTimes.push(deltaTime);
}

// Convert collected times to string
const data = experimentTimes.reduce((str, deltaTime) => {
  return str += `${deltaTime.toString()}\n`;
}, "");

// Write to file
fs.writeFile(`${func.name}.txt`, data, err => {
  if (err) {
    console.error(err);
  }
});
```

## Results

```
Loop        Time (ms)
========================
for          126.836
forEach     2568.844
for of       391.140
```

For each prototype, we take the average of 27 experiments (dropping the first 3
due to some anomalies). We confirm that for large data sets, **for** prevails,
while **forEach** is tediously slow.

<img src="{{img_dir}}results-graph.png"
     alt="applications-list" width="640px" class="img-thumbnail">

(The black line on the right of each bar graph indicates the fastest and slowest
times of the 27 experiments. **for** had very consistent times and the line
could only be seen when I zoomed in.)

## Extras

Out of curiosity, I decided to benchmark more prototypes. Firstly, the **reverse
for** loop was reported to have better performance. I also wrote a **while**
loop and cached the length.

```javascript
function sumReverseFor(arr) {
  let sum = 0;

  for (let i = arr.length - 1; i >= 0; i--) {
    sum += arr[i];
  }
}

function sumWhile(arr) {
  const len = arr.length;
  let sum = 0;
  let i = 0;

  while (i < len) {
    sum += arr[i];
    i++;
  }
}
```

In this particular setting, I thought the functional `reduce` method was also
appropriate.

```javascript
function sumReduce(arr) {
  let sum = arr.reduce((acc, n) => acc + n, 0);
}
```

Here are the results!

```
Loop        Time (ms)
========================
for          126.836
while        127.115
reverse for  128.838
for of       391.140
reduce      1983.896
forEach     2568.844
```

It is inconclusive whether **reverse for** or **while** is faster than a
traditional **for** loop or not, and a larger testing size is needed. It does
appear that a **for** loop is close to being optimal. Meanwhile, functional
methods such as **reduce** and **forEach**, though elegant in code (to some
belief), is very bad performance-wise.
