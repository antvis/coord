import { Coordinate } from '../../../src';

describe('Polar', () => {
  test('polar() moves the origin to the center of the bounding box', () => {
    const coord = new Coordinate();
    coord.transform('polar', 0, 1, 0, 1);
    coord.transform('cartesian');
    expect(coord.map([0, 0])).toEqual([150, 75]);
  });

  test('polar() maps normalized value to normalized polar coordinate', () => {
    const coord = new Coordinate({
      width: 200,
      height: 300,
      transformations: [['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0, 1], ['cartesian']],
    });

    let [v1, v2] = coord.map([0, 1]);
    expect(v1).toBe(100);
    expect(v2).toBeCloseTo(50);
    expect(coord.invert([v1, v2])).toEqual([0, 1]);

    expect(coord.map([0.25, 1])).toEqual([200, 150]);
    expect(coord.invert([200, 150])).toEqual([0.25, 1]);

    expect(coord.map([0.5, 0.5])).toEqual([100, 200]);
    [v1, v2] = coord.invert([100, 200]);
    expect(v1).toBe(0.5);
    expect(v2).toBeCloseTo(0.5);
  });

  test('polar() maps normalized value within the bounding box', () => {
    const coord = new Coordinate({
      width: 300,
      height: 200,
      transformations: [['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0, 1], ['cartesian']],
    });

    expect(coord.map([0, 1])).toEqual([150, 0]);
    expect(coord.invert([150, 0])).toEqual([0, 1]);

    let [v1, v2] = coord.map([0.25, 1]);
    expect(v1).toBeCloseTo(250);
    expect(v2).toBe(100);
    [v1, v2] = coord.invert([250, 100]);
    expect(v1).toBe(0.25);
    expect(v2).toBeCloseTo(1);

    expect(coord.map([0.5, 0.5])).toEqual([150, 150]);
    expect(coord.invert([150, 150])).toEqual([0.5, 0.5]);
  });

  test('polar() inverts correctly if angle range is not [-pi, pi]', () => {
    const coord = new Coordinate().transform('polar', -Math.PI / 2, (Math.PI * 3) / 2, 0, 1);

    let from = [0.6, 0.5];
    let to = coord.map(from);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);

    const coord2 = new Coordinate().transform('polar', (-Math.PI * 3) / 2, Math.PI / 2, 0, 1);

    from = [0.2, 0.5];
    to = coord2.map(from);
    expect(coord2.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord2.invert(to)[1]).toBeCloseTo(from[1]);
  });

  test('polar() can draw doughnut chart', () => {
    const coord = new Coordinate({
      width: 200,
      height: 200,
      transformations: [['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0.2, 0.8], ['cartesian']],
    });

    expect(coord.map([0, 0])).toEqual([100, 80]);
    const [v1, v2] = coord.map([0, 1]);
    expect(v1).toBe(100);
    expect(v2).toBeCloseTo(20);
  });

  test('polar.theta() fixes radius greater than 0 to 1', () => {
    const coord1 = new Coordinate({
      width: 200,
      height: 200,
      transformations: [['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0.2, 0.8], ['cartesian']],
    });

    const coord2 = new Coordinate({
      width: 200,
      height: 200,
      transformations: [['polar.theta', -Math.PI / 2, (Math.PI * 3) / 2, 0.2, 0.8], ['cartesian']],
    });

    expect(coord1.map([0.5, 1])).toEqual(coord2.map([0.5, 0.5]));
    expect(coord1.map([0, 1])).toEqual(coord2.map([0, 0.6]));

    const v = coord2.map([0.5, 0.5]);
    expect(coord2.invert(v)).toEqual([0.5, 1]);

    expect(coord1.map([0, 0])).toEqual(coord2.map([0, 0]));
  });

  test('polar.rho() fixes angle getter than 0 to 1', () => {
    const coord1 = new Coordinate({
      width: 200,
      height: 200,
      transformations: [['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0.2, 0.8], ['cartesian']],
    });

    const coord2 = new Coordinate({
      width: 200,
      height: 200,
      transformations: [['polar.rho', -Math.PI / 2, (Math.PI * 3) / 2, 0.2, 0.8], ['cartesian']],
    });

    expect(coord1.map([1, 0.5])).toEqual(coord2.map([0.5, 0.5]));
    expect(coord1.map([1, 0.6])).toEqual(coord2.map([0, 0.6]));

    const v = coord2.map([0.5, 0.5]);
    const [v1, v2] = coord2.invert(v);
    expect(v1).toBeCloseTo(1);
    expect(v2).toBeCloseTo(0.5);
  });
});
