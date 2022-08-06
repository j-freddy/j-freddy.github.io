"use strict";
class PlayerAIMCTS extends PlayerAI {
    constructor(markType) {
        super(markType);
        this.SEARCH_DEPTH = 3;
        this.cache = {
            movesNotLosing: [],
        };
    }
    executeBefore(boardCopy) {
        this.moveChosen = false;
        // Update cache
        this.cache.movesNotLosing = this.getValidMovesThatDoNotLose(boardCopy);
        // Create tree head
        this.head = new TreeNode();
        // Create tree body
        let prevDepthNodes = [this.head];
        let currDepthNodes = [];
        for (let i = 0; i < this.SEARCH_DEPTH; i++) {
            for (let moveNode of prevDepthNodes) {
                // Current board
                let board;
                if (i === 0) {
                    board = boardCopy;
                }
                else {
                    let moveWithEval = moveNode.value;
                    board = moveWithEval.boardBeforeMove;
                    board.setCellValueWithMove(moveWithEval.markType, moveWithEval.move);
                    board.updateActiveBoards(moveWithEval.move.localIndex);
                }
                let moves = this.getValidMovesThatDoNotLose(board);
                // When i = 0, it is our move
                // Players take turns moving
                let markType = (i % 2 === 0) ? this.markType : this.getOtherMarkType();
                let children = moves.map(move => {
                    return new TreeNode(new MoveWithPlayouts(move, board.copy(), markType));
                });
                moveNode.setChildren(children);
                currDepthNodes.push(...children);
            }
            prevDepthNodes = currDepthNodes;
            currDepthNodes = [];
        }
    }
    executeMCTSIter(boardCopy) {
        // Select random leaf node and update board
        let currNode = this.head;
        let currMarkType = this.markType;
        while (!currNode.isLeaf()) {
            let children = currNode.getChildren();
            currNode = children[Math.floor(Math.random() * children.length)];
            let moveWithEval = currNode.value;
            // Update board
            boardCopy.setCellValueWithMove(moveWithEval.markType, moveWithEval.move);
            boardCopy.updateActiveBoards(moveWithEval.move.localIndex);
            currMarkType = this.getOtherMarkType(currMarkType);
        }
        let chosenNode = currNode;
        // Playout: Simulate game until it ends
        let result = this.simulatePlayout(boardCopy, currMarkType);
        chosenNode.value.update(result);
    }
    executeSingleIterCalc(boardCopy) {
        if (this.moveChosen) {
            return;
        }
        // TODO Memoise winning move
        let winningMove = this.getMoveThatWinsGame(boardCopy, this.markType);
        if (winningMove) {
            // Choose winning move if it exists
            this.optimalMove = winningMove;
            this.moveChosen = true;
            return;
        }
        if (this.cache.movesNotLosing.length === 0) {
            // We're screwed: all moves immediately lose
            this.optimalMove = this.getValidMoves(boardCopy)[0];
            this.moveChosen = true;
            return;
        }
        // TODO Magic number
        for (let i = 0; i < 8; i++) {
            let board = boardCopy.copy();
            this.executeMCTSIter(board);
        }
    }
    updateTreeNode(node) {
        if (node.isLeaf()) {
            return;
        }
        let rawScore = 0;
        let numPlayouts = 0;
        for (let child of node.getChildren()) {
            this.updateTreeNode(child);
            rawScore += child.value.getRawScore();
            numPlayouts += child.value.getNumPlayouts();
        }
        node.value.updateAccumulate(rawScore, numPlayouts);
    }
    executeAfter(boardCopy) {
        let children = this.head.getChildren();
        // Back-propogate
        for (let child of children) {
            this.updateTreeNode(child);
        }
        // Choose optimal move
        let movesWithEval = children.map(node => node.value);
        // TODO Refactor duplicate
        if (this.markType === MarkType.X) {
            let bestEval = -Infinity;
            for (let moveWithEval of movesWithEval) {
                if (moveWithEval.eval() > bestEval) {
                    bestEval = moveWithEval.eval();
                    this.optimalMove = moveWithEval.move;
                }
            }
        }
        else {
            let bestEval = Infinity;
            for (let moveWithEval of movesWithEval) {
                if (moveWithEval.eval() < bestEval) {
                    bestEval = moveWithEval.eval();
                    this.optimalMove = moveWithEval.move;
                }
            }
        }
        // Print information
        let str = "";
        for (let moveWithEval of movesWithEval) {
            str += moveWithEval.toString() + "\n\n";
        }
        console.log(str);
    }
}
