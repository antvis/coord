import { Coordinate } from '../../../src';

describe('Matrix', () => {
  test('Matrix() can use custom matrix', () => {
    const coord = new Coordinate({
      transformations: [['cartesian', 0, 1, 0, 1]],
    });

    coord.transform('matrix', [1, 0, 0, 0, 1, 0, 10, 20, 1]);

    expect(coord.map([0.5, 0.5])).toEqual([160, 95]);
    expect(coord.invert([160, 95])).toEqual([0.5, 0.5]);
  });
});
