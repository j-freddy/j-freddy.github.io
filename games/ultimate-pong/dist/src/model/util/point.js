"use strict";
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    moveX(deltaX) {
        this.x += deltaX;
    }
    moveY(deltaY) {
        this.y += deltaY;
    }
    move(speed, direction) {
        this.x += speed * Math.sin(direction);
        this.y -= speed * Math.cos(direction);
    }
    dist(other) {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
}
