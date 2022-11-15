class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  dist(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}
