import { Coordinate3D } from '../../../src';

describe('scale3D', () => {
  test('scale3D() applies translate transformation for vector2', () => {
    const coord = new Coordinate3D();
    coord.transform('scale3D', 2, 4, 2);

    expect(coord.map([0.1, 0.2, 0.1])).toEqual([0.2, 0.8, 0.2]);
    expect(coord.map([-0.1, -0.2, -0.1])).toEqual([-0.2, -0.8, -0.2]);
    expect(coord.invert([0.2, 0.8, 0.2])).toEqual([0.1, 0.2, 0.1]);
    expect(coord.invert([-0.2, -0.8, -0.2])).toEqual([-0.1, -0.2, -0.1]);
  });

  test('scale3D() can be applied after cartesian transformation', () => {
    const coord = new Coordinate3D();
    coord.transform('cartesian3D');
    coord.transform('scale3D', 2, 4, 2);

    expect(coord.map([0.1, 0.2, 0.1])).toEqual([60, 120, 30]);
    expect(coord.map([-0.1, -0.2, -0.1])).toEqual([-60, -120, -30]);
    expect(coord.invert([60, 120, 30])).toEqual([0.1, 0.2, 0.1]);
    expect(coord.invert([-60, -120, -30])).toEqual([-0.1, -0.2, -0.1]);
  });

  test('scale3D() can be applied before cartesian transformation', () => {
    const coord = new Coordinate3D();
    coord.transform('scale3D', 2, 4, 2);
    coord.transform('cartesian3D');

    expect(coord.map([0.1, 0.2, 0.1])).toEqual([60, 120, 30]);
    expect(coord.map([-0.1, -0.2, -0.1])).toEqual([-60, -120, -30]);
    expect(coord.invert([60, 120, 30])).toEqual([0.1, 0.2, 0.1]);
    expect(coord.invert([-60, -120, -30])).toEqual([-0.1, -0.2, -0.1]);
  });
});
