import { Coordinate } from '../../../src';

describe('Shear', () => {
  test('shear.x() applies shear transformation for the first dimension of vector2.', () => {
    const coord = new Coordinate();
    coord.transform('shear.x', Math.PI / 4);
    let [v1, v2] = coord.map([0, 0.4]);
    expect(v1).toBeCloseTo(0.4);
    expect(v2).toBeCloseTo(0.4);

    [v1, v2] = coord.invert([0.4, 0.4]);
    expect(v1).toBeCloseTo(0);
    expect(v2).toBeCloseTo(0.4);

    [v1, v2] = coord.map([0.5, 0.2]);
    expect(v1).toBeCloseTo(0.7);
    expect(v2).toBeCloseTo(0.2);

    [v1, v2] = coord.invert([0.7, 0.2]);
    expect(v1).toBeCloseTo(0.5);
    expect(v2).toBeCloseTo(0.2);
  });

  test('shear.x() applies shear transformation for the second dimension of vector2.', () => {
    const coord = new Coordinate();
    coord.transform('shear.y', Math.PI / 4);
    let [v1, v2] = coord.map([0.4, 0]);
    expect(v1).toBeCloseTo(0.4);
    expect(v2).toBeCloseTo(0.4);

    [v1, v2] = coord.invert([0.4, 0.4]);
    expect(v1).toBeCloseTo(0.4);
    expect(v2).toBeCloseTo(0);

    [v1, v2] = coord.map([0.2, 0.5]);
    expect(v1).toBeCloseTo(0.2);
    expect(v2).toBeCloseTo(0.7);

    [v1, v2] = coord.invert([0.2, 0.7]);
    expect(v1).toBeCloseTo(0.2);
    expect(v2).toBeCloseTo(0.5);
  });
});
