type Translate = ['translate', number, number];
type Scale = ['scale', number, number];
export type Transformation = Translate | Scale;

export type Options = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  transformations?: Transformation[];
};

export type Vector = number[];

export type Transform = (vector: Vector | Vector[]) => Vector | Vector[];
