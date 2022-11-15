class Seed extends Point {
  constructor(x, y, speedLimit, accLimit) {
    super(x, y);
    this.xVel = random(-speedLimit, speedLimit);
    this.yVel = random(-speedLimit, speedLimit);
    this.accLimit = accLimit;
  }

  update() {
    this.xVel += random(-this.accLimit, this.accLimit);
    this.yVel += random(-this.accLimit, this.accLimit);

    this.x += this.xVel;
    this.y += this.yVel;

    // Do not go out of bounds
    let hitBounds = false;

    if (this.x < 0) {
      this.x = 0;
      hitBounds = true;
    }
    if (this.x > canvas.width) {
      this.x = canvas.width;
      hitBounds = true;
    }
    if (this.y < 0) {
      this.y = 0;
      hitBounds = true;
    }
    if (this.y > canvas.height) {
      this.y = canvas.height;
      hitBounds = true;
    }

    if (hitBounds) {
      this.xVel = 0;
      this.yVel = 0;
    }
  }
}
