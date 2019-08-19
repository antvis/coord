import { LngLat } from './coord/geo/geometry/lng-lat';

export interface CoordBase {
  [propName: string]: any;
  Cartesian:any;

}
export interface PointType {
  x:number;
  y:number;
}
export interface PointRange {
  start:number;
  end:number;
}
export interface GeoCFG {
  center?:number[];
  zoom?:number;
  projection?:string;
}
export interface CoordCfg{
  center?:number| LngLat;
  start?:PointType;
  end?:PointType;
  matrix?:number[];
  isTransposed?:boolean;
  type?:string;
  projection?:string;
  [key:string]:any;
}
