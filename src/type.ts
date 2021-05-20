type Translate = ['translate', number, number];
type Scale = ['scale', number, number];
export type Transform = Translate | Scale;

export type Options = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  transforms?: Transform[];
};
