import { Bounds } from './geometry/bounds';
import { LngLat } from './geometry/lng-lat';
import { LngLatBounds } from './geometry/lng-lat-bounds';
import { Point } from './geometry/point';
export type PointTuple = [number, number];
export type PointExpression = Point | PointObject | PointTuple;
export type BoundsLiteral = [PointExpression, PointExpression];
export type BoundsExpression = Bounds | BoundsLiteral;
export type LngLatTuple = [number, number] | [number, number, number];
export type LngLatExpression = LngLat | LngLatObject | LngLatTuple;
export type LngLatBoundsLiteral = LngLatTuple[];
export type LngLatBoundsExpression = LngLatBounds | LngLatBoundsLiteral;
export interface PointObject {
  x: number;
  y: number;
}
export interface LngLatObject {
  lng: number;
  lat: number;
  alt?: number;
}
export interface CRSOption {
  wrapLng: number[] | null;
  wrapLat: number[] | null;
  projection: any;
  transformation: any;
  [propName: string]: any;
  lngLatToPoint(lnglat: LngLat, zoom: number): Point;
}
