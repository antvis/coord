import { Coordinate } from '../../../src';

describe('Translate', () => {
  test('translate() apple translate transformation for vector2', () => {
    const coord = new Coordinate();
    coord.transform('translate', 0.1, 0.2);
    const [v1, v2] = coord.map([0, 0]);
    expect(v1).toBeCloseTo(0.1);
    expect(v2).toBeCloseTo(0.2);
  });

  test('translate() can be applied before cartesian transformation', () => {
    const coord = new Coordinate();
    coord.transform('translate', 0.1, 0.1);
    coord.transform('cartesian', 0, 1, 0, 1);
    const [v1, v2] = coord.map([0, 0]);
    expect(v1).toBeCloseTo(30);
    expect(v2).toBeCloseTo(15);
  });

  test('translate() can be applied after cartesian transformation', () => {
    const coord = new Coordinate();
    coord.transform('cartesian', 0, 1, 0, 1);
    coord.transform('translate', 10, 20);
    expect(coord.map([0, 0])).toEqual([10, 20]);
    expect(coord.invert([10, 20])).toEqual([0, 0]);
  });
});
