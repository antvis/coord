/**
 * @fileOverview the class of Helix Coordinate
 * @author sima.zhang
 */

import { vec2 } from '@antv/matrix-util';
import { isNumberEqual } from '@antv/util';
import { CoordCfg, PointRange, PointType } from '../interface';
import Coord from './base';
export default class Helix extends Coord {
  public type: string = 'helix';
  public isHelix: boolean = true;
  public a: number;
  public b: number;
  public d: number;
  public x: PointRange;
  public y: PointRange;

  constructor(cfg: CoordCfg) {
    super({
      startAngle: 1.25 * Math.PI,
      endAngle: 7.25 * Math.PI,
      innerRadius: 0,
      ...cfg,
    });
    this._init();
  }

  public _init() {
    const width: number = this.width;
    const height: number = this.height;
    const radius: number = this.radius;
    const innerRadius: number = this.innerRadius;
    const startAngle: number = this.startAngle;
    const endAngle: number = this.endAngle;

    const index: number = (endAngle - startAngle) / (2 * Math.PI) + 1; // 螺线圈数
    let maxRadius: number = Math.min(width, height) / 2;
    if (radius && radius >= 0 && radius <= 1) {
      maxRadius = maxRadius * radius;
    }

    const d: number = Math.floor((maxRadius * (1 - innerRadius)) / index);
    const a: number = d / (Math.PI * 2); // 螺线系数
    const x: PointRange = {
      start: startAngle,
      end: endAngle,
    };
    const y: PointRange = {
      end: innerRadius * maxRadius + d * 0.99,
      start: innerRadius * maxRadius,
    };

    this.a = a;
    this.d = d;
    this.x = x;
    this.y = y;
  }

  public getCenter(): PointType {
    return this.center;
  }

  /**
   * 将百分比数据变成屏幕坐标
   * @param  {Object} PointType 归一化的点坐标
   * @return {Object}       返回对应的屏幕坐标
   */
  public convertPoint(point: PointType): PointType {
    const a = this.a;
    const center = this.center;
    let x;
    let y;

    if (this.isTransposed) {
      x = point.y;
      y = point.x;
    } else {
      x = point.x;
      y = point.y;
    }
    const thi = this.convertDim(x, 'x');
    const r = a * thi;
    const newY = this.convertDim(y, 'y');

    return {
      x: center.x + Math.cos(thi) * (r + newY),
      y: center.y + Math.sin(thi) * (r + newY),
    };
  }

  /**
   * 将屏幕坐标点还原成百分比数据
   * @param  {Object} PointType 屏幕坐标
   * @return {Object}       返回对应的归一化后的数据
   */
  public invertPoint(point: PointType): PointType {
    const center: PointType = this.center;
    const a = this.a;
    const d = this.d + this.y.start;
    const v = vec2.subtract([], [point.x, point.y], [center.x, center.y]);
    let thi = vec2.angleTo(v, [1, 0], true);
    let rMin = thi * a; // 坐标与原点的连线在第一圈上的交点，最小r值

    if (vec2.length(v) < rMin) {
      // 坐标与原点的连线不可能小于最小r值，但不排除因小数计算产生的略小于rMin的情况
      rMin = vec2.length(v);
    }

    const index = Math.floor((vec2.length(v) - rMin) / d); // 当前点位于第index圈
    thi = 2 * index * Math.PI + thi;
    const r = a * thi;
    let newY = vec2.length(v) - r;
    newY = isNumberEqual(newY, 0) ? 0 : newY;

    let x = this.invertDim(thi, 'x');
    let y = this.invertDim(newY, 'y');
    x = isNumberEqual(x, 0) ? 0 : x;
    y = isNumberEqual(y, 0) ? 0 : y;

    const rst: PointType = { x: 0, y: 0 };
    rst.x = this.isTransposed ? y : x;
    rst.y = this.isTransposed ? x : y;
    return rst;
  }
}
