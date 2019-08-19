import { getCoord, registerCoord } from './factory';
import Coord from './coord/base';
import Geo from './coord/geo';
import Cartesian  from './coord/cartesian';
import Polar  from './coord/polar';
import Helix  from './coord/helix';

registerCoord('coord', Coord);
registerCoord('rect', Cartesian);
registerCoord('cartesian', Cartesian);
registerCoord('polar', Polar);
registerCoord('helix', Helix);
registerCoord('geo', Geo);

export {
  getCoord,
  registerCoord,
  Coord,
};

export * from './interface';
