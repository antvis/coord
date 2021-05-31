import { Coordinate } from '../../../src';

describe('Custom', () => {
  test('custom() can custom transform and untransform', () => {
    const coord = new Coordinate();

    coord.transform('custom', (x, y, width, height) => {
      expect(x).toBe(0);
      expect(y).toBe(0);
      expect(width).toBe(300);
      expect(height).toBe(150);
      return {
        transform(vector) {
          const [v1, v2] = vector;
          return [x + width * v1, y + height * v2];
        },
        untransform(vector) {
          const [v1, v2] = vector;
          return [(v1 - x) / width, (v2 - y) / height];
        },
      };
    });

    expect(coord.map([0.5, 0.5])).toEqual([150, 75]);
    expect(coord.invert([150, 75])).toEqual([0.5, 0.5]);
  });

  test('custom() can only custom transform and set untransform to identity', () => {
    const coord = new Coordinate();

    coord.transform('custom', (x, y, width, height) => {
      return {
        transform(vector) {
          const [v1, v2] = vector;
          return [x + width * v1, y + height * v2];
        },
      };
    });

    expect(coord.map([0.5, 0.5])).toEqual([150, 75]);
    expect(coord.invert([150, 75])).toEqual([150, 75]);
  });

  test('custom() can only custom untransform and set transform to identity', () => {
    const coord = new Coordinate();

    coord.transform('custom', (x, y, width, height) => {
      return {
        untransform(vector) {
          const [v1, v2] = vector;
          return [(v1 - x) / width, (v2 - y) / height];
        },
      };
    });

    expect(coord.map([0.5, 0.5])).toEqual([0.5, 0.5]);
    expect(coord.invert([150, 75])).toEqual([0.5, 0.5]);
  });
});
