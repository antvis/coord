import { Coordinate } from '../../../src';

describe('scale', () => {
  test('scale() applies translate transformation for vector2', () => {
    const coord = new Coordinate();
    coord.transform('scale', 2, 4);

    expect(coord.map([0.1, 0.2])).toEqual([0.2, 0.8]);
    expect(coord.map([-0.1, -0.2])).toEqual([-0.2, -0.8]);
    expect(coord.invert([0.2, 0.8])).toEqual([0.1, 0.2]);
    expect(coord.invert([-0.2, -0.8])).toEqual([-0.1, -0.2]);
  });

  test('scale() can be applied after cartesian transformation', () => {
    const coord = new Coordinate();
    coord.transform('cartesian');
    coord.transform('scale', 2, 4);

    expect(coord.map([0.1, 0.2])).toEqual([60, 120]);
    expect(coord.map([-0.1, -0.2])).toEqual([-60, -120]);
    expect(coord.invert([60, 120])).toEqual([0.1, 0.2]);
    expect(coord.invert([-60, -120])).toEqual([-0.1, -0.2]);
  });

  test('scale() can be applied before cartesian transformation', () => {
    const coord = new Coordinate();
    coord.transform('scale', 2, 4);
    coord.transform('cartesian');

    expect(coord.map([0.1, 0.2])).toEqual([60, 120]);
    expect(coord.map([-0.1, -0.2])).toEqual([-60, -120]);
    expect(coord.invert([60, 120])).toEqual([0.1, 0.2]);
    expect(coord.invert([-60, -120])).toEqual([-0.1, -0.2]);
  });
});
