"use strict";
class PlayerHuman {
    constructor(markType) {
        this.markType = markType;
    }
    getMarkType() {
        return this.markType;
    }
    isBot() {
        return false;
    }
    setDeprecated() {
        // Do nothing
    }
    chooseMove(boardCopy) {
        throw new Error("chooseMove called on human player.");
    }
}
