import { deepMix } from '@antv/util';
import { Options, Transformation } from './type';

export class Coordinate {
  private options: Options;

  private x: number;

  private y: number;

  private width: number;

  private height: number;

  constructor(options?: Partial<Options>) {
    this.options = {
      x: 0,
      y: 0,
      width: 300,
      height: 150,
      transformations: [],
    };
    this.update(options);
  }

  public update(options: Partial<Options>) {
    this.options = deepMix({}, this.options, options);
    this.recoordinate();
  }

  public clone() {
    return new Coordinate(this.options);
  }

  public getOptions() {
    return this.options;
  }

  public clear() {
    this.update({
      transformations: [],
    });
  }

  public getSize() {
    return [this.width, this.height];
  }

  public getCenter() {
    const { x, y, width, height } = this;
    return [(x + width) / 2, (y + height) / 2];
  }

  public transform(...args: Transformation) {
    const { transformations } = this.options;
    this.update({
      transformations: [...transformations, [...args]],
    });
    return this;
  }

  private recoordinate() {
    const { width, height, x, y } = this.options;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}
