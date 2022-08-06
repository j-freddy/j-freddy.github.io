"use strict";
class Board {
    constructor(status = BoardStatus.InProgress) {
        this.cells = [];
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
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
    getCellsValues() {
        return this.cells.map(cell => cell.getValue());
    }
    getCellValue(row, col) {
        return this.cells[row * Board.NUM_COLS + col].getValue();
    }
    getCellValueByIndex(index) {
        return this.cells[index].getValue();
    }
    checkWin(playerValue) {
        for (let pattern of Board.WIN_PATTERNS) {
            if (this.getCellValueByIndex(pattern[0]) === playerValue &&
                this.getCellValueByIndex(pattern[1]) === playerValue &&
                this.getCellValueByIndex(pattern[2]) === playerValue) {
                return true;
            }
        }
        return false;
    }
    checkFull() {
        for (let cell of this.cells) {
            if (!cell.getValue()) {
                return false;
            }
        }
        return true;
    }
    // DEPRECATED Use toString
    print() {
        var _a;
        let i = 0;
        let str = "";
        for (let x = 0; x < Board.NUM_COLS; x++) {
            for (let y = 0; y < Board.NUM_ROWS; y++) {
                let value = (_a = this.cells[i].getValue()) === null || _a === void 0 ? void 0 : _a.toString();
                if (!value) {
                    value = "-";
                }
                str += `${value} `;
                i++;
            }
            str += "\n";
        }
        console.log(str);
    }
    toString() {
        var _a;
        let i = 0;
        let str = "";
        for (let x = 0; x < Board.NUM_COLS; x++) {
            for (let y = 0; y < Board.NUM_ROWS; y++) {
                let value = (_a = this.cells[i].getValue()) === null || _a === void 0 ? void 0 : _a.toString();
                if (!value) {
                    value = "-";
                }
                str += `${value} `;
                i++;
            }
            str += "\n";
        }
        return str;
    }
}
Board.NUM_ROWS = 3;
Board.NUM_COLS = 3;
Board.NUM_CELLS = 9;
Board.WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
