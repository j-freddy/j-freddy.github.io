class BezierCurve {
  constructor(points) {
    this.points = points;
    this.innerPoints = []; // list of list of points
  }

  /*
    sample: calculates the position of a point along the bezier curve and
            updates @innerPoints property
    - t: value between 0 and 1 inclusive (lerp value)
  */
  sample(t) {
    let points = this.points;
    let innerPoints = [];

    // Repeat until we get the point
    while (points.length > 1) {
      let nextPoints = [];
      
      // Calculate new point as lerp between 2 points
      for (let i = 0; i < points.length - 1; i++) {
        nextPoints.push(points[i].lerpWithPoint(points[i+1], t));
      }

      innerPoints.push(nextPoints);
      points = nextPoints;
    }

    this.innerPoints = innerPoints;

    return points[0];
  }
}
