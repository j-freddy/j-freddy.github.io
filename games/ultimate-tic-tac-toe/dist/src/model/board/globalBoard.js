"use strict";
class GlobalBoard extends Board {
    constructor(cells = GlobalBoard.createEmptyBoards(), activeBoards = [...cells], status = BoardStatus.InProgress) {
        super(status);
        this.cells = cells;
        this.activeBoards = activeBoards;
        this.unconfirmedMove = null;
    }
    static createEmptyBoards() {
        let cells = [];
        for (let i = 0; i < Board.NUM_CELLS; i++) {
            cells.push(new LocalBoard(i));
        }
        return cells;
    }
    getLocalBoards() {
        return this.cells;
    }
    getLocalBoard(row, col) {
        return this.cells[row * Board.NUM_COLS + col];
    }
    getLocalBoardByIndex(index) {
        return this.cells[index];
    }
    setCellValue(value, globalIndex, localIndex) {
        if (!this.getActiveBoardsIndices().includes(globalIndex)) {
            throw new Error(`Trying to set cell on non-active board at ` +
                `(${globalIndex}, ${localIndex}).`);
        }
        this.getLocalBoardByIndex(globalIndex).setCellValue(value, localIndex);
        this.updateAndGetStatus();
    }
    setCellValueWithMove(value, move) {
        this.setCellValue(value, move.globalIndex, move.localIndex);
    }
    getBoardsInProgress() {
        return this.getLocalBoards()
            .filter(board => board.getStatus() === BoardStatus.InProgress);
    }
    getActiveBoards() {
        return this.activeBoards;
    }
    getActiveBoardsIndices() {
        return this.activeBoards.map(board => board.getIndex());
    }
    getUnconfirmedMove() {
        return this.unconfirmedMove;
    }
    setUnconfirmedMove(cellWithPosition) {
        this.unconfirmedMove = cellWithPosition;
    }
    resetUnconfirmedMove() {
        this.unconfirmedMove = null;
    }
    checkFull() {
        return this.getBoardsInProgress().length === 0;
    }
    updateActiveBoards(index) {
        let nextBoard = this.getLocalBoardByIndex(index);
        if (nextBoard.getStatus() === BoardStatus.InProgress) {
            this.activeBoards = [nextBoard];
        }
        else {
            this.activeBoards = this.getBoardsInProgress();
        }
    }
    // TODO Duplicate
    // This uses a different checkFull function
    updateAndGetStatus() {
        // Do not update status if board is not in progress
        if (this.status !== BoardStatus.InProgress) {
            console.warn("Attempt to update board status when board is finished.");
            return this.status;
        }
        if (this.checkWin(MarkType.O)) {
            this.status = BoardStatus.NoughtWin;
            return this.status;
        }
        if (this.checkWin(MarkType.X)) {
            this.status = BoardStatus.CrossWin;
            return this.status;
        }
        if (this.checkFull()) {
            this.status = BoardStatus.Draw;
            return this.status;
        }
        this.status = BoardStatus.InProgress;
        return this.status;
    }
    copy() {
        let boardsCopy = this.cells.map(c => c.copy());
        let activeIndices = this.getActiveBoardsIndices();
        let activeBoards = [];
        for (let board of boardsCopy) {
            if (activeIndices.includes(board.getIndex())) {
                activeBoards.push(board);
            }
        }
        return new GlobalBoard(boardsCopy, activeBoards, this.status);
    }
    // DEPRECATED Use toString
    print() {
        console.log("Start printing local boards");
        for (let board of this.getLocalBoards()) {
            board.print();
        }
        console.log("Done printing local boards");
    }
    toString() {
        let str = "";
        for (let board of this.getLocalBoards()) {
            str += board.toString() + "\n\n";
        }
        return str;
    }
}
