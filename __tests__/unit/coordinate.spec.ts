import { Coordinate, Options, Vector2, Transformation } from '../../src';

describe('Coordinate', () => {
  test('coord.getOptions() returns the reference for options', () => {
    const coord = new Coordinate();
    // @ts-ignore
    expect(coord.getOptions()).toBe(coord.options);
  });

  test('coord.getSize() returns current size of the bounding box', () => {
    const coord = new Coordinate({
      width: 100,
      height: 50,
    });

    expect(coord.getSize()).toEqual([100, 50]);
  });

  test('coord.getCenter() returns current center of the bounding box', () => {
    const coord = new Coordinate({
      width: 100,
      height: 50,
      x: 10,
      y: 20,
    });

    expect(coord.getCenter()).toEqual([55, 35]);
  });

  test('new Coordinate() has expected defaults', () => {
    const coord = new Coordinate();

    expect(coord.getOptions()).toEqual({
      x: 0,
      y: 0,
      width: 300,
      height: 150,
      transformations: [],
    });

    expect(coord.getSize()).toEqual([300, 150]);
    expect(coord.getCenter()).toEqual([150, 75]);
  });

  test('new Coordinate(options) override defaults', () => {
    const translate: Transformation = ['translate', 10, 10];
    const options: Options = {
      x: 10,
      y: 20,
      width: 200,
      height: 100,
      transformations: [translate],
    };
    const coord = new Coordinate(options);

    expect(coord.getOptions()).toEqual(options);
    expect(coord.getOptions()).not.toBe(options);
  });

  test('coord.update() updates options', () => {
    const coord = new Coordinate();
    coord.update({
      x: 10,
    });
    expect(coord.getOptions().x).toBe(10);
  });

  test('coord.transform() updates options.transformations', () => {
    const coord = new Coordinate();
    coord.transform('translate', 10, 10);
    expect(coord.getOptions().transformations).toEqual([['translate', 10, 10]]);
  });

  test('coord.transform() returns current coord', () => {
    const coord = new Coordinate();
    expect(coord.transform('translate', 10, 10)).toBe(coord);
  });

  test('coord.map() and coord.invert() are identity functions without transforms', () => {
    const coord = new Coordinate();

    expect(coord.map([1, 2])).toEqual([1, 2]);
    expect(coord.map([3, 4])).toEqual([3, 4]);
    expect(coord.invert([1, 2])).toEqual([1, 2]);
    expect(coord.invert([3, 4])).toEqual([3, 4]);
  });

  test('coord.map() and coord.invert() composes built-in function transformation', () => {
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

  test('coord.map() and coord.invert() composes built-in matrix transformation', () => {
    const coord = new Coordinate();
    coord.transform('translate', 0.1, 0.2);
    const [v1, v2] = coord.map([0, 0]);
    expect(v1).toBeCloseTo(0.1);
    expect(v2).toBeCloseTo(0.2);
  });

  test('coord.map() and coord.invert() composes mixed function and matrix transformation', () => {
    const coord = new Coordinate();

    coord.transform('cartesian', 0, 1, 0, 1);
    coord.transform('translate', 10, 20);
    coord.transform('translate', 30, 10);
    coord.transform('translate', 40, 5);
    expect(coord.map([0, 0])).toEqual([80, 35]);
    expect(coord.invert([80, 35])).toEqual([0, 0]);
  });

  test('coord.map() and coord.invert() ignores unknown transformation', () => {
    const coord = new Coordinate({
      // @ts-ignore
      transformations: [['unknown', 10, 10]],
    });

    expect(coord.map([1, 2])).toEqual([1, 2]);
    expect(coord.map([3, 4])).toEqual([3, 4]);
    expect(coord.invert([1, 2])).toEqual([1, 2]);
    expect(coord.invert([3, 4])).toEqual([3, 4]);
  });

  test('coord.clone() returns same but independent coordinate', () => {
    const coord1 = new Coordinate();
    const coord2 = coord1.clone();
    expect(coord2).toBeInstanceOf(Coordinate);
    expect(coord1.getOptions()).toEqual(coord2.getOptions());
    expect(coord1.getOptions()).not.toBe(coord2.getOptions());
  });

  test('coord.clear() clears transforms', () => {
    const coord = new Coordinate({
      transformations: [['translate', 10, 10]],
    });

    coord.clear();
    expect(coord.getOptions().transformations).toEqual([]);
  });
});
