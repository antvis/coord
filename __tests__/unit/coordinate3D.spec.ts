import { Coordinate3D, Options, Transformation } from '../../src';
import { Vector3 } from '../../src/type';

describe('Coordinate', () => {
  test('coord.getOptions() returns the reference for options', () => {
    const coord = new Coordinate3D();
    // @ts-ignore
    expect(coord.getOptions()).toBe(coord.options);
  });

  test('cartesian3D() maps normalized value to entire bounding areas', () => {
    const coord = new Coordinate3D({
      transformations: [['cartesian3D']],
      depth: 100,
    });
    const v1: Vector3 = [0, 0, 0];
    const v2: Vector3 = [0, 0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1, 1])).toEqual([300, 150, 100]);
    expect(coord.invert(v1)).toEqual(v2);
    expect(coord.invert([300, 150, 100])).toEqual([1, 1, 1]);
  });

  test('cartesian3D() should use default depth & z if not provided', () => {
    const coord = new Coordinate3D({
      transformations: [['cartesian3D']],
    });
    const v1: Vector3 = [0, 0, 0];
    const v2: Vector3 = [0, 0, 0];

    expect(coord.map(v1)).toEqual(v2);
    expect(coord.map([1, 1, 1])).toEqual([300, 150, 150]);
  });

  test('coord.getSize() returns current size of the bounding box in 3D', () => {
    const coord = new Coordinate3D({
      width: 100,
      height: 50,
      depth: 100,
      transformations: [['cartesian3D']],
    });

    expect(coord.getSize()).toEqual([100, 50, 100]);
    expect(coord.getCenter()).toEqual([50, 25, 50]);
    expect(coord.getOptions()).toEqual({
      x: 0,
      y: 0,
      z: 0,
      width: 100,
      height: 50,
      depth: 100,
      transformations: [['cartesian3D']],
    });
    expect(coord.map([0, 0, 0])).toEqual([0, 0, 0]);
    expect(coord.invert([0, 0, 0])).toEqual([0, 0, 0]);
  });

  test('coord.clone() returns same but independent coordinate', () => {
    const coord1 = new Coordinate3D();
    const coord2 = coord1.clone();
    expect(coord2).toBeInstanceOf(Coordinate3D);
    expect(coord1.getOptions()).toEqual(coord2.getOptions());
    expect(coord1.getOptions()).not.toBe(coord2.getOptions());
  });

  test('coord.clear() clears transforms', () => {
    const coord = new Coordinate3D({
      transformations: [['translate3D', 10, 10, 10]],
    });

    coord.clear();
    expect(coord.getOptions().transformations).toEqual([]);
  });
});
