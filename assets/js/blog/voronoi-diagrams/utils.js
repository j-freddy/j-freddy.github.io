function random(min, max) {
  return Math.random() * (max - min) + min;
}

// @min inclusive, @max exclusive
function randomInt(min, max) {
  return Math.floor(random(min, max));
}

function randomColor() {
  return randomInt(0, 256 ** 3).toString(16).padStart(6, "0");
}
