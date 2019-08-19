import { Point, toPoint } from './point';
import { PointExpression, BoundsLiteral, PointObject } from '../interface';
export class Bounds {
  min!: Point;
  max!: Point;
  constructor(
    topLeft: PointExpression | BoundsLiteral,
    bottomRight?: PointExpression,
  ) {
    if (!topLeft) {
      return;
    }
    const points = bottomRight ? [topLeft, bottomRight] : topLeft;
    if (Array.isArray(points)) {
      for (let i = 0, len = points.length; i < len; i += 1) {
        // @ts-ignore
        this.extend(points[i]);
      }
    }
  }
  extend(point: Point): Bounds {
    const newPoint: Point = toPoint(point);
    if (!this.min && !this.max) {
      this.min = newPoint.clone();
      this.max = newPoint.clone();
    } else {
      this.min.x = Math.min(newPoint.x, this.min.x);
      this.max.x = Math.max(newPoint.x, this.max.x);
      this.min.y = Math.min(newPoint.y, this.min.y);
      this.max.y = Math.max(newPoint.y, this.max.y);
    }
    return this;
  }
  getCenter(round?: boolean): Point {
    return new Point(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2,
      round,
    );
  }
  getBottomLeft(): Point {
    return new Point(this.min.x, this.max.y);
  }
  getTopRight(): Point {
    return new Point(this.max.x, this.min.y);
  }
  getBottomRight(): Point {
    return this.max;
  }
  getTopLeft(): Point {
    return this.min;
  }
  getSize(): Point {
    return this.max.subtract(this.min);
  }
  /**
   * 判断是否包含 输入 points 或者 bounds
   * @param obj
   */
  contains(obj:PointExpression| BoundsLiteral | Bounds): boolean {
    let min: PointObject;
    let max : PointObject;
    let newObj = obj;
    // @ts-ignore
    if (newObj instanceof Point || typeof newObj[0] === 'number') {
      newObj = toPoint(newObj);
    } else {
      newObj = toBounds(newObj);
    }

    if (newObj instanceof Bounds) {
      min = newObj.min;
      max = newObj.max;
    } else {
      min = max = obj as PointObject;
    }

    return (
      min.x >= this.min.x &&
      max.x <= this.max.x &&
      min.y >= this.min.y &&
      max.y <= this.max.y
    );
  }
  /**
   * 判断两个bounds是否相交 ,
   * @param bounds
   */
  intersect(bounds:BoundsLiteral):boolean {
    const newBounds = toBounds(bounds);
    const min = this.min;
    const max = this.max;
    const min2 = newBounds.min;
    const max2 = newBounds.max;
    const xIntersects = (max2.x >= min.x) && (min2.x <= max.x);
    const yIntersects = (max2.y >= min.y) && (min2.y <= max.y);
    return xIntersects && yIntersects;
  }
   /**
    * 判断bounds是否相互覆盖
    * @param bounds
    */
  overlaps(bounds:BoundsLiteral):boolean {
    const newBounds = toBounds(bounds);
    const min = this.min;
    const max = this.max;
    const min2 = newBounds.min;
    const max2 = newBounds.max;
    const xOverlaps = (max2.x > min.x) && (min2.x < max.x);
    const yOverlaps = (max2.y > min.y) && (min2.y < max.y);
    return xOverlaps && yOverlaps;
  }
  isValid():boolean {
    return !!(this.min && this.max);
  }
}

export function toBounds(
  topLeft: PointExpression | BoundsLiteral | Bounds,
  bottomRight?: PointExpression,
): Bounds {// TODO
  if (!topLeft || topLeft instanceof Bounds) {
    return topLeft as Bounds;
  }
  return new Bounds(topLeft, bottomRight);
}
