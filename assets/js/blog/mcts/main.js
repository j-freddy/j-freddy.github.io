const canvas = document.getElementById("mcts-pi");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-simulation-button");
const dartsOnBoardText = document.getElementById("darts-on-board");
const numThrowsText = document.getElementById("num-throws");
const piEstimateText = document.getElementById("pi-estimate");

const NUM_EXPERIMENTS = 10000;

function updateDOM(dartsOnBoard, numAttempts) {
  const piEstimate = 4 * dartsOnBoard / numAttempts;

  dartsOnBoardText.innerText = dartsOnBoard;
  numThrowsText.innerText = numAttempts;
  piEstimateText.innerText = piEstimate.toFixed(4);
}

function run() {
  let dartsOnBoard = 0;
  let numAttempts = 0;

  const simulation = setInterval(() => {
    if (numAttempts >= NUM_EXPERIMENTS) {
      clearInterval(simulation);
      return;
    }

    const dart = new Dart();
    dart.throw(board);
    if (dart.onBoard) {
      dartsOnBoard++;
    }
    numAttempts++;
    dart.draw();

    updateDOM(dartsOnBoard, numAttempts);
  }, 20);
}

function main() {
  board.draw();
}

const board = new Board(canvas.width);

window.addEventListener("load", main);

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startButton.innerText = "Running";
  run();
});
