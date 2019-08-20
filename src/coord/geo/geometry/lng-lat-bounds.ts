import { LngLatBoundsExpression, LngLatBoundsLiteral, LngLatExpression } from '../interface';
import { LngLat, toLngLat } from './lng-lat';
export class LngLatBounds {
  public southWest!: LngLat;
  public northEast!: LngLat;
  constructor(corner1: LngLatExpression | LngLatBoundsLiteral, corner2?: LngLatExpression) {
    if (!corner1) {
      return;
    }
    const latlngs = corner2 ? [corner1, corner2] : corner1;
    if (Array.isArray(latlngs)) {
      for (let i = 0, len = latlngs.length; i < len; i += 1) {
        // @ts-ignore
        this.extend(latlngs[i]);
      }
    }
  }
  public extend(obj: LngLatExpression | LngLatBoundsExpression): LngLatBounds {
    const sw: LngLat = this.southWest;
    const ne: LngLat = this.northEast;
    let sw2: LngLat;
    let ne2: LngLat;

    if (obj instanceof LngLat) {
      sw2 = obj;
      ne2 = obj;
    } else if (obj instanceof LngLatBounds) {
      sw2 = obj.southWest;
      ne2 = obj.northEast;
      if (!sw2 || !ne2) {
        return this;
      }
    } else {
      if (obj && Array.isArray(obj)) {
        if (Array.isArray(obj[0])) {
          return this.extend(toLngLatBounds(obj as LngLatBoundsExpression));
        }
        return this.extend(toLngLat(obj as LngLatExpression));
      }
      return this;
    }
    if (!sw && !ne) {
      this.southWest = new LngLat(sw2.lng, sw2.lat);
      this.northEast = new LngLat(ne2.lng, ne2.lat);
    } else {
      sw.lat = Math.min(sw2.lat, sw.lat);
      sw.lng = Math.min(sw2.lng, sw.lng);
      ne.lat = Math.max(ne2.lat, ne.lat);
      ne.lng = Math.max(ne2.lng, ne.lng);
    }
    return this;
  }
  /**
   * 放大或者缩小区域
   * @param bufferRatio 缩放比率
   */
  public pad(bufferRatio: number): LngLatBounds {
    const sw = this.southWest;
    const ne = this.northEast;
    const heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio;
    const widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
    return new LngLatBounds(
      new LngLat(sw.lng - widthBuffer, sw.lat - heightBuffer),
      new LngLat(ne.lng + widthBuffer, ne.lat + heightBuffer)
    );
  }
  public getCenter(): LngLat {
    return new LngLat((this.southWest.lng + this.northEast.lng) / 2, (this.southWest.lat + this.northEast.lat) / 2);
  }
  public getSouthWest(): LngLat {
    return this.southWest;
  }
  public getNorthEast(): LngLat {
    return this.northEast;
  }
  public getNorthWest(): LngLat {
    return new LngLat(this.getWest(), this.getNorth());
  }
  public getSouthEast() {
    return new LngLat(this.getEast(), this.getSouth());
  }
  public getWest(): number {
    return this.southWest.lng;
  }
  public getSouth(): number {
    return this.southWest.lat;
  }
  public getNorth(): number {
    return this.northEast.lat;
  }
  public getEast(): number {
    return this.northEast.lng;
  }
  public contains(obj: LngLatExpression | LngLatBoundsExpression) {
    let newObj = obj;
    if ((Array.isArray(newObj) && typeof newObj[0] === 'number') || newObj instanceof LngLat || 'lat' in newObj) {
      newObj = toLngLat(newObj as LngLatExpression);
    } else {
      newObj = toLngLatBounds(newObj);
    }
    const sw = this.southWest;
    const ne = this.northEast;
    let sw2;
    let ne2;

    if (newObj instanceof LngLatBounds) {
      sw2 = newObj.getSouthWest();
      ne2 = newObj.getNorthEast();
    } else {
      sw2 = ne2 = newObj;
    }
    return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
  }
  // 包含相邻的多边形
  public intersects(bounds: LngLatBoundsExpression): boolean {
    const newBounds = toLngLatBounds(bounds);
    const sw = this.southWest;
    const ne = this.northEast;
    const sw2 = newBounds.getSouthWest();
    const ne2 = newBounds.getNorthEast();
    const latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat;
    const lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
    return latIntersects && lngIntersects;
  }
  // 不包括相邻的多边形
  public overlaps(bounds: LngLatBoundsExpression) {
    const newBounds = toLngLatBounds(bounds);
    const sw = this.southWest;
    const ne = this.northEast;
    const sw2 = newBounds.getSouthWest();
    const ne2 = newBounds.getNorthEast();
    const latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat;
    const lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
    return latOverlaps && lngOverlaps;
  }
  public toBBoxString(): string {
    return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
  }
  public equals(bounds: LngLatBoundsExpression, maxMargin: number): boolean {
    if (!bounds) {
      return false;
    }
    const newBounds = toLngLatBounds(bounds);
    return (
      this.southWest.equals(newBounds.getSouthWest(), maxMargin) &&
      this.northEast.equals(newBounds.getNorthEast(), maxMargin)
    );
  }
  public isValid() {
    return !!(this.southWest && this.northEast);
  }
}

export function toLngLatBounds(a: LngLatExpression | LngLatBounds | LngLatBoundsLiteral, b?: LngLatExpression) {
  if (a instanceof LngLatBounds) {
    return a;
  }
  if (b !== undefined) {
    return new LngLatBounds(a as LngLatExpression, b);
  }
  return new LngLatBounds(a as LngLatBoundsLiteral);
}
