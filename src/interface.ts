export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Range {
  readonly start: number;
  readonly end: number;
}

export interface CoordinateCfg {
  readonly start: Point;
  readonly end: Point;
  readonly matrix?: number[];
  readonly isTransposed?: boolean;
}

export interface PolarCfg extends CoordinateCfg {
  readonly startAngle?: number;
  readonly endAngle?: number;
  readonly innerRadius?: number;
  readonly radius?: number;
}
