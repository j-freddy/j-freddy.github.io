---
layout: post
title: Apples and Cherries
date: April 6, 2022
author: Freddy
cover_img: "misc/test.jpg"
---

## Introduction

This is a test blog! Delete it later.

Latex testing $$\alpha$$:

$$ f(x) = x + 3 $$

## Definition

An optimisation technique in which calculated results are stored and reused. It is a form of caching.

## History

The term 'memoisation' has the same etymological origin as 'memorisation'. It was coined in 1968 by computer scientist Donald Michie.

## Example

### A naive approach to Fibonacci terms

Let's take a look at a logical but inefficient implementation of the Fibonnaci sequence in Haskell.

```haskell
fib :: Int -> Int
-- Pre: n >= 0
fib 0 = 0
fib 1 = 1
fib n = fib (n-1) + fib (n-2)
```

The recursive case calls itself twice, so `fib n` has a time complexity of O(2<sup>n</sup>).

However, a lot of computation is repetitive. For example, `fib 4` calls `fib 2`. `fib 4` also calls `fib 3`, which calls `fib 2` again.

### Optimising the naive implementation

We can optimise this using memoisation: store (cache) the value of `fib n` the first time we call it, then access the cached value in lieu of future calls.

To achieve this, let's assume we have a table (list) of cached values. The recursive case is rewritten as:

```haskell
fib n = table !! (n-1) + table !! (n-2)
```

Now, we must define the table. Haskell uses lazy evaluation: expressions are not evaluated until its value is needed.

```haskell
table = map fib [0..]
```

In this case, each Fibonacci term is evaluated only once, from the previous 2 terms (which may be cached). This term is now cached in the table, and future references will be the cached value.

Assuming list access is constant time<sup>[1](#f1)</sup>, we have improved to a time complexity of O(n).

### Final code

```haskell
fib :: Int -> Int
-- Pre: n >= 0
table = map fib [0..]
fib 0 = 0
fib 1 = 1
fib n = table !! (n-1) + table !! (n-2)
```

### Extra note

It is arguably more idiomatic to encapsulate the table inside the function, to remove global variables.

```haskell
fib :: Int -> Int
-- Pre: n >= 0
fib = memo
  where
    table = map memo [0..]
    memo 0 = 0
    memo 1 = 1
    memo n = table !! (n-1) + table !! (n-2)
```

## Footnotes

<a name="f1"><sup>[1]</sup></a> List access is linear time in Haskell using the default list implementation. Array access is, however, constant time.
