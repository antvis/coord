import { Coordinate, Vector3 } from '../../../src';

describe('Cartesian3D', () => {
  test('cartesian3D() maps normalized value to entire bounding areas', () => {
    const coord = new Coordinate({
      transformations: [['cartesian3D']],
      depth: 100,
    });
    const v1: Vector3 = [0, 0, 0];
    const v2: Vector3 = [0, 0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1, 1])).toEqual([300, 150, 100]);
    expect(coord.invert(v1)).toEqual(v2);
    expect(coord.invert([300, 150, 100])).toEqual([1, 1, 1]);
  });

  test('cartesian3D() should use default depth & z if not provided', () => {
    const coord = new Coordinate({
      transformations: [['cartesian3D']],
    });
    const v1: Vector3 = [0, 0, 0];
    const v2: Vector3 = [0, 0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1, 1])).toEqual([300, 150, 0]);
  });
});
