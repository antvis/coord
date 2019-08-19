import  * as CRSBase from './crs';
import { LngLat } from '../geometry/lng-lat';
import { mix } from '@antv/util';
// @ts-ignore
export const earth = mix({}, CRSBase.CRS, {
  wrapLng: [-180, 180],
  R: 6371000,
  distance(latlng1:LngLat, latlng2:LngLat):number {
    const rad = Math.PI / 180;
    const lat1 = latlng1.lat * rad;
    const lat2 = latlng2.lat * rad;
    const sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2);
    const sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2);
    const a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.R * c;
  },
});
