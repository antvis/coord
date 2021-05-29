import { Coordinate } from '../../../src';

describe('Helix', () => {
  test('helix() moves the origin to the center of the bounding box', () => {
    const coord = new Coordinate();
    coord.transform('helix', 0, 1, 0, 1);
    coord.transform('cartesian', 0, 1, 0, 1);
    expect(coord.map([0, 0])).toEqual([150, 75]);
  });

  test('helix() maps normalized value to normalized helix coordinate', () => {
    const coord = new Coordinate({
      width: 300,
      height: 300,
      transformations: [
        ['helix', 0, Math.PI * 6, 0, 1],
        ['cartesian', 0, 1, 0, 1],
      ],
    });

    let [v1, v2] = coord.map([0, 1]);
    expect(v1).toBeCloseTo(187.5, 0);
    expect(v2).toBe(150);
    [v1, v2] = coord.invert([v1, v2]);
    expect(v1).toBe(0);
    expect(v2).toBeCloseTo(1);
  });

  test('helix() maps normalized value within the bounding box', () => {
    const coord = new Coordinate({
      width: 200,
      height: 300,
      transformations: [
        ['helix', 0, Math.PI * 6, 0, 1],
        ['cartesian', 0, 1, 0, 1],
      ],
    });

    let [v1, v2] = coord.map([0, 1]);
    expect(v1).toBe(124.75);
    expect(v2).toBe(150);
    [v1, v2] = coord.invert([v1, v2]);
    expect(v1).toBe(0);
    expect(v2).toBeCloseTo(1);
  });
});
