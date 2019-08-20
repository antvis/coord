import { CoordCfg, PointType } from '../interface';
import Coord from './base';
import { getCRS } from './geo/crs';
import { LngLat, toLngLat } from './geo/geometry/lng-lat';
import { Point, toPoint } from './geo/geometry/point';
import { LngLatExpression, PointObject } from './geo/interface';

export default class Geo extends Coord {
  public type: string = 'geo';
  public isGeo: boolean = true;
  public crs: any;
  public zoom: number;
  constructor(cfg: CoordCfg) {
    super({
      projection: 'EPSG3857',
      zoom: 7,
      mapCenter: [116.400146, 39.926588],
      ...cfg,
    });
    cfg.center ? (this.center = cfg.center) : (this.center = this.mapCenter);
    this._init();
  }
  public _init() {
    const start: PointObject = this.start;
    const end: PointObject = this.end;
    this.center = toLngLat(this.center);
    this.width = Math.abs(end.x - start.x);
    this.height = Math.abs(end.y - start.y);
    this.crs = getCRS(this.projection);
  }
  public getZoom(): number {
    return this.zoom;
  }
  public setZoom(zoom: number) {
    this.zoom = zoom;
  }
  public setCenter(center: LngLatExpression) {
    this.center = toLngLat(center);
  }
  public getCenter(): LngLat {
    return this.center;
  }
  /**
   * 经纬度坐标转画布坐标 统一和其他坐标系传入方式 coordControls使用
   * @param point
   */
  public convertPoint(point: PointType): PointType {
    const lngLat: LngLatExpression = [point.x, point.y];
    const ll = this.project(toLngLat(lngLat), this.zoom).round();
    const origin = this.getPixelOrigin();
    const resPoint = ll.subtract(origin);
    return { x: resPoint.x, y: resPoint.y };
  }
  /**
   * 画布坐标转经纬坐标 统一和其他坐标系传入方式
   * @param point
   */
  public invertPoint(point: PointType): PointType {
    const newPoint = toPoint(point);
    const origin = this.getPixelOrigin();
    const px = newPoint.add(origin);
    const lnglat = this.unproject(px, this.zoom);
    return { x: lnglat.lng, y: lnglat.lat };
  }
  /**
   * 画布坐标转经纬坐标 同convertPoint 对用户使用
   * @param point
   */
  public layerPointToLatLng(point: Point): LngLat {
    const origin = this.getPixelOrigin();
    const ll = point.add(origin);
    return this.unproject(ll, this.zoom);
  }
  /**
   * 经纬度坐标转画布坐标 同 invertPoint 对用户使用
   * @param lngLat
   */
  public latLngToLayerPoint(lngLat: LngLatExpression): Point {
    const ll = this.project(toLngLat(lngLat), this.zoom).round();
    const origin = this.getPixelOrigin();
    return ll.subtract(origin);
  }
  // 计算地图中心点像素坐标
  public getPixelOrigin(): Point {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    return this.crs.lngLatToPoint(toLngLat(this.center), this.zoom).subtract({ y: halfHeight, x: halfWidth });
  }
  /**
   * 经纬度坐标转地图像素坐标
   * @param lnglat
   * @param zoom
   */
  public project(lnglat: LngLatExpression, zoom?: number): Point {
    const newZoom = zoom === undefined ? this.zoom : zoom;
    return this.crs.lngLatToPoint(toLngLat(lnglat), newZoom);
  }
  /**
   * 地图像素坐标转经纬度
   * @param point
   * @param zoom
   */
  public unproject(point: Point, zoom?: number): LngLat {
    const newZoom = zoom === undefined ? this.zoom : zoom;
    return this.crs.pointToLngLat(toPoint(point), newZoom);
  }
  public distance(lnglat1: LngLatExpression, lnglat2: LngLatExpression): number {
    return this.crs.distance(toLngLat(lnglat1), toLngLat(lnglat2));
  }
}
