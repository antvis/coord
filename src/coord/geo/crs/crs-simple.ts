import { CRS } from './crs';
import { lngLatProjection } from '../projection/lnglat-projection';
import { Transformation } from '../transformation';
import { LngLat } from '../geometry/lng-lat';
import { mix } from '@antv/util';
const transform = new Transformation(1, 0, -1, 0);
// @ts-ignore
export const simple = mix({}, CRS, {
  projection: lngLatProjection,
  transformation: transform,

  scale(zoom:number):number {
    return Math.pow(2, zoom);
  },

  zoom(scale:number):number {
    return Math.log(scale) / Math.LN2;
  },

  distance(latlng1:LngLat, latlng2:LngLat):number {
    const dx = latlng2.lng - latlng1.lng;
    const dy = latlng2.lat - latlng1.lat;
    return Math.sqrt(dx * dx + dy * dy);
  },

  infinite: true,
});
