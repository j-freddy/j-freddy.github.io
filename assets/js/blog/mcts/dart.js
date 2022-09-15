class Dart {
  constructor() {
    this.position = new Position(0, 0);
    this.onBoard = false;
  }

  throw(board) {
    this.position = new Position(
      Math.random() * board.radius,
      Math.random() * board.radius
    );

    this.onBoard = this.position.displacement() < board.radius
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = this.onBoard ? "#2b8a3e" : "#c92a2a";
    ctx.fill();
    ctx.restore();
  }
}
