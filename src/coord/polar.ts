import { mat3, vec2, vec3 } from '@antv/matrix-util';
import { isNumberEqual } from '@antv/util';
import { Point, PolarCfg } from '../interface';
import Coordinate from './base';

export default class Polar extends Coordinate {
  public readonly isPolar: boolean = true;
  public readonly type: string = 'polar';

  public circleCenter: Point;

  constructor(cfg: PolarCfg) {
    super(cfg);

    const { startAngle = -Math.PI / 2, endAngle = (Math.PI * 3) / 2, innerRadius = 0, radius } = cfg;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.innerRadius = innerRadius;
    this.radius = radius;

    this.initial();
  }

  public initial() {
    super.initial();

    while (this.endAngle < this.startAngle) {
      this.endAngle += Math.PI * 2;
    }

    const oneBox = this.getOneBox();

    const oneWidth = oneBox.maxX - oneBox.minX;
    const oneHeight = oneBox.maxY - oneBox.minY;

    const left = Math.abs(oneBox.minX) / oneWidth;
    const top = Math.abs(oneBox.minY) / oneHeight;

    let maxRadius: number;

    if (this.height / oneHeight > this.width / oneWidth) {
      // width 为主
      maxRadius = this.width / oneWidth;
      this.circleCenter = {
        x: this.center.x - (0.5 - left) * this.width,
        y: this.center.y - (0.5 - top) * maxRadius * oneHeight,
      };
    } else {
      // height 为主
      maxRadius = this.height / oneHeight;
      this.circleCenter = {
        x: this.center.x - (0.5 - left) * maxRadius * oneWidth,
        y: this.center.y - (0.5 - top) * this.height,
      };
    }

    if (!this.radius) {
      this.radius = maxRadius;
    } else if (this.radius > 0 && this.radius <= 1) {
      this.radius = maxRadius * this.radius;
    } else if (this.radius <= 0 || this.radius > maxRadius) {
      this.radius = maxRadius;
    }

    this.x = {
      start: this.startAngle,
      end: this.endAngle,
    };

    this.y = {
      start: this.innerRadius * this.radius,
      end: this.radius,
    };
  }

  public getRadius() {
    return this.radius;
  }

  public convertPoint(point: Point): Point {
    const center = this.getCenter();

    let { x, y } = point;

    if (this.isTransposed) {
      [x, y] = [y, x];
    }

    x = this.convertDim(x, 'x');
    y = this.convertDim(y, 'y');

    return {
      x: center.x + Math.cos(x) * y,
      y: center.y + Math.sin(x) * y,
    };
  }

  public invertPoint(point: Point): Point {
    const center = this.getCenter();
    const vPoint = [point.x - center.x, point.y - center.y];

    const m = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    mat3.rotate(m, m, this.startAngle);

    let vStart = [1, 0, 0];
    vec3.transformMat3(vStart, vStart, m);
    vStart = [vStart[0], vStart[1]];
    let angle = vec2.angleTo(vStart, vPoint, this.endAngle < this.startAngle);
    if (isNumberEqual(angle, Math.PI * 2)) {
      angle = 0;
    }
    const radius = vec2.length(vPoint);

    let xPercent = angle / (this.endAngle - this.startAngle);
    xPercent = this.endAngle - this.startAngle > 0 ? xPercent : -xPercent;

    const yPercent = this.invertDim(radius, 'y');
    const rst = { x: 0, y: 0 };
    rst.x = this.isTransposed ? yPercent : xPercent;
    rst.y = this.isTransposed ? xPercent : yPercent;
    return rst;
  }

  public getCenter() {
    return this.circleCenter;
  }

  private getOneBox() {
    const startAngle = this.startAngle;
    const endAngle = this.endAngle;
    if (Math.abs(endAngle - startAngle) >= Math.PI * 2) {
      return {
        minX: -1,
        maxX: 1,
        minY: -1,
        maxY: 1,
      };
    }
    const xs = [0, Math.cos(startAngle), Math.cos(endAngle)];
    const ys = [0, Math.sin(startAngle), Math.sin(endAngle)];

    for (let i = Math.min(startAngle, endAngle); i < Math.max(startAngle, endAngle); i += Math.PI / 18) {
      xs.push(Math.cos(i));
      ys.push(Math.sin(i));
    }

    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }
}
