"use strict";
class PlayerAISmartRandomFeedback extends PlayerAI {
    constructor(markType) {
        super(markType);
    }
    // DEPRECATED Use moveWithRandomFeedback instead
    // Evaluate position of a board by smart random playouts
    // 1 -> perfect for X
    // 0 -> perfect for O
    evaluateBoard(board, currentMarkType, numPlayouts = 100) {
        let absScore = 0;
        for (let i = 0; i < numPlayouts; i++) {
            // Simulate game until it ends
            let status = this.simulatePlayout(board, currentMarkType);
            if (status === BoardStatus.CrossWin)
                absScore++;
            if (status === BoardStatus.Draw)
                absScore += 0.5;
        }
        return absScore / numPlayouts;
    }
    executeBefore(boardCopy) {
        this.movesWithEval = [];
        this.moveChosen = false;
        let moves = this.getValidMovesThatDoNotLose(boardCopy);
        this.movesWithEval = moves.map(move => new MoveWithPlayouts(move));
    }
    executeSingleIterCalc(boardCopy) {
        if (this.moveChosen) {
            return;
        }
        let winningMove = this.getMoveThatWinsGame(boardCopy, this.markType);
        if (winningMove) {
            // Choose winning move if it exists
            this.optimalMove = winningMove;
            this.moveChosen = true;
            return;
        }
        if (this.movesWithEval.length === 0) {
            // We're screwed: all moves immediately lose
            this.optimalMove = this.getValidMoves(boardCopy)[0];
            this.moveChosen = true;
            return;
        }
        // Simulate a single playout for each move and update evaluation
        for (let moveWithEval of this.movesWithEval) {
            // Make move
            let move = moveWithEval.move;
            let boardPrivateCopy = boardCopy.copy();
            boardPrivateCopy.setCellValueWithMove(this.markType, move);
            boardPrivateCopy.updateActiveBoards(move.localIndex);
            // Evaluate board
            let result = this.simulatePlayout(boardPrivateCopy, this.getOtherMarkType());
            moveWithEval.update(result);
        }
    }
    executeAfter(boardCopy) {
        if (this.moveChosen) {
            return;
        }
        // TODO Refactor duplicate
        if (this.markType === MarkType.X) {
            let bestEval = -Infinity;
            for (let moveWithEval of this.movesWithEval) {
                if (moveWithEval.eval() > bestEval) {
                    bestEval = moveWithEval.eval();
                    this.optimalMove = moveWithEval.move;
                }
            }
        }
        else {
            let bestEval = Infinity;
            for (let moveWithEval of this.movesWithEval) {
                if (moveWithEval.eval() < bestEval) {
                    bestEval = moveWithEval.eval();
                    this.optimalMove = moveWithEval.move;
                }
            }
        }
        // Print information
        let str = "";
        for (let moveWithEval of this.movesWithEval) {
            str += moveWithEval.toString() + "\n\n";
        }
        console.log(str);
    }
}
