"use strict";
class LocalBoard extends Board {
    constructor(index, cells = LocalBoard.createEmptyCells(), status = BoardStatus.InProgress) {
        super(status);
        this.index = index;
        this.cells = cells;
    }
    static createEmptyCells() {
        let cells = [];
        for (let i = 0; i < Board.NUM_CELLS; i++) {
            cells.push(new LocalCell());
        }
        return cells;
    }
    getIndex() {
        return this.index;
    }
    setCellValue(value, index) {
        if (this.status !== BoardStatus.InProgress) {
            throw new Error(`Trying to set cell of finished board at ` +
                `(${this.index}, ${index}).`);
        }
        // Cell already has a value
        if (this.cells[index].getValue()) {
            throw new Error("Trying to set non-empty cell.");
        }
        this.cells[index].setValue(value);
        this.updateAndGetStatus();
    }
    getValue() {
        if (this.status === BoardStatus.NoughtWin)
            return MarkType.O;
        if (this.status === BoardStatus.CrossWin)
            return MarkType.X;
        return null;
    }
    setValue(value) {
        throw new Error("Trying to set value of board.");
    }
    copy() {
        let cellsCopy = this.cells.map(c => c.copy());
        return new LocalBoard(this.index, cellsCopy, this.status);
    }
}
