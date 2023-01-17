class Voronoi {
  constructor(numSeeds, blobSize=50) {
    this.seeds = this.generateSeeds(numSeeds);
    this.blobSize = blobSize;
  }

  generateSeeds(numSeeds) {
    const seeds = new Array(numSeeds);

    for (let i = 0; i < numSeeds; i++) {
      const x = random(0, canvas.width);
      const y = random(0, canvas.width);
      seeds[i] = new Seed(x, y, 1.4, 0.4);
    }

    return seeds;
  }

  moveSeeds() {
    for (const seed of this.seeds) {
      seed.update();
    }
  }

  distToAlpha(dist) {
    return Math.max(0, 1 - (dist / this.blobSize) ** 2);
  }

  drawCells(unit=1) {
    ctx.save();

    for (let x = 0; x < canvas.width; x += unit) {
      for (let y = 0; y < canvas.height; y += unit) {
        // For each pixel

        const p = new Point(x, y);

        let minDist = Infinity;
        // Find nearest neighbour
        for (const seed of this.seeds) {
          const dist = p.dist(seed);
          if (dist < minDist) {
            minDist = dist;
          }
        }

        // Distance transform overrides colours
        ctx.globalAlpha = this.distToAlpha(minDist);
        ctx.fillStyle = "#1864ab";
        ctx.fillRect(x, y, unit, unit);
      }
    }

    ctx.restore()
  }

  drawSeeds() {
    ctx.save();
    for (const seed of this.seeds) {
      ctx.beginPath();
      ctx.arc(seed.x, seed.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }

  draw(unit=1) {
    this.drawCells(unit);
    // this.drawSeeds();
  }
}
