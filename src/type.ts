import { vec3, mat3 } from '@antv/matrix-util';

type Translate = ['translate', number, number];
type Cartesian = ['cartesian', number, number, number, number];

export type Transformation = Translate | Cartesian;

export type Options = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  transformations?: Transformation[];
};

export type Vector2 = [number, number];

export type Vector3 = vec3;

export type Matrix3 = mat3;

export type Transform = (vector: Vector2) => Vector2;

export type Transformer = {
  transform: Transform;
  untransform: Transform;
};

export type CreateTransformer = (
  params: number[],
  x: number,
  y: number,
  width: number,
  height: number,
) => Transformer | Matrix3;
