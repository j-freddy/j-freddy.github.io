---
layout: post
title: "Benchmarking Loops in JavaScript"
date: July 16, 2022
author: Freddy
cover_img: "blog/looping-through-a-list/loop.jpg"
summary: |
  TODO Summary
---

<span id="blog-summary">{{ page.summary }}</span>

In a [previous post]({{site.baseurl}}{%- link _posts/2022-07-16-looping-through-a-list-in-javascript.md -%}),
I claim that for long lists, **for** is fastest, followed by **for of** then
**forEach**. Let's verify this by analysing their performance.

## Choosing a JavaScript engine

Before we set up a benchmarking environment, let's establish the JavaScript
engine we will use, as different engines run JavaScript differently. For
example, Firefox uses SpiderMonkey: the first mainstream JavaScript engine.
Chrome uses V8, Safari uses JavaScript Core Webkit and Edge uses Chakra.

We plan to benchmark with respect to long lists, however, and large data is
dealt with in the back-end. So we step away from browsers and choose the most
popular back-end JavaScript runtime environment: Node.js (which also uses V8).

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

## Extras

<!--
- establish JavaScript engine
  - Node.js for backend -> process large data
- coding
- results
- extra: reduce, map, reverse for etc.
-->
