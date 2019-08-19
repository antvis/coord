import { LngLat } from '../geometry/lng-lat';
import { Bounds } from '../geometry/bounds';
import { Point } from '../geometry/point';
export const sphericalMercator = {
  R: 6378137,
  MAX_LATITUDE: 85.0511287798,
  /**
   * 经纬度坐标转平面坐标
   * @param lnglat 经纬度
   */
  project(lnglat: LngLat): Point {
    const d = Math.PI / 180;
    const max = this.MAX_LATITUDE;
    const lat = Math.max(Math.min(max, lnglat.lat), -max);
    const sin = Math.sin(lat * d);

    return new Point(
      this.R * lnglat.lng * d,
      (this.R * Math.log((1 + sin) / (1 - sin))) / 2,
    );
  },
  // 平面坐标转经纬度
  unproject(point: Point): LngLat {
    const d = 180 / Math.PI;

    return new LngLat(
      (point.x * d) / this.R,
      (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
    );
  },

  bounds: (function (): Bounds {
    const d = 6378137 * Math.PI;
    return new Bounds([-d, -d], [d, d]);
  })(),
};
