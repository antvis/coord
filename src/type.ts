import { vec3, mat3 } from '@antv/matrix-util';

export type TransformCallback = (x: number, y: number, width: number, height: number) => Transformer;

type Translate = ['translate', number, number];
type Cartesian = ['cartesian'];
type Custom = ['custom', TransformCallback];
type Matrix = ['matrix', Matrix3];
type Polar = ['polar', number, number, number, number];
type PolarTheta = ['polar.theta', number, number, number, number];
type PolarRho = ['polar.rho', number, number, number, number];
type Transpose = ['transpose'];
type Scale = ['scale', number, number];
type Reflect = ['reflect'];
type ReflectX = ['reflect.x'];
type ReflectY = ['reflect.y'];
type Rotate = ['rotate', number];
type Helix = ['helix', number, number, number, number];
type Parallel = ['parallel', number, number, number, number];

export type Transformation =
  | Translate
  | Cartesian
  | Custom
  | Matrix
  | Polar
  | PolarTheta
  | PolarRho
  | Transpose
  | Scale
  | Reflect
  | ReflectX
  | ReflectY
  | Rotate
  | Helix
  | Parallel;

export type Options = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  transformations?: Transformation[];
};

export type Vector2 = [number, number];

export type Vector3 = vec3;

export type Vector = number[];

export type Matrix3 = mat3;

export type Transform = (vector: Vector2 | Vector) => Vector2 | Vector;

export type Transformer = {
  transform?: Transform;
  untransform?: Transform;
};

export type CreateTransformer = (
  params: number[] | [TransformCallback] | [Matrix3],
  x: number,
  y: number,
  width: number,
  height: number,
) => Transformer | Matrix3;
