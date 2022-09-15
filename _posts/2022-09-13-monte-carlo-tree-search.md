---
layout: post
title: "Monte Carlo Tree Search"
date: September 13, 2022
author: Freddy
cover_img: "blog/benchmarking-loops-in-javascript/timer.png"
summary: |
  Bruh.
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

MCTS is inspired by a class of computational algorithms known as Monte Carlo
experiments. Such algorithms use repeated sampling to find a numeric solution.

A famous example is throwing darts randomly at a board, then calculating the
ratio of darts that land inside the quadrant to find the value of Pi. Assuming
the darts are uniformly distributed, this approach yields a very good
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
possible sequence of moves in the turn-based game.

<img src="{{img_dir}}search-tree.svg"
     alt="example-inkscape" class="img-thumbnail">

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
    moves in the position. Then, proceed to simulate the 1st child node.
- Simulation
  - Both players make random moves until the game ends. This stage is also
    called playout or rollout.
- Backpropagation
  - Use the result to update the weight of parent nodes.

## Example: Tic-Tac-Toe

- current board:
  O = X
  = O =
  X = =
- use search depth 2

## MCTS in practice

- uses in practice
- copy code from ultimate tic-tac-toe

## Notes

- https://en.wikipedia.org/wiki/Monte_Carlo_tree_search
- introduction
  - purpose / use over minimax (no static evaluation)
- how it works
- example: ultimate tic-tac-toe
  - show some code
  - analyse effect of depth on time complexity
