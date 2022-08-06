"use strict";
class PlayerAIRandom extends PlayerAI {
    constructor(markType) {
        super(markType);
    }
    executeBefore(boardCopy) {
        this.moveChosen = false;
    }
    executeSingleIterCalc(boardCopy) {
        if (this.moveChosen) {
            return;
        }
        let validMoves = this.getValidMoves(boardCopy);
        this.optimalMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        this.moveChosen = true;
    }
}
