import { Coordinate } from '../../../src';

describe('Reflect', () => {
  test('reflect() applies reflect transformation for both dimensions of vector2', () => {
    const coord = new Coordinate();
    coord.transform('reflect');

    expect(coord.map([0.1, 0.2])).toEqual([-0.1, -0.2]);
    expect(coord.invert([-0.1, -0.2])).toEqual([0.1, 0.2]);
  });

  test('reflect.x() applies reflect transformation for the first dimension of vector2', () => {
    const coord = new Coordinate();
    coord.transform('reflect.x');

    expect(coord.map([0.1, 0.2])).toEqual([-0.1, 0.2]);
    expect(coord.invert([-0.1, 0.2])).toEqual([0.1, 0.2]);
  });

  test('reflect.y() applies reflect transformation for the second dimension ofvector2', () => {
    const coord = new Coordinate();
    coord.transform('reflect.y');

    expect(coord.map([0.1, 0.2])).toEqual([0.1, -0.2]);
    expect(coord.invert([0.1, -0.2])).toEqual([0.1, 0.2]);
  });
});
