import { deepMix } from '@antv/util';
import { mat3, vec3 } from '@antv/matrix-util';
import { Options, Transformation, Transform, Vector, Transformer, Matrix3, Vector3, Vector2, Vectors } from './type';
import { compose } from './utils';
import { cartesian, translate } from './transforms';

function isVectors(vector: Vectors): vector is Vector2[] {
  return vector[0] instanceof Array;
}

function isMatrix(transformer: any): transformer is Matrix3 {
  return transformer instanceof Float32Array || transformer instanceof Array;
}

export class Coordinate {
  static transformers = {
    cartesian,
    translate,
  };

  private options: Options;

  private output: Transform;

  private input: Transform;

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
    const { width, height } = this.options;
    return [width, height];
  }

  public getCenter() {
    const { x, y, width, height } = this.options;
    return [(x + width) / 2, (y + height) / 2];
  }

  public transform(...args: Transformation) {
    const { transformations } = this.options;
    this.update({
      transformations: [...transformations, [...args]],
    });
    return this;
  }

  public map(vectors: Vectors) {
    return this.output(vectors);
  }

  public invert(vectors: Vectors) {
    return this.input(vectors);
  }

  private recoordinate() {
    this.output = this.compose();
    this.input = this.compose(true);
  }

  private compose(invert = false) {
    const transformations = invert ? [...this.options.transformations].reverse() : this.options.transformations;
    const getter = invert ? (d: Transformer) => d.untransform : (d: Transformer) => d.transform;
    const matrixes = [];
    const transforms = [];

    for (const [name, ...args] of transformations) {
      const createTransformer = Coordinate.transformers[name];
      if (createTransformer) {
        const { x, y, width, height } = this.options;
        const transformer = createTransformer([...args], x, y, width, height);
        if (isMatrix(transformer)) {
          matrixes.push(transformer);
        } else {
          if (matrixes.length) {
            const transform = this.multiple(this.createMatrixTransform(matrixes, invert));
            transforms.push(transform);
            matrixes.splice(0, matrixes.length);
          }
          const transform = this.multiple(getter(transformer));
          transforms.push(transform);
        }
      }
    }

    if (matrixes.length) {
      const transform = this.multiple(this.createMatrixTransform(matrixes, invert));
      transforms.push(transform);
    }

    return compose<Vectors>(...transforms);
  }

  private createMatrixTransform(matrixes: Matrix3[], invert: boolean): Transform {
    const matrix = mat3.create();
    matrixes.forEach((m) => mat3.mul(matrix, matrix, m));
    if (invert) {
      mat3.invert(matrix, mat3.clone(matrix));
    }
    return (vector: Vector) => {
      const vector3: Vector3 = [vector[0], vector[1], 1];
      vec3.transformMat3(vector3, vector3, matrix);
      return [vector3[0], vector3[1]];
    };
  }

  private multiple(transform: Transform) {
    return (vectors: Vectors) => {
      if (isVectors(vectors)) {
        return vectors.map((v) => transform(v));
      } else {
        return transform(vectors);
      }
    };
  }
}
