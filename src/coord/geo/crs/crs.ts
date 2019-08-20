import { wrapNum } from '../../../util';
import { Bounds } from '../geometry/bounds';
import { LngLat } from '../geometry/lng-lat';
import { LngLatBounds } from '../geometry/lng-lat-bounds';
import { Point } from '../geometry/point';
import { sphericalMercator } from '../projection/spherical-mercator';
import { Transformation } from '../transformation';

const SCALE = 0.5 / (Math.PI * sphericalMercator.R);
const transform = new Transformation(SCALE, 0.5, -SCALE, 0.5);

interface CRSOption {
  wrapLng: number[] | null;
  wrapLat: number[] | null;
  projection: any;
  transformation: any;
  [propName: string]: any;
  lngLatToPoint(lnglat: LngLat, zoom: number): Point;
}

export const CRS: CRSOption = {
  wrapLng: [-180, 180],
  wrapLat: null,
  projection: sphericalMercator,
  transformation: transform,
  lngLatToPoint(lnglat: LngLat, zoom: number): Point {
    const projectedPoint = this.projection.project(lnglat);
    const scale = this.scale(zoom);
    return this.transformation.transform(projectedPoint, scale);
  },
  pointToLngLat(point: Point, zoom: number): LngLat {
    const scale = this.scale(zoom);
    const untransformedPoint = this.transformation.untransform(point, scale);
    return this.projection.unproject(untransformedPoint);
  },
  project(lnglat: LngLat): Point {
    return this.projection.project(lnglat);
  },
  unproject(point: Point): LngLat {
    return this.projection.unproject(point);
  },
  zoom(scale: number): number {
    return Math.log(scale / 256) / Math.LN2;
  },
  scale(zoom: number): number {
    return 256 * Math.pow(2, zoom);
  },
  getProjectedBounds(zoom: number): Bounds {
    if (this.infinite) {
      return new Bounds([[Infinity, Infinity], [Infinity, Infinity]]);
    }

    const b = this.projection.bounds;
    const s = this.scale(zoom);
    const min = this.transformation.transform(b.min, s);
    const max = this.transformation.transform(b.max, s);
    return new Bounds(min, max);
  },
  infinite: false,
  wrapLngLat(lnglat: LngLat): LngLat {
    const lng = Array.isArray(this.wrapLng) ? wrapNum(lnglat.lng, this.wrapLng, true) : lnglat.lng;
    const lat = Array.isArray(this.wrapLat) ? wrapNum(lnglat.lat, this.wrapLat, true) : lnglat.lat;
    const alt = lnglat.alt;
    return new LngLat(lng, lat, alt);
  },
  wrapLngLatBounds(bounds: LngLatBounds): LngLatBounds {
    const center = bounds.getCenter();
    const newCenter = this.wrapLngLat(center);
    const latShift = center.lat - newCenter.lat;
    const lngShift = center.lng - newCenter.lng;
    if (latShift === 0 && lngShift === 0) {
      return bounds;
    }
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const newSw = new LngLat(sw.lng - lngShift, sw.lat - latShift);
    const newNe = new LngLat(ne.lng - lngShift, ne.lat - latShift);
    return new LngLatBounds(newSw, newNe);
  },
};
