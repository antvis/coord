import { Coordinate } from '../../../src';

describe('Rotate', () => {
  test('rotate() applies rotate transformation for vector2', () => {
    const coord = new Coordinate();
    coord.transform('rotate', Math.PI / 2);

    let [v1, v2] = coord.map([1, 0]);
    expect(v1).toBeCloseTo(0);
    expect(v2).toBeCloseTo(1);

    [v1, v2] = coord.invert([v1, v2]);
    expect(v1).toBeCloseTo(1);
    expect(v2).toBeCloseTo(0);
  });

  test('rotate() can be applied before cartesian transformation', () => {
    const coord = new Coordinate();
    coord.transform('rotate', Math.PI / 3);
    coord.transform('cartesian', 0, 1, 0, 1);

    let [v1, v2] = coord.map([0.8, 0]);
    expect(v1).toBeCloseTo(120);
    expect(v2).toBeCloseTo(103.9230465888977);

    [v1, v2] = coord.invert([120, 103.9230465888977]);
    expect(v1).toBeCloseTo(0.8);
    expect(v2).toBeCloseTo(0);
  });
});
