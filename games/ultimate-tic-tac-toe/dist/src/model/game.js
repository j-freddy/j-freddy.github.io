"use strict";
class Game {
    constructor(playerCross = new PlayerHuman(MarkType.X), playerNought = new PlayerHuman(MarkType.O)) {
        this.board = new GlobalBoard();
        this.playerCross = playerCross;
        this.playerNought = playerNought;
        this.currentPlayer = this.playerCross;
        this.launchAIIfNeeded();
    }
    getBoard() {
        return this.board;
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    setDeprecated() {
        // Notify AIs that they are deprecated
        this.playerCross.setDeprecated();
        this.playerNought.setDeprecated();
    }
    switchPlayer() {
        if (this.currentPlayer === this.playerNought) {
            this.currentPlayer = this.playerCross;
        }
        else {
            this.currentPlayer = this.playerNought;
        }
        return this.currentPlayer;
    }
    ended() {
        return this.board.getStatus() !== BoardStatus.InProgress;
    }
    makeMove(globalIndex, localIndex) {
        try {
            if (this.ended()) {
                throw new Error("Trying to make a move when game has ended.");
            }
            this.board.setCellValue(this.currentPlayer.getMarkType(), globalIndex, localIndex);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    performTurn(globalIndex, localIndex) {
        let valid = this.makeMove(globalIndex, localIndex);
        if (!valid) {
            return;
        }
        this.board.updateActiveBoards(localIndex);
        // Refresh UI instantly when move is made
        // As launchAIIfNeeded may call AI.chooseMove which takes time
        // TODO Decouple canvas from model
        canvas.dispatchEvent(new Event("refresh"));
        if (this.ended()) {
            console.log("Game ended!");
            return;
        }
        this.switchPlayer();
        this.launchAIIfNeeded();
    }
    // Launch AI if it needs to make the next move
    launchAIIfNeeded() {
        if (this.currentPlayer.isBot()) {
            this.currentPlayer.chooseMove(this.board.copy())
                .then(move => {
                this.performTurn(move.globalIndex, move.localIndex);
            })
                .catch(err => console.log(err));
        }
    }
}
