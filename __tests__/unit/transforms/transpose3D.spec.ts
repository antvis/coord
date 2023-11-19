import { Coordinate, Coordinate3D, Vector3 } from '../../../src';

describe('Transpose3D', () => {
  test('transpose() exchanges dimensions', () => {
    const coord = new Coordinate3D();
    coord.transform('transpose3D');
    const constZ = 0.3;
    expect(coord.map([0, 1, constZ])).toEqual([1, 0, constZ]);
    expect(coord.map([0.2, 0.8, constZ])).toEqual([0.8, 0.2, constZ]);
    expect(coord.invert([1, 0, constZ])).toEqual([0, 1, constZ]);
    expect(coord.map([0.8, 0.2, constZ])).toEqual([0.2, 0.8, constZ]);
  });

  test('cartesian3D transpose', () => {
    const coord = new Coordinate3D({
      transformations: [['cartesian3D'], ['transpose3D']],
      width: 300,
      height: 150,
      depth: 100,
    });

    const v1: Vector3 = [0, 0, 0];
    const v2: Vector3 = [0, 0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1, 1])).toEqual([150, 300, 100]);
    expect(coord.invert([0, 0, 0])).toEqual([0, 0, 0]);
    expect(coord.invert([150, 300, 100])).toEqual([1, 1, 1]);
  });
});
