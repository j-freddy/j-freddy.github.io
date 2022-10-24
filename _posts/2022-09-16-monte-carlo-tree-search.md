---
layout: post
title: "Monte Carlo Tree Search"
date: September 16, 2022
author: Freddy
cover_img: "blog/mcts/tree-searching.png"
summary: |
  Monte Carlo tree search is a staple algorithm in the field of machine
  learning. It is employed by some of the leading AI in strategy games like
  chess and Go. It is also a relatively easy algorithm to implement. This
  article describes the methodology of the Monte Carlo tree search.
scripts: |
  <script src="../assets/js/blog/mcts/position.js"></script>
  <script src="../assets/js/blog/mcts/board.js"></script>
  <script src="../assets/js/blog/mcts/dart.js"></script>
  <script src="../assets/js/blog/mcts/main.js"></script>
---

<div class="blog-preamble">
  {%- assign img_dir = "assets/img/blog/mcts/" -%}
</div>

<span id="blog-summary">{{ page.summary }}</span>

The Monte Carlo tree search (MCTS) is a heuristic algorithm used to make a move
decision on a turn-based strategy game. It does not require a static evaluator,
which makes it powerful and effective over algorithms like minimax for games
that lack an accurate static evaluator.

## Monte Carlo method

MCTS is part of a class of computational algorithms known as Monte Carlo
experiments. These algorithms use repeated sampling to find a numeric solution.

A famous example is throwing darts randomly at a board, then calculating the
ratio of darts that land inside the quadrant to find the value of Pi. Assuming
the darts are uniformly distributed, this approach eventually yields a very good
approximation of Pi.

<div class="d-flex align-items-center mb-4" id="monte-carlo-method">
  <canvas id="mcts-pi" width="420" height="420">
    Your browser does not support canvas.
  </canvas>
  <div class="ms-4">
    <button type="button" class="btn btn-dark mb-4"
            id="start-simulation-button">
      Start
    </button>
    <div>
      <p>Darts on board: <span id="darts-on-board">0</span></p>
      <p>Number of throws: <span id="num-throws">0</span></p>
      <p>PI estimate: <span id="pi-estimate">N/A</span></p>
    </div>
  </div>
</div>

## How does MCTS work?

A search tree is a tree where paths from the root to the leaf represents a
possible sequence of moves in a turn-based game.

<img src="{{img_dir}}search-tree.svg" alt="example-inkscape"
     class="img-thumbnail">

The idea of MCTS is based on expanding the search tree via choosing random moves
until the game ends, then using the result to update the weight of parent nodes.
(The weight of parent nodes correspond to the evaluation of a given position in
the game.)

More formally, each iteration of MCTS is comprised of 4 stages. Each stage is
given a brief summary below, but will make more sense with the upcoming example.
- Selection
  - Start from the current position (root) and traverse to a leaf node. This can
    either be random or predetermined (e.g. UCT).
- Expansion
  - If this position has not been previously simulated from, do not expand it.
    Otherwise, expand the node by creating children corresponding to all valid
    moves in the position. Then, proceed to simulate from the 1st child node.
- Simulation
  - Both players make random moves until the game ends. This stage is also
    called playout or rollout.
- Backpropagation
  - Use the result of the game to update the weight of parent nodes.

## Example: Tic-Tac-Toe

<img src="{{img_dir}}fig-1.svg"
     alt="example-position" width="240px" class="img-thumbnail">

This is the current position. Our AI plays X, and it uses MCTS to decide its
next move.

<img src="{{img_dir}}fig-2.svg"
     alt="example-initial-tree" width="240px" class="img-thumbnail">

The initial tree consists of 1 node (our current position) with 0 playouts.

### Selection

We start from the root. In this case, the root is the leaf, so we are done.

### Expansion

<img src="{{img_dir}}fig-3.svg"
     alt="example-expansion" width="284px" class="img-thumbnail">

This position has not been simulated from, so we expand by creating children. In
practice, we create a child node for each valid move, but in this example, here
we only create a node for 2 move options for the sake of simplicity.

### Simulation

<img src="{{img_dir}}fig-4.svg"
     alt="example-expansion" width="240px" class="img-thumbnail">

We make random moves until the game ends.

### Backpropagation

<img src="{{img_dir}}fig-5.svg"
     alt="example-expansion" width="284px" class="img-thumbnail">

In our simulation, the game ended in a draw. We update our child node to
**0.5/1** (**0.5** as we drew, and **1** as we had 1 simulation).

We then update its parent node to reflect this. Notice that the numbers on a
node should be equal to the sum of the numbers on its children.

### Next steps

<img src="{{img_dir}}fig-6.svg"
     alt="example-expansion" width="284px" class="img-thumbnail">

Assume we did another iteration and simulated the right leaf node, which we
lost. How do we perform the selection stage now?

Instead of traversing to a leaf node at random, we can use the UCT algorithm:
Upper Confidence Trees. This is defined as the following.

$$
\frac{\text{wins of current node}}{\text{total playouts of current node}} + c \sqrt{\frac{\ln{(\text{total playouts of parent node})}}{\text{total playouts of current node}}}
$$

$$c$$ is a constant, $$2$$ is often used. We start at the root node, and
traverse downwards. For each tree level, we choose the child with the highest
UCT, until a leaf node is reached. Division by zero counts as infinity, so this
prioritises leaf nodes that have not been simulated before.

The UCT algorithm prioritises simulating nodes with a higher simulated chance of
winning for the AI. More precisely, the algorithm is defined as:

$$
\frac{w_i}{s_i} + c \sqrt{\frac{\ln{s_p}}{s_i}}
$$

<img src="{{img_dir}}fig-7.svg"
     alt="example-expansion" width="284px" class="img-thumbnail">

Going back to our example, we choose the left child node as it has the higher
UCT (using $$c=2$$) and continue to the expansion stage.

<img src="{{img_dir}}fig-8.svg"
     alt="example-expansion" width="572px" class="img-thumbnail">

And the algorithm continues... but our example ends here.

## MCTS in practice

MCTS is used in neural networks for games like chess, Go and bridge. Some of the
strongest engines like AlphaGo, AlphaZero and Leela Chess Zero uses MCTS with
deep learning.

<div class="callout callout-success">
  MCTS is a good choice for games that lack an accurate static evaluator, like
  Ultimate Tic-Tac-Toe.
</div>

[This]({{site.baseurl}}{%- link games/ultimate-tic-tac-toe/index.html -%}) is my
attempt at creating an AI for Ultimate Tic-Tac-Toe, written in TypeScript. The
[source
code](https://github.com/j-freddy/ultimate-tictactoe/blob/main/ts/src/model/player/playerAIMCTS.ts)
for MCTS is copied below. It is quick to implement, spanning only a few hundred
lines.

See if you can beat the AI! Press **Config** and select **Human** against **AI
Hard**, then start a new game.

```typescript
private executeMCTSIter(boardCopy: GlobalBoard): void {
  // Selection
  let currNode = this.head;
  let currMarkType = this.markType;
  // Keep track of parents for backpropagation
  let parents: TreeNode<MoveWithPlayouts>[] = [];

  while (!currNode.isLeaf()) {
    parents.push(currNode);
    currNode = this.getChildWithTopUCT(currNode);
    let moveWithEval = currNode.value!;
    // Update board
    boardCopy.setCellValueWithMove(moveWithEval.markType!, moveWithEval.move);
    boardCopy.updateActiveBoards(moveWithEval.move.localIndex);
    // Keep track of mark type
    currMarkType = this.getOtherMarkType(currMarkType);
  }

  // Expansion
  if (currNode.value!.getNumPlayouts() > 0) {
    const moves = this.getValidMovesThatDoNotLose(boardCopy);
    const children = moves.map(move => {
      return new TreeNode(
        new MoveWithPlayouts(move, boardCopy.copy(), currMarkType)
      );
    });
    currNode.setChildren(children);

    if (children.length > 0) {
      parents.push(currNode);
      currNode = children[0];
      const moveWithEval = currNode.value!;
      // Update board
      boardCopy.setCellValueWithMove(
        moveWithEval.markType!, moveWithEval.move
      );
      boardCopy.updateActiveBoards(moveWithEval.move.localIndex);
      // Keep track of mark type
      currMarkType = this.getOtherMarkType(currMarkType);
    }
  }

  // Simulation
  const chosenNode = currNode;
  const result = this.simulatePlayout(boardCopy, currMarkType);
  chosenNode.value!.update(result);

  // Backpropagation
  for (let node of parents) {
    node.value!.update(result);
  }
}

protected simulatePlayout(board: GlobalBoard,
                          currentMarkType: MarkType): BoardStatus {
  let boardCopy = board.copy();

  // Simulate game until it ends
  while (boardCopy.getStatus() === BoardStatus.InProgress) {
    let move = this.getSmartRandomMove(boardCopy, currentMarkType);

    boardCopy.setCellValue(currentMarkType, move.globalIndex,
                            move.localIndex);
    boardCopy.updateActiveBoards(move.localIndex);

    // Switch player
    currentMarkType = this.getOtherMarkType(currentMarkType);
  }

  return boardCopy.getStatus();
}
```

## Further reading

- Dr. John Levine of University of Strathclyde gave a [fantastic
  lecture](https://www.youtube.com/watch?v=UXW2yZndl7U) on MCTS. I highly
  recommend watching this video.
- The [Wikipedia article](https://en.wikipedia.org/wiki/Monte_Carlo_tree_search)
  on MCTS is very well maintained, especially the **Principle of operation**
  category.
- GeeksforGeeks has a [good
  article](https://www.geeksforgeeks.org/ml-monte-carlo-tree-search-mcts) and
  provides basic pseudocode on the algorithm.
