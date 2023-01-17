"use strict";
class Paddle {
    constructor(x, y) {
        this.normalWidth = GUIData.blockUnit * 7;
        this.normalMu = 0.88;
        this.spinFactor = 0.012;
        this.height = GUIData.blockUnit;
        this.acc = GUIData.scaleFactor;
        this.mu = this.normalMu;
        this.w = this.normalWidth;
        this.pos = new Point(x, y);
        this.vel = 0;
    }
    get x() {
        return this.pos.getX();
    }
    get y() {
        return this.pos.getY();
    }
    get width() {
        return this.w;
    }
    getVel() {
        return this.vel;
    }
    setNormalWidth() {
        this.w = this.normalWidth;
    }
    setBigWidth() {
        this.w = this.normalWidth * 1.4;
    }
    setSmallWidth() {
        this.w = this.normalWidth * 0.7;
    }
    setNormalMu() {
        this.mu = this.normalMu;
    }
    setSlippery() {
        this.mu = this.normalMu + (1 - this.normalMu) * 2 / 3;
    }
    update(movePaddle) {
        const prevX = this.x;
        this.pos.moveX(this.vel);
        if (movePaddle === MovePaddle.Left)
            this.vel -= this.acc;
        if (movePaddle === MovePaddle.Right)
            this.vel += this.acc;
        this.vel *= this.mu;
        // Hit edge
        const leftEdge = this.w / 2;
        const rightEdge = canvas.width - this.w / 2;
        if (this.x < leftEdge || this.x > rightEdge) {
            this.vel = 0;
            this.pos.setX(prevX);
            if (this.x < leftEdge)
                this.pos.setX(leftEdge + 0.1);
            if (this.x > rightEdge)
                this.pos.setX(rightEdge - 0.1);
        }
    }
}
