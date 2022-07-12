---
layout: post
title: "Looping Through a List in JavaScript"
date: July 11, 2022
author: Freddy
cover_img: "blog/freeing-up-disk-space-mac/imac.png"
---

<span id="blog-summary">
Let's explore and compare the different ways of looping through a list in
JavaScript: **for**, **forEach** and **for of**.
</span>

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

Think back to when you started learning JavaScript. You were likely introduced
to this method first.
```javascript
for (let i = 0; i < fruits.length; i++) {
  console.log(i + ". " + fruits[i]);
}
```

This is the C-style **for** loop, as its syntax follows the pattern:
```c
for (initialisation; condition; increment)
```

As a side note, JavaScript introduced template literals in 2015, allowing us to
write the following.
```javascript
// Full code
const fruits = ["Apple", "Banana", "Cherry", "Date"];

for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}. ${fruits[i]}`);
}
```

## forEach

The previous program is imperative: code is executed statement by statement.
JavaScript is predominantly an imperative language. However, the ES6 update in
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
**forEach** is also very slow. Many developers argue that **forEach** should
never be used.

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
is because `fruits` is mutable: you can add, remove and modify the list. To be
pedantic, arrays do not exist natively in JavaScript, although the terms
**list** and **array** have seemingly become synonymous within the JavaScript
community.

<!-- For loop -->
<!-- ForEach loop -->
<!-- For of loop -->
