"use strict";
class PlayerAIMCTS extends PlayerAI {
    constructor(markType) {
        super(markType);
    }
    executeBefore(boardCopy) {
        this.moveChosen = false;
        // Build initial tree as a head with valid next moves as children
        this.head = new TreeNode(new MoveWithPlayouts(
        // TODO Spaghetti
        { globalIndex: -1, localIndex: -1 }, boardCopy.copy()));
        const moves = this.getValidMovesThatDoNotLose(boardCopy);
        const children = moves.map(move => {
            return new TreeNode(new MoveWithPlayouts(move, boardCopy.copy(), this.markType));
        });
        this.head.setChildren(children);
    }
    calcUCT(child, parent) {
        const childPlayouts = child.value.getNumPlayouts();
        if (childPlayouts === 0) {
            return Infinity;
        }
        const parentPlayouts = parent.value.getNumPlayouts();
        let evaluation = child.value.eval(true);
        // Currently we have:
        //   evaluation = 1 -> perfect for X
        //   evaluation = 0 -> perfect for O
        // We need to map this to the following for UCT:
        //   evaluation = 1 -> perfect for AI
        if (this.markType === MarkType.O) {
            evaluation = 1 - evaluation;
        }
        return evaluation + 2 * Math.sqrt(Math.log(parentPlayouts) / childPlayouts);
    }
    getChildWithTopUCT(parent) {
        if (parent.getChildren().length == 0) {
            throw new Error("Trying to get top UCT child of a childless node");
        }
        let topChild = parent.getChildren()[0];
        let topScore = -Infinity;
        for (const child of parent.getChildren()) {
            const score = this.calcUCT(child, parent);
            if (score > topScore) {
                topChild = child;
                topScore = score;
            }
        }
        return topChild;
    }
    executeMCTSIter(boardCopy) {
        // Selection
        let currNode = this.head;
        let currMarkType = this.markType;
        // Keep track of parents for backpropagation
        let parents = [];
        while (!currNode.isLeaf()) {
            parents.push(currNode);
            currNode = this.getChildWithTopUCT(currNode);
            let moveWithEval = currNode.value;
            // Update board
            boardCopy.setCellValueWithMove(moveWithEval.markType, moveWithEval.move);
            boardCopy.updateActiveBoards(moveWithEval.move.localIndex);
            // Keep track of mark type
            currMarkType = this.getOtherMarkType(currMarkType);
        }
        // Expansion
        if (currNode.value.getNumPlayouts() > 0) {
            const moves = this.getValidMovesThatDoNotLose(boardCopy);
            const children = moves.map(move => {
                return new TreeNode(new MoveWithPlayouts(move, boardCopy.copy(), currMarkType));
            });
            currNode.setChildren(children);
            if (children.length > 0) {
                parents.push(currNode);
                currNode = children[0];
                const moveWithEval = currNode.value;
                // Update board
                boardCopy.setCellValueWithMove(moveWithEval.markType, moveWithEval.move);
                boardCopy.updateActiveBoards(moveWithEval.move.localIndex);
                // Keep track of mark type
                currMarkType = this.getOtherMarkType(currMarkType);
            }
        }
        // Simulation
        const chosenNode = currNode;
        const result = this.simulatePlayout(boardCopy, currMarkType);
        chosenNode.value.update(result);
        // Backpropagation
        for (let node of parents) {
            node.value.update(result);
        }
    }
    executeSingleIterCalc(boardCopy) {
        if (this.moveChosen) {
            return;
        }
        // TODO Magic number
        for (let i = 0; i < 24; i++) {
            let board = boardCopy.copy();
            this.executeMCTSIter(board);
        }
    }
    executeAfter(boardCopy) {
        let children = this.head.getChildren();
        let movesWithEval = children.map(node => node.value);
        // Choose optimal move
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
        console.log(this.head.size());
    }
}
