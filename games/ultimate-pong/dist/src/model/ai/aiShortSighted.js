"use strict";
// AI Prototype 2
/*
  Problem:
  - Prototype 1 had janky movement
  - Prototype 1 is too good
  Fix attempt:
  - AI only controls paddle when ball gets close and moving towards AI
  - AI only updates every 4th frame
*/
class AIShortSighted {
    constructor(game, paddle) {
        this.game = game;
        this.paddle = paddle;
        this.frame = 0;
        this.prev = MovePaddle.Still;
    }
    choosePaddleMovement() {
        this.frame++;
        if (this.frame % 4 !== 0) {
            return this.prev;
        }
        this.frame = 0;
        const ball = this.game.getBall();
        if (
        // Short-sighted: Ball too far away
        ball.y > canvas.height / 3 ||
            // Ball not moving towards AI
            ball.getDir() > Math.PI / 2 && ball.getDir() < Math.PI * 3 / 2) {
            this.prev = MovePaddle.Still;
            return MovePaddle.Still;
        }
        if (ball.x < this.paddle.x) {
            this.prev = MovePaddle.Left;
            return MovePaddle.Left;
        }
        if (ball.x > this.paddle.x) {
            this.prev = MovePaddle.Right;
            return MovePaddle.Right;
        }
        this.prev = MovePaddle.Still;
        return MovePaddle.Still;
    }
}
