import { deepMix, identity } from '@antv/util';
import { mat3, vec3 } from '@antv/matrix-util';
import { Options, Transformation, Transform, Transformer, Matrix3, Vector3, Vector2 } from './type';
import { compose } from './utils';
import { cartesian, translate, custom } from './transforms';

function isMatrix(transformer: any): transformer is Matrix3 {
  return transformer instanceof Float32Array || transformer instanceof Array;
}

export class Coordinate {
  private options: Options;

  private output: Transform;

  private input: Transform;

  private transformers = {
    cartesian,
    translate,
    custom,
  };

  /**
   * Create a new Coordinate Object.
   * @param options Custom options
   */
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

  /**
   * Update options and inner state.
   * @param options Options to be updated
   */
  public update(options: Partial<Options>) {
    this.options = deepMix({}, this.options, options);
    this.recoordinate();
  }

  /**
   * Returns a new Coordinate with same options.
   * @returns Coordinate
   */
  public clone() {
    return new Coordinate(this.options);
  }

  /**
   * Returns current options.
   * @returns options
   */
  public getOptions() {
    return this.options;
  }

  /**
   * Clear transformations and update.
   */
  public clear() {
    this.update({
      transformations: [],
    });
  }

  /**
   * Returns the size of the bounding box of the coordinate.
   * @returns [width, height]
   */
  public getSize() {
    const { width, height } = this.options;
    return [width, height];
  }

  /**
   * Returns the center of the bounding box of the coordinate.
   * @returns [centerX, centerY]
   */
  public getCenter() {
    const { x, y, width, height } = this.options;
    return [(x + width) / 2, (y + height) / 2];
  }

  /**
   * Add selected transformation.
   * @param args transform type and params
   * @returns Coordinate
   */
  public transform(...args: Transformation) {
    const { transformations } = this.options;
    this.update({
      transformations: [...transformations, [...args]],
    });
    return this;
  }

  /**
   * Apples transformations for the current vector.
   * @param vector original vector2
   * @returns transformed vector2
   */
  public map(vector: Vector2) {
    return this.output(vector);
  }

  /**
   * Apples invert transformations for the current vector.
   * @param vector transformed vector2
   * @param vector original vector2
   */
  public invert(vector: Vector2) {
    return this.input(vector);
  }

  private recoordinate() {
    this.output = this.compose();
    this.input = this.compose(true);
  }

  // 将所有的变换合成一个函数
  // 变换有两种类型：矩阵变换和函数变换
  // 处理过程中需要把连续的矩阵变换合成一个变换函数，然后在和其他变换函数合成最终的变换函数
  private compose(invert = false) {
    const transformations = invert ? [...this.options.transformations].reverse() : this.options.transformations;
    const getter = invert ? (d: Transformer) => d.untransform : (d: Transformer) => d.transform;
    const matrixes = [];
    const transforms = [];

    for (const [name, ...args] of transformations) {
      const createTransformer = this.transformers[name];
      if (createTransformer) {
        const { x, y, width, height } = this.options;
        const transformer = createTransformer([...args], x, y, width, height);
        if (isMatrix(transformer)) {
          // 如果当前变换是矩阵变换，那么先保存下来
          matrixes.push(transformer);
        } else {
          // 如果当前变换是函数变换，并且之前有没有合成的矩阵变换，那么现将之前的矩阵变换合成
          if (matrixes.length) {
            const transform = this.createMatrixTransform(matrixes, invert);
            transforms.push(transform);
            matrixes.splice(0, matrixes.length);
          }
          const transform = getter(transformer) || identity;
          transforms.push(transform);
        }
      }
    }

    // 合成剩下的矩阵变换
    if (matrixes.length) {
      const transform = this.createMatrixTransform(matrixes, invert);
      transforms.push(transform);
    }

    return compose<Vector2>(...transforms);
  }

  // 将连续的矩阵的运算合成一个变换函数
  private createMatrixTransform(matrixes: Matrix3[], invert: boolean): Transform {
    const matrix = mat3.create();
    matrixes.forEach((m) => mat3.mul(matrix, matrix, m));
    if (invert) {
      mat3.invert(matrix, mat3.clone(matrix));
    }
    return (vector: Vector2): Vector2 => {
      const vector3: Vector3 = [vector[0], vector[1], 1];
      vec3.transformMat3(vector3, vector3, matrix);
      return [vector3[0], vector3[1]];
    };
  }
}
