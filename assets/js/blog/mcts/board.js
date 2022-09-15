class Board {
  constructor(radius) {
    this.radius = radius;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffc078"
    ctx.fill();
    ctx.restore();
  }
}
