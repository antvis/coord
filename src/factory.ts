import Coord, { CoordConstructor } from './coord/base';

interface CoordMapType {
  [key: string]: any;
}

  // 所有的 Coord map
const COORDINATE_MAP: CoordMapType = {
};

  /**
   * 通过类型获得 Coord 类
   * @param type
   */
const getCoord = (type: string) => {
  return COORDINATE_MAP[type.toLowerCase()];
};

const registerCoord = (type: string, ctor: CoordConstructor): void => {
  // 注册的时候，需要校验 type 重名，不区分大小写
  if (getCoord(type)) {
    throw new Error(`Coordinate type '${type}' existed.`);
  }
  // 存储到 map 中
  COORDINATE_MAP[type.toLowerCase()] = ctor;
};

export {
  getCoord,
  registerCoord,
  Coord,
};

export * from './interface';
