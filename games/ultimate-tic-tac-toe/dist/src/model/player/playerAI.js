"use strict";
/*
  PlayerAI

  To create a new AI, you need to implement 3 methods:
  - executeBefore (optional)
    This is called before startCalcMoveThread(). It is used to reset and prepare
    the AI properties.
  - exeecuteSingleIterCalc
    This is repeatedly called until the time limit.
  - executeAfter (optional)
    This is called when the time limit is reached. It is used to ensure a move
    is chosen. It is also an opportunity for the AI to print summary statistics.
*/
class PlayerAI {
    constructor(markType) {
        this.MAX_FPS = 60;
        this.TIME_LIMIT = 2000; // Think time in milliseconds
        this.markType = markType;
        // TODO Spaghetti
        this.optimalMove = {
            globalIndex: 0,
            localIndex: 0
        };
        this.deprecated = false;
    }
    getMarkType() {
        return this.markType;
    }
    isBot() {
        return true;
    }
    setDeprecated() {
        this.deprecated = true;
    }
    markTypeToStatus(markType) {
        return markType === MarkType.O ?
            BoardStatus.NoughtWin : BoardStatus.CrossWin;
    }
    getOtherMarkType(markType = this.markType) {
        return markType === MarkType.O ? MarkType.X : MarkType.O;
    }
    executeBefore(boardCopy) {
    }
    executeSingleIterCalc(boardCopy) {
        throw new Error("executeSingleIterCalc not implemented.");
    }
    executeAfter(boardCopy) {
    }
    startCalcMoveThread(boardCopy) {
        return setInterval(() => this.executeSingleIterCalc(boardCopy), 1000 / this.MAX_FPS);
    }
    chooseMove(boardCopy) {
        this.executeBefore(boardCopy);
        const calcMoveThreadId = this.startCalcMoveThread(boardCopy);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.deprecated) {
                    reject();
                }
                else {
                    clearInterval(calcMoveThreadId);
                    this.executeAfter(boardCopy);
                    resolve(this.optimalMove);
                }
            }, this.TIME_LIMIT);
        });
    }
    // ===========================================================================
    // The rest of this class consists of useful methods that assist making an AI
    // Methods shared across multiple AIs are also here
    // ===========================================================================
    getValidMoves(board) {
        let validMoves = [];
        let activeBoards = board.getActiveBoards();
        for (let localBoard of activeBoards) {
            let cellValues = localBoard.getCellsValues();
            for (let i = 0; i < cellValues.length; i++) {
                // Cell is empty
                if (!cellValues[i]) {
                    validMoves.push({
                        globalIndex: localBoard.getIndex(),
                        localIndex: i
                    });
                }
            }
        }
        return validMoves;
    }
    // Get move that wins game immediately
    getMoveThatWinsGame(board, markType) {
        for (let move of this.getValidMoves(board)) {
            // Copy board state and make move
            let boardCopy = board.copy();
            boardCopy.setCellValue(markType, move.globalIndex, move.localIndex);
            boardCopy.updateActiveBoards(move.localIndex);
            // Check win
            if (boardCopy.getStatus() === this.markTypeToStatus(markType)) {
                return move;
            }
        }
        // No moves win game
        return null;
    }
    // Filter moves that loses game immediately
    // Warning: Can filter the move that wins game immediately
    // TODO Untested
    filterMovesThatLoseGame(board, markType, moves) {
        let filteredMoves = [];
        for (let move of moves) {
            let boardCopy = board.copy();
            // Make move
            boardCopy.setCellValue(markType, move.globalIndex, move.localIndex);
            boardCopy.updateActiveBoards(move.localIndex);
            if (boardCopy.getStatus() !== BoardStatus.InProgress) {
                // If game ends, opponent can't win
                filteredMoves.push(move);
            }
            else {
                // See if opponent can win immediately
                let winningMove = this.getMoveThatWinsGame(boardCopy, this.getOtherMarkType(markType));
                if (!winningMove) {
                    filteredMoves.push(move);
                }
            }
        }
        return filteredMoves;
    }
    // Get all valid moves that do not lose immediately
    getValidMovesThatDoNotLose(board, markType = this.markType) {
        let moves = this.getValidMoves(board);
        return this.filterMovesThatLoseGame(board, markType, moves);
    }
    // Get all moves that wins a local board
    getMovesThatWinsLocalBoard(board, markType) {
        let winningMoves = [];
        for (let move of this.getValidMoves(board)) {
            // Copy board state and make move
            let boardCopy = board.copy();
            boardCopy.setCellValue(markType, move.globalIndex, move.localIndex);
            boardCopy.updateActiveBoards(move.localIndex);
            // Check win
            let localBoard = boardCopy.getLocalBoardByIndex(move.globalIndex);
            if (localBoard.getStatus() === this.markTypeToStatus(markType)) {
                winningMoves.push(move);
            }
        }
        return winningMoves;
    }
    getSmartRandomMove(board, markType) {
        let winningMove = this.getMoveThatWinsGame(board, this.markType);
        if (winningMove) {
            // Choose winning move if it exists
            return winningMove;
        }
        // Otherwise, choose a move that wins a local board if it exists
        // Filter moves that lose immediately
        let potentialMoves = this.getMovesThatWinsLocalBoard(board, this.markType);
        let goodMoves = this.filterMovesThatLoseGame(board, markType, potentialMoves);
        if (goodMoves.length !== 0) {
            return goodMoves[0];
        }
        // Otherwise, choose a random move
        let validMoves = this.getValidMoves(board);
        let filteredMoves = this.filterMovesThatLoseGame(board, markType, validMoves);
        if (filteredMoves.length !== 0) {
            return filteredMoves[Math.floor(Math.random() * filteredMoves.length)];
        }
        return validMoves[Math.floor(Math.random() * filteredMoves.length)];
    }
    simulatePlayout(board, currentMarkType) {
        let boardCopy = board.copy();
        // Simulate game until it ends
        while (boardCopy.getStatus() === BoardStatus.InProgress) {
            let move = this.getSmartRandomMove(boardCopy, currentMarkType);
            boardCopy.setCellValue(currentMarkType, move.globalIndex, move.localIndex);
            boardCopy.updateActiveBoards(move.localIndex);
            // Switch player
            currentMarkType = this.getOtherMarkType(currentMarkType);
        }
        return boardCopy.getStatus();
    }
}
