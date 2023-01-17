"use strict";
// AI Prototype 1
class AINaive {
    constructor(game, paddle) {
        this.game = game;
        this.paddle = paddle;
    }
    choosePaddleMovement() {
        const ball = this.game.getBall();
        if (ball.x < this.paddle.x)
            return MovePaddle.Left;
        if (ball.x > this.paddle.x)
            return MovePaddle.Right;
        return MovePaddle.Still;
    }
}
