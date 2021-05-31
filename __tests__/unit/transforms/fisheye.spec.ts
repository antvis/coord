import { Coordinate } from '../../../src';

describe('Fisheye', () => {
  test('fisheye.x() applies cartesian fisheye transformation for the first dimension of vector2', () => {
    const coord = new Coordinate({
      transformations: [['cartesian']],
    });
    coord.transform('fisheye.x', 150, 2);

    let from = [0.4, 0.2];
    let to = coord.map(from);
    expect(to).toEqual([85.71428571428571, 30]);
    expect(coord.invert(to)).toEqual(from);

    from = [0.7, 0.3];
    to = coord.map(from);
    expect(coord.invert(to)).toEqual(from);

    coord.transform('fisheye.x', 150, 2);
    from = [0.5, 0.3];
    to = coord.map(from);
    expect(coord.invert(to)).toEqual(from);

    coord.clear();
    coord.transform('fisheye.x', 0, 2);
    from = [-0.5, 0.3];
    to = coord.map(from);
    expect(coord.invert(to)).toEqual(from);
  });

  test('fisheye.y() applies cartesian fisheye transformation for the second dimension of vector2', () => {
    const coord = new Coordinate({
      transformations: [['cartesian']],
    });
    coord.transform('fisheye.y', 75, 2);

    let from = [0.4, 0.2];
    let to = coord.map(from);
    expect(to).toEqual([120, 13.63636363636364]);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);

    from = [0.7, 0.3];
    to = coord.map(from);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);
  });

  test('fisheye() applies cartesian fisheye transformation for both dimensions of vector2', () => {
    const coord = new Coordinate({
      transformations: [['cartesian']],
    });
    coord.transform('fisheye', 150, 75, 2, 2);

    let from = [0.4, 0.2];
    let to = coord.map(from);
    expect(to).toEqual([85.71428571428571, 13.63636363636364]);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);

    from = [0.7, 0.3];
    to = coord.map(from);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);
  });

  test('fisheye.circular() ignores vector2 outside the circle', () => {
    const coord = new Coordinate({
      transformations: [['cartesian']],
    });
    coord.transform('fisheye.circular', 150, 75, 30, 2);

    expect(coord.map([0.5, 0.29])).toEqual([150, 43.5]);
    expect(coord.map([0.5, 0.71])).toEqual([150, 106.5]);
    expect(coord.map([0.61, 0.5])).toEqual([183, 75]);
    expect(coord.map([0.39, 0.5])).toEqual([117, 75]);
    expect(coord.invert([150, 43.5])).toEqual([0.5, 0.29]);
    expect(coord.invert([150, 106.5])).toEqual([0.5, 0.71]);
    expect(coord.invert([183, 75])).toEqual([0.61, 0.5]);
    expect(coord.invert([117, 75])).toEqual([0.39, 0.5]);
  });

  test('fisheye.circular() applies circular transformations for vector2 inside the circle', () => {
    const coord = new Coordinate({
      transformations: [['cartesian']],
    });
    coord.transform('fisheye.circular', 150, 75, 30, 2);

    let from = [0.45, 0.45];
    let to = coord.map(from);
    expect(to).toEqual([128.75388202501892, 64.37694101250946]);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);

    from = [0.55, 0.55];
    to = coord.map(from);
    expect(to).toEqual([171.24611797498108, 85.62305898749054]);
    expect(coord.invert(to)[0]).toBeCloseTo(from[0]);
    expect(coord.invert(to)[1]).toBeCloseTo(from[1]);
  });
});
