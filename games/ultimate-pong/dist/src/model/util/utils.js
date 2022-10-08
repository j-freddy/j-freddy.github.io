"use strict";
var MovePaddle;
(function (MovePaddle) {
    MovePaddle["Still"] = "Still";
    MovePaddle["Left"] = "Left";
    MovePaddle["Right"] = "Right";
})(MovePaddle || (MovePaddle = {}));
var PointStatus;
(function (PointStatus) {
    PointStatus["Before"] = "Before";
    PointStatus["Playing"] = "Playing";
    PointStatus["After"] = "After";
})(PointStatus || (PointStatus = {}));
// TODO Add GUIEvent for animateBallBefore, etc.
var EffectEvent;
(function (EffectEvent) {
    EffectEvent["BigPaddle"] = "effectBigPaddle";
    EffectEvent["SmallPaddle"] = "effectSmallPaddle";
    EffectEvent["BigBall"] = "effectBigBall";
    EffectEvent["BlinkingBall"] = "effectBlinkingBall";
    EffectEvent["SlipperyPaddle"] = "effectSlipperyPaddle";
})(EffectEvent || (EffectEvent = {}));
var GameEvent;
(function (GameEvent) {
    GameEvent["BallBefore"] = "ballBefore";
    GameEvent["BallAfter"] = "ballAfter";
    GameEvent["BallPaddleCollision"] = "ballPaddleCollision";
})(GameEvent || (GameEvent = {}));
var Player;
(function (Player) {
    Player["Top"] = "topPlayer";
    Player["Bottom"] = "bottomPlayer";
})(Player || (Player = {}));
function mod(n, d) {
    return ((n % d) + d) % d;
}
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function randomInt(min, max) {
    return Math.floor(randomNumber(min, max + 1));
}
