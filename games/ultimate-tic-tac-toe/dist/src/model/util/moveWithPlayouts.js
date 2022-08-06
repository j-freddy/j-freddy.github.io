"use strict";
/*
  rawScore:
  - 1 -> perfect for X
  - 0 -> perfect for O
*/
class MoveWithPlayouts {
    constructor(move, boardBeforeMove, markType) {
        this.move = move;
        this.rawScore = 0;
        this.numPlayouts = 0;
        this.boardBeforeMove = boardBeforeMove;
        this.markType = markType;
    }
    getRawScore() {
        return this.rawScore;
    }
    getNumPlayouts() {
        return this.numPlayouts;
    }
    eval() {
        if (this.numPlayouts === 0) {
            return 0;
        }
        return this.rawScore / this.numPlayouts;
    }
    update(result) {
        this.numPlayouts++;
        if (result === BoardStatus.CrossWin)
            this.rawScore++;
        if (result === BoardStatus.Draw)
            this.rawScore += 0.5;
    }
    updateAccumulate(rawScore, numPlayouts) {
        this.rawScore += rawScore;
        this.numPlayouts += numPlayouts;
    }
    // DEPRECATED Use toString
    print() {
        console.log(`Move: (${this.move.globalIndex}, ${this.move.localIndex})`);
        console.log(`Raw score: ${this.rawScore}`);
        console.log(`Number of playouts: ${this.numPlayouts}`);
        console.log(`Evaluation: ${this.eval()}`);
    }
    toString() {
        return `Move: (${this.move.globalIndex}, ${this.move.localIndex})\n` +
            `Raw score: ${this.rawScore}\n` +
            `Number of playouts: ${this.numPlayouts}\n` +
            `Evaluation: ${this.eval()}`;
    }
}
