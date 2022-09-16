const SAMPLE_INTERVAL = 0.01;
const CURSOR_NODE_BALL = 28;

const canvas = document.getElementById("my-bezier-canvas");
const ctx = canvas.getContext("2d");

const curve = new BezierCurve([
  new Point(40, 210),
  new Point(60, 40),
  new Point(150, 55),
  new Point(260, 190)
]);

function drawCurve() {
  GUI.drawBezierCurveLines(curve);
  GUI.drawBezierCurve(curve, SAMPLE_INTERVAL);
}

function updateCanvas() {
  GUI.clear();
  drawCurve();
}

window.addEventListener("load", drawCurve);

// Interactive Bezier curves

draggedPoints = [];

canvas.addEventListener("mousedown", e => {
  for (point of curve.points) {
    // Select 1st point close to cursor
    let distFromCursor
      = Math.sqrt((point.x - e.offsetX)**2 + (point.y - e.offsetY)**2);

    if (distFromCursor < CURSOR_NODE_BALL) {
      draggedPoints.push(point);
      break;
    }
  }

  if (draggedPoints == []) {
    return;
  }

  moveDraggedPointsToMouse(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", () => {
  draggedPoints = [];
});

canvas.addEventListener("mousemove", e => {
  moveDraggedPointsToMouse(e.offsetX, e.offsetY);
});

function moveDraggedPointsToMouse(mouseX, mouseY) {
  for (point of draggedPoints) {
    point.x = mouseX;
    point.y = mouseY;
  }

  // Update GUI
  updateCanvas();
}
