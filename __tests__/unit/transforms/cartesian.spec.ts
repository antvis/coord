import { Coordinate, Vector2 } from '../../../src';

describe('Cartesian', () => {
  test('cartesian() maps normalized value to entire bounding areas', () => {
    const coord = new Coordinate({
      transformations: [['cartesian']],
    });
    const v1: Vector2 = [0, 0];
    const v2: Vector2 = [0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1])).toEqual([300, 150]);
    expect(coord.invert([0, 0])).toEqual([0, 0]);
    expect(coord.invert([300, 150])).toEqual([1, 1]);
  });
});
