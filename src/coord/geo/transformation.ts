import { Point } from './geometry/point';
export class Transformation {
  a!: number;
  b!: number;
  c!: number;
  d!: number;
  constructor(a: number | number[], b?: number, c?: number, d?: number) {
    if (Array.isArray(a)) {
      // use array properties
      this.a = a[0];
      this.b = a[1];
      this.c = a[2];
      this.d = a[3];
      return;
    }
    this.a = a;
    this.b = b as number;
    this.c = c as number;
    this.d = d as number;

  }
  transform(point:Point, scale?:number):Point {

    return this._transform(point.clone(), scale);
  }
  _transform(point:Point, scale?:number):Point {
    const newScale = scale || 1;
    point.x = newScale * (this.a * point.x + this.b);
    point.y = newScale * (this.c * point.y + this.d);
    return point;
  }
  untransform(point:Point, scale:number):Point {
    const newScale = scale || 1;
    return new Point(
            (point.x / newScale - this.b) / this.a,
            (point.y / newScale - this.d) / this.c);
  }
}
