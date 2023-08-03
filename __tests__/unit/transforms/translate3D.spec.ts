import { Coordinate3D } from '../../../src';

describe('Translate3D', () => {
  test('translate3D() applies translate transformation for vector3', () => {
    const coord = new Coordinate3D();
    coord.transform('translate3D', 0.1, 0.2, 0.3);
    const [v1, v2, v3] = coord.map([0, 0, 0]);
    expect(v1).toBeCloseTo(0.1);
    expect(v2).toBeCloseTo(0.2);
    expect(v3).toBeCloseTo(0.3);
  });

  test('translate3D() can be applied before cartesian transformation', () => {
    const coord = new Coordinate3D();
    coord.transform('translate3D', 0.1, 0.1, 0.1);
    coord.transform('cartesian3D');
    const [v1, v2, v3] = coord.map([0, 0, 0]);
    expect(v1).toBeCloseTo(30);
    expect(v2).toBeCloseTo(15);
    expect(v3).toBeCloseTo(15);
  });

  test('translate3D() can be applied after cartesian transformation', () => {
    const coord = new Coordinate3D();
    coord.transform('cartesian3D');
    coord.transform('translate3D', 10, 20, 30);
    expect(coord.map([0, 0, 0])).toEqual([10, 20, 30]);
    expect(coord.invert([10, 20, 30])).toEqual([0, 0, 0]);
  });
});
