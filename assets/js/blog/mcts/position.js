class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  displacement() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
