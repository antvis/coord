import { formatNum, trunc } from '../../../util';
import { PointExpression } from '../interface';
export class Point {
  public x: number;
  public y: number;
  /**
   * 平面坐标
   * @param x x坐标
   * @param y y坐标
   * @param round 是否取整
   */
  constructor(x: number, y: number, round?: boolean) {
    this.x = round ? Math.round(x) : x;
    this.y = round ? Math.round(y) : y;
  }
  public clone(): Point {
    return new Point(this.x, this.y);
  }
  public add(point: PointExpression, y?: number, round?: boolean): Point {
    return this.clone()._add(toPoint(point, y, round));
  }
  public _add(point: Point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }
  public subtract(point: PointExpression, y?: number, round?: boolean): Point {
    return this.clone()._subtract(toPoint(point, y, round));
  }
  public divideBy(num: number): Point {
    return this.clone()._divideBy(num);
  }
  public multiplyBy(num: number) {
    return this.clone()._multiplyBy(num);
  }
  public _multiplyBy(num: number): Point {
    this.x *= num;
    this.y *= num;
    return this;
  }
  public scaleBy(point: Point): Point {
    return new Point(this.x * point.x, this.y * point.y);
  }
  public unscaleBy(point: Point): Point {
    return new Point(this.x / point.x, this.y / point.y);
  }
  public round() {
    return this.clone()._round();
  }
  public floor() {
    return this.clone()._floor();
  }
  public ceil() {
    return this.clone()._ceil();
  }
  public trunc(): Point {
    return this.clone()._trunc();
  }
  public _trunc(): Point {
    this.x = trunc(this.x);
    this.y = trunc(this.y);
    return this;
  }
  public distanceTo(point: PointExpression): number {
    const newPoint = toPoint(point);
    const x = newPoint.x - this.x;
    const y = newPoint.y - this.y;
    return Math.sqrt(x * x + y * y);
  }
  public equals(point: PointExpression, threshold?: number): boolean {
    const newPoint = toPoint(point);
    const margin = Math.max(Math.abs(this.x - newPoint.x), Math.abs(this.y - newPoint.y));
    return margin <= (threshold === undefined ? 1.0e-9 : threshold);
  }
  public contains(point: PointExpression): boolean {
    const newPoint = toPoint(point);
    return Math.abs(newPoint.x) <= Math.abs(this.x) && Math.abs(newPoint.y) <= Math.abs(this.y);
  }
  public toString(): string {
    return `Point(${formatNum(this.x)}, ${formatNum(this.y)})`;
  }
  private _subtract(point: Point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }
  private _divideBy(num: number): Point {
    this.x /= num;
    this.y /= num;
    return this;
  }

  private _round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  private _floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  private _ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
}
export function toPoint(x: any, y?: number, round?: boolean): Point {
  if (x instanceof Point) {
    return x;
  }
  if (Array.isArray(x)) {
    return new Point(x[0], x[1]);
  }
  if (x === undefined || x === null) {
    return x;
  }
  if (typeof x === 'object' && 'x' in x && 'y' in x) {
    return new Point(x.x, x.y);
  }
  return new Point(x, y as number, round);
}
