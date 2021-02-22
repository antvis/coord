import { isNumberEqual } from '@antv/util';
import Cartesian from '../../src/coord/cartesian';

describe('Cartesian', function () {
  const coord = new Cartesian({
    start: {
      x: 0,
      y: 300,
    },
    end: {
      x: 200,
      y: 0,
    },
  });

  test('construction', function () {
    expect(coord.getCenter()).toEqual({ x: 100, y: 150 });
  });

  test('convert', function () {
    let point = {
      x: 0.2,
      y: 0.7,
    };
    let point2 = {
      x: 0.7,
      y: 0.2,
    };
    point = coord.convert(point);

    expect(point).toEqual({ x: 40, y: 90 });

    coord.transpose();
    point2 = coord.convert(point2);
    coord.transpose();

    expect(point2).toEqual({ x: 40, y: 90 });
  });

  test('invert', function () {
    let point = {
      x: 40,
      y: 90,
    };
    let point2 = {
      x: 40,
      y: 90,
    };
    point = coord.invert(point);
    expect(point).toEqual({ x: 0.2, y: 0.7 });

    coord.transpose();
    point2 = coord.invert(point2);
    coord.transpose();
    expect(point2).toEqual({ x: 0.7, y: 0.2 });
  });

  test('getWidth and getHeight', function () {
    expect(coord.getWidth()).toEqual(200);
    expect(coord.getHeight()).toEqual(300);
  });

  test('translate', function () {
    const point = {
      x: 0.2,
      y: 0.7,
    };

    coord.translate(100, 20);

    expect(coord.convert(point)).toEqual({ x: 140, y: 110 });
    coord.translate(-100, -20);

    // reset matrix, and redo action
    coord.resetMatrix();
    coord.translate(100, 20);
    expect(coord.convert(point)).toEqual({ x: 140, y: 110 });
    coord.translate(-100, -20);
  });

  test('rotate', function () {
    const matrix = [...coord.matrix];
    const point = {
      x: 0.5,
      y: 0.7,
    };
    coord.rotate(Math.PI / 2);
    expect(coord.convert(point)).toEqual({ x: 160, y: 150 });
    coord.rotate(-Math.PI / 2);

    // @ts-ignore reset matrix, and redo action
    coord.resetMatrix(matrix);
    coord.rotate(Math.PI / 2);
    expect(coord.convert(point)).toEqual({ x: 160, y: 150 });
    coord.rotate(-Math.PI / 2);
  });

  test('scale', function () {
    const point = {
      x: 0.5,
      y: 0.7,
    };
    coord.scale(2, 2);
    expect(coord.convert(point)).toEqual({ x: 100, y: 30 });
    coord.scale(0.5, 0.5);

    // reset matrix, and redo action
    coord.resetMatrix(coord.matrix);
    coord.scale(2, 2);
    expect(coord.convert(point)).toEqual({ x: 100, y: 30 });
    coord.scale(0.5, 0.5);
  });

  test('reflect x', function () {
    let point = {
      x: 0.5,
      y: 0.7,
    };
    coord.reflect('x');
    point = coord.convert(point);
    expect(point).toEqual({ x: 100, y: 90 });
    expect(coord.isReflect('x')).toBe(true);
    coord.reflect('x');
    expect(coord.isReflect('x')).toBe(false);
  });

  test('reflect y', function () {
    let point = {
      x: 0.3,
      y: 0.5,
    };
    coord.reflect('y');
    point = coord.convert(point);
    expect(coord.isReflect('y')).toBe(true);
    expect(point).toEqual({ x: 60, y: 150 });
    coord.reflect('y');
    expect(coord.isReflect('y')).toBe(false);
  });

  test('trans', function () {
    coord.rotate(Math.PI / 2);
    const vector = coord.applyMatrix(1, 0);
    expect(isNumberEqual(vector[0], 0)).toBe(true);
    expect(isNumberEqual(vector[1], 1)).toBe(true);
  });

  test('reverse', function () {
    const vector = coord.invertMatrix(0, 1);
    expect(isNumberEqual(vector[0], 1)).toBe(true);
    expect(isNumberEqual(vector[1], 0)).toBe(true);

    coord.matrix = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
    expect(coord.invertMatrix(0, 1)).toEqual([0, 1, 0]);
  });

  test('update', function () {
    expect(coord.getCenter()).toEqual({ x: 100, y: 150 });

    coord.update({
      start: { x: 0, y: 200 },
      end: { x: 200, y: 0 },
    });
    expect(coord.getCenter()).toEqual({ x: 100, y: 100 });
  });
});
