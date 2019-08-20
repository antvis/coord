/**
 * @fileOverview the class of Cartesian Coordinate
 * @author sima.zhang
 */
import { CoordCfg, PointRange, PointType } from '../interface';
import Coord from './base';
export default class Cartesian extends Coord {
  public x!: PointRange;
  public y!: PointRange;
  public type: string = 'cartesian';
  public isRect: boolean = true;
  constructor(cfg: CoordCfg) {
    super({
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 0,
        y: 0,
      },
      ...cfg,
    });
    this._init();
  }

  public _init() {
    const start = this.start;
    const end = this.end;
    const x = {
      start: start.x,
      end: end.x,
    };
    const y = {
      start: start.y,
      end: end.y,
    };
    this.x = x;
    this.y = y;
  }

  public convertPoint(point: PointType) {
    let x;
    let y;
    if (this.isTransposed) {
      x = point.y;
      y = point.x;
    } else {
      x = point.x;
      y = point.y;
    }
    return {
      x: this.convertDim(x, 'x'),
      y: this.convertDim(y, 'y'),
    };
  }

  public invertPoint(point: PointType) {
    const x = this.invertDim(point.x, 'x');
    const y = this.invertDim(point.y, 'y');

    if (this.isTransposed) {
      return {
        x: y,
        y: x,
      };
    }

    return {
      x,
      y,
    };
  }
}
