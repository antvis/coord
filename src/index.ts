import Coord from './coord/base';
import Cartesian from './coord/cartesian';
import Geo from './coord/geo';
import Helix from './coord/helix';
import Polar from './coord/polar';
import { getCoord, registerCoord } from './factory';

registerCoord('coord', Coord);
registerCoord('rect', Cartesian);
registerCoord('cartesian', Cartesian);
registerCoord('polar', Polar);
registerCoord('helix', Helix);
registerCoord('geo', Geo);

export { getCoord, registerCoord, Coord };

export * from './interface';
