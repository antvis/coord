import { earth } from './earth';
import { epsg3857, epsg900913 } from './crs-epsg3857';
import { epsg4326 } from './crs-epsg4326';
import { simple } from './crs-simple';
// import { CRS } from './crs';

interface CRSType {
  readonly [key: string]: any;
}

  // 所有的 Coord map
const CRS_MAP:CRSType = {
  // crs:CRS,
  epsg3857,
  epsg4326,
  simple,
  earth,
  epsg900913,
};

  /**
   * 通过类型获得 Coord 类
   * @param type
   */
export const getCRS = (type: string) => {
  return CRS_MAP[type.toLowerCase()];
};
