const canvas = document.getElementById("my-voronoi-canvas");
const ctx = canvas.getContext("2d");

function main() {
  console.log("Hello world!");
  const voronoi = new Voronoi(100, 64);

  const fps = 12;

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    voronoi.moveSeeds();
    voronoi.draw();
  }, 1000 / fps);
}

window.addEventListener("load", main);
