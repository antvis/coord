import { LngLat } from '../geometry/lng-lat';
import { Bounds } from '../geometry/bounds';
import { Point } from '../geometry/point';
export const mercator = {
  R: 6378137,
  R_MINOR: 6356752.314245179,

  bounds: new Bounds(
    [-20037508.34279, -15496570.73972],
    [20037508.34279, 18764656.23138],
  ),

  project(lnglat: LngLat): Point {

    const d = Math.PI / 180;
    const  r = this.R;
    const tmp = this.R_MINOR / r;
    const e = Math.sqrt(1 - tmp * tmp);
    let y = lnglat.lat * d;
    const con = e * Math.sin(y);
    const ts =
      Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
    y = -r * Math.log(Math.max(ts, 1e-10));

    return new Point(lnglat.lng * d * r, y);
  },

  unproject(point: Point): LngLat {
    const d = 180 / Math.PI;
    const r = this.R;
    const tmp = this.R_MINOR / r;
    const e = Math.sqrt(1 - tmp * tmp);
    const ts = Math.exp(-point.y / r);
    let phi = Math.PI / 2 - 2 * Math.atan(ts);
    for (let i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i += 1) {
      con = e * Math.sin(phi);
      con = Math.pow((1 - con) / (1 + con), e / 2);
      dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
      phi += dphi;
    }

    return new LngLat((point.x * d) / r, phi * d);
  },
};
