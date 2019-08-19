import { LngLat } from '../geometry/lng-lat';
import { Bounds } from '../geometry/bounds';
import { Point } from '../geometry/point';

export const lngLatProjection = {
  project(lngLat: LngLat): Point {
    return new Point(lngLat.lng, lngLat.lat);
  },

  unproject(point: Point): LngLat {
    return new LngLat(point.x, point.y);
  },

  bounds: new Bounds([-180, -90], [180, 90]),
};
