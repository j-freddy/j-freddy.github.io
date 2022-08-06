"use strict";
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
window.addEventListener("load", () => {
    console.log("Hello world!");
    createNewGame();
});
function createNewGame(playerCross = new PlayerHuman(MarkType.X), playerNought = new PlayerHuman(MarkType.O)) {
    GUI.getInstance(new Game(playerCross, playerNought)).refresh();
}
function switchContextToNewGame(playerCross, playerNought) {
    // Old game is deprecated
    GUI.getInstance().getGame().setDeprecated();
    // Switch to new game
    GUI.getInstance().switchContext(new Game(playerCross, playerNought));
    GUI.getInstance().refresh();
}
