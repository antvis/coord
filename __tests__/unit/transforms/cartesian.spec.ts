import { Coordinate, Vector2 } from '../../../src';

describe('Cartesian', () => {
  test('cartesian() maps normalized value to entire bounding areas', () => {
    const coord = new Coordinate({
      transformations: [['cartesian', 0, 1, 0, 1]],
    });
    const v1: Vector2 = [0, 0];
    const v2: Vector2 = [0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1])).toEqual([300, 150]);
    expect(coord.invert([0, 0])).toEqual([0, 0]);
    expect(coord.invert([300, 150])).toEqual([1, 1]);
  });

  test('cartesian() maps normalized value to part of the bounding rect', () => {
    const coord = new Coordinate({
      transformations: [['cartesian', 0.2, 0.8, 0.1, 0.9]],
    });

    expect(coord.map([0, 0])).toEqual([60, 15]);
    expect(coord.map([1, 1])).toEqual([240, 135]);
    expect(coord.invert([60, 15])).toEqual([0, 0]);
    expect(coord.invert([240, 135])).toEqual([1, 1]);
  });
});
