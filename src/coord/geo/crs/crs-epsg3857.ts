import { mix } from '@antv/util';
import { earth } from './earth';
// tslint:disable-next-line: ordered-imports
import { sphericalMercator } from '../projection/spherical-mercator';
import { Transformation } from '../transformation';

const scale = 0.5 / (Math.PI * sphericalMercator.R);
const transform = new Transformation(scale, 0.5, -scale, 0.5);

export const epsg3857 = mix({}, earth, {
  code: 'EPSG:3857',
  projection: sphericalMercator,
  transformation: transform,
});

export const epsg900913 = mix({}, epsg3857, {
  code: 'EPSG:900913',
});
