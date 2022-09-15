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
