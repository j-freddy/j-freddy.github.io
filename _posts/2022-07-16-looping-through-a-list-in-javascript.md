---
layout: post
title: "Looping Through a List in JavaScript"
date: July 16, 2022
author: Freddy
cover_img: "blog/looping-through-a-list/loop.jpg"
summary: |
  This short article aims to explore and compare the different ways of looping
  through a list in JavaScript: **for**, **forEach** and **for of**.
---

<span id="blog-summary">{{ page.summary }}</span>

Say we have a list, and we want to loop through it.

```javascript
const fruits = ["Apple", "Banana", "Cherry", "Date"];
```
Our aim is to print the list as such:
```
0. Apple
1. Banana
2. Cherry
3. Date
```

## The familiar way

```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log(i + ". " + fruits[i]);
}
```

This is the C-style **for** loop, as its syntax follows this pattern:
```c
for (initialisation; condition; increment)
```

As a side note, JavaScript introduced template literals in 2015, allowing us to
code more succinctly.
```javascript
// Full code
const fruits = ["Apple", "Banana", "Cherry", "Date"];

for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}. ${fruits[i]}`);
}
```

## forEach

The previous program is imperative: code is executed statement by statement.
JavaScript is (predominantly) an imperative language. However, the ES6 update in
2015 provided some functional tools, such as `forEach`.
```javascript
fruits.forEach(fruit => console.log(fruit));
```

What's happening here? Well, JavaScript lists are objects, and a list object has
a `forEach` method that takes in a function as a parameter. This function is
then invoked for each item in the list.

In fact, `forEach` passes 2 parameters to the function: an item (compulsory) and
its index (optional). That said, we can achieve our aim with the following
program.
```javascript
// Full code
const fruits = ["Apple", "Banana", "Cherry", "Date"];

fruits.forEach((fruit, i) =>  console.log(`${i}. ${fruit}`));
```

### forEach sucks

Unlike a **for** loop, **forEach** does not allow you to break out of the loop.
**forEach** is also very slow. Many developers are against the usage of
**forEach** - in any context.

## for of
We move back to imperative programming with `for of`, also introduced in ES6 in
2015.
```javascript
for (let fruit of fruits) {
  console.log(fruit);
}
```

Performance-wise, this is the <b><i>fastest</i></b> when it comes to small
lists, but becomes very slow for large data sets. In this case, we also need the
index, which makes the program slower.
```javascript
// Full code
const fruits = ["Apple", "Banana", "Cherry", "Date"];

for (let [i, fruit] of fruits.entries()) {
  console.log(`${i}. ${fruit}`);
}
```

## Trivia

You may have noticed that I refer to `fruits` as a list and not an array. This
is because `fruits` is mutable: you can add, remove and modify the list. From a
theoretical point of view, arrays are immutable by definition. However, the
terms **list** and **array** have become synonymous within the JavaScript
community.

In fact, even the
[official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) refers to them as arrays.
