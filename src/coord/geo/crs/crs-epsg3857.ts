import { earth } from './earth';
import { sphericalMercator } from '../projection/spherical-mercator';
import { Transformation } from '../transformation';
import { mix } from '@antv/util';

const scale = 0.5 / (Math.PI * sphericalMercator.R);
const transform = new Transformation(scale, 0.5, - scale, 0.5);
// @ts-ignore
export const epsg3857 = mix({}, earth, {
  code: 'EPSG:3857',
  projection: sphericalMercator,
  transformation:transform ,
});

export const epsg900913 = mix({}, epsg3857, {
  code: 'EPSG:900913',
});
