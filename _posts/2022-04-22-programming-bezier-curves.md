---
layout: post
title: Programming Bezier Curves
date: April 22, 2022
author: Freddy
# cover_img: "misc/test.jpg"
---

Let's write a program in JavaScript to draw Bezier curves.

We'll start off by defining a class `Point`.

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

Remember, the idea of Bezier curves revolve around linear interpolation. To lerp
between 2 points $$x$$ and $$y$$, we use this equation:

$$(1 - t)x + ty \quad t \in [0, 1]$$

We translate this directly into code, and finish off `Point` with another
function to lerp between 2 points. This is the code for the `Point` class.

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /*
    lerp: linear interpolates between @x (start) and @y (end)
    - x: float
    - y: float
    - t: value between 0 and 1 inclusive
  */
  lerp(x, y, t) {
    return (1 - t) * x + t * y
  }

  /*
    lerpWithPoint: linear interpolates between this pointer and @other
    - other: other point
    - t: value between 0 and 1 inclusive
  */
  lerpWithPoint(other, t) {
    return new Point(
      this.lerp(this.x, other.x, t),
      this.lerp(this.y, other.y, t)
    );
  }
}
```

Now, it's time to code the Bezier curve. Firstly, we need to store the points
that define the curve.

```javascript
class BezierCurve {
  constructor(points) {
    this.points = points;
  }
}
```

```javascript
class BezierCurve {
  constructor(points) {
    this.points = points;
  }

  /*
    sample: calculates the position of a point along the bezier curve
    - t: value between 0 and 1 inclusive (lerp value)
  */
  sample(t) {
    let points = this.points;

    // Repeat until we get the point
    while (points.length > 1) {
      let nextPoints = [];
      
      // Calculate new point as lerp between 2 points
      for (let i = 0; i < points.length - 1; i++) {
        nextPoints.push(points[i].lerpWithPoint(points[i+1], t));
      }

      points = nextPoints;
    }

    return points[0];
  }
}
```
