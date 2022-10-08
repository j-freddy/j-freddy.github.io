"use strict";
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
// GUI data depends on canvas
// So initialise it after fetching canvas
const GUIData = getGUIData();
let GAME = new Game(canvas, false);
function switchContextToNewGame(singlePlayer) {
    clearInterval(mainThread);
    GAME = new Game(canvas, singlePlayer);
    GUI.getInstance(GAME).refresh();
}
function tick() {
    const keyDown = GUI.getInstance().keyDownMappings;
    let moveTopPaddle = MovePaddle.Still;
    if (keyDown.get("a"))
        moveTopPaddle = MovePaddle.Left;
    if (keyDown.get("d"))
        moveTopPaddle = MovePaddle.Right;
    let moveBottomPaddle = MovePaddle.Still;
    if (keyDown.get("ArrowLeft"))
        moveBottomPaddle = MovePaddle.Left;
    if (keyDown.get("ArrowRight"))
        moveBottomPaddle = MovePaddle.Right;
    const gameOver = GAME.update(moveTopPaddle, moveBottomPaddle);
    GUI.getInstance().refresh();
    // TODO If this is not smooth, let gameOver be a property in GAME and trigger
    // this at the end of GUIEvent.AnimateBallAfter using GreenSock
    if (gameOver) {
        clearInterval(mainThread);
        GUI.getInstance().drawFinalScreen();
    }
}
// Do not use requestAnimationFrame for projects involving moving objects
// As it syncs calls to your refresh rate
// Which depends per user
let mainThread;
function startLoop() {
    // DO NOT change fps, it affects game speed (unfortunately)
    const fps = 120;
    mainThread = setInterval(tick, 1000 / fps);
}
function main() {
    console.log("Hello world!");
    GUI.getInstance(GAME).refresh();
    canvas.addEventListener("click", _ => {
        if (GAME.getStarted()) {
            return;
        }
        GAME.setStarted();
        canvas.dispatchEvent(new Event(GameEvent.BallBefore));
        startLoop();
    });
}
window.addEventListener("load", main);
