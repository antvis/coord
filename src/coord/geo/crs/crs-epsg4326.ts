import { mix } from '@antv/util';
import { lngLatProjection } from '../projection/lnglat-projection';
import { Transformation } from '../transformation';
import { earth } from './earth';

const transform = new Transformation(1 / 180, 1, -1 / 180, 0.5);
export const epsg4326 = mix({}, earth, {
  code: 'EPSG:4326',
  projection: lngLatProjection,
  transformation: transform,
});
