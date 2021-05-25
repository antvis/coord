import { Coordinate, Options } from '../../src';

describe('Coordinate', () => {
  test('coord.getOptions() returns the reference for options', () => {
    const coord = new Coordinate();
    // @ts-ignore
    expect(coord.getOptions()).toBe(coord.options);
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
  });

  test('new Coordinate(options) override defaults', () => {
    const options: Options = {
      x: 10,
      y: 20,
      width: 200,
      height: 100,
      transformations: [['scale', 10, 10]],
    };
    const coord = new Coordinate(options);

    // @ts-ignore
    expect(coord.options).toEqual(options);
    // @ts-ignore
    expect(coord.options).not.toBe(options);
  });

  test('coord.update() updates options', () => {
    const coord = new Coordinate();
    coord.update({
      x: 10,
    });
    expect(coord.getOptions().x).toBe(10);
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
      transformations: [['scale', 10, 10]],
    });

    coord.clear();
    expect(coord.getOptions().transformations).toEqual([]);
  });
});
