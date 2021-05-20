import { deepMix } from '@antv/util';
import { Options } from './type';

export class Coordinate {
  private options: Options;

  constructor(options?: Partial<Options>) {
    this.options = {
      x: 0,
      y: 0,
      width: 300,
      height: 150,
      transforms: [],
    };
    this.update(options);
  }

  public update(options: Partial<Options>) {
    this.options = deepMix({}, this.options, options);
  }

  public clone() {
    return new Coordinate(this.options);
  }

  public getOptions() {
    return this.options;
  }

  public clear() {
    this.update({
      transforms: [],
    });
  }
}
