import { earth } from '../crs/earth';
import { formatNum } from '../../../util';
import { toLngLatBounds } from './lng-lat-bounds';
import { LngLatExpression } from '../interface';

export class LngLat {
  lat: number;
  lng: number;
  alt?: number;
  constructor(lng: number, lat: number, alt?: number) {
    if (isNaN(lat) || isNaN(lng)) {
      throw new Error(`无效的经纬度参数: (${lng},' ${lat}`);
    }
    this.lat = +lat;
    this.lng = +lng;
    if (alt !== undefined) {
      this.alt = +alt;
    }
  }
  equals(lnglat: LngLatExpression, threshold?: number): boolean {
    if (!lnglat) {
      return false;
    }
    const newLnglat : LngLat = toLngLat(lnglat);
    if (newLnglat === undefined) {
      return false;
    }
    const margin = Math.max(
      Math.abs(this.lat - newLnglat.lat),
      Math.abs(this.lng - newLnglat.lng),
    );
    return margin <= (threshold === undefined ? 1.0e-9 : threshold);
  }
  toString(precision: number): string {
    return (
      `LngLat(${formatNum(this.lng, precision)}, ${formatNum(this.lat, precision)})`
    );
  }
  distanceTo(other:LngLatExpression):number {
    return earth.distance(this, toLngLat(other));
  }
  wrap():LngLat {
    // console.log(earth.infinite);
    return earth.wrapLngLat(this);
  }
  toBounds(sizeInMeters:number) {
    const latAccuracy = 180 * sizeInMeters / 40075017;
    const lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

    return toLngLatBounds(
              [this.lng - lngAccuracy, this.lat - latAccuracy],
              [this.lng + lngAccuracy, this.lat + latAccuracy]);
  }
  clone() {
    return new LngLat(this.lng, this.lat, this.alt);
  }
}
export function toLngLat(
  a: LngLatExpression | number,
  b?: number,
  c?: number,
): LngLat {
  if (a instanceof LngLat) {
    return a;
  }
  if (Array.isArray(a) && typeof a[0] !== 'object') {
    if (a.length === 3) {
      return new LngLat(a[0], a[1], a[2]);
    }
    if (a.length === 2) {
      return new LngLat(a[0], a[1]);
    }
  }
  if (a === undefined || a === null) {
    throw new Error(`无效的经纬度参数: (${a}, ${b})`);
  }
  if (typeof a === 'object' && 'lat' in a) {
    return new LngLat(a.lng, 'lng' in a ? a.lat : 0, a.alt);
  }
  if (b === undefined) {
    throw new Error(`无效的经纬度参数: (${a}, ${b})`);
  }
  return new LngLat(Number(a), b, c);
}
