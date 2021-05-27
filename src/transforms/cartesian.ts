import { Linear } from '@antv/scale';
import { Vector2, CreateTransformer } from '../type';

/**
 * Maps normalized value to the bounding box of coordinate.
 * @param params [x0, x1, y0, y1]
 * @param x x of the the bounding box of coordinate
 * @param y y of the the bounding box of coordinate
 * @param width width of the the bounding box of coordinate
 * @param height height of the the bounding box of coordinate
 * @returns transformer
 */
export const cartesian: CreateTransformer = (params, x, y, width, height) => {
  const [x0, x1, y0, y1] = params as number[];
  const sx = new Linear({
    range: [x + width * x0, x + width * x1],
  });
  const sy = new Linear({
    range: [y + height * y0, y + height * y1],
  });
  return {
    transform(vector: Vector2) {
      const [v1, v2] = vector;
      return [sx.map(v1), sy.map(v2)];
    },
    untransform(vector: Vector2) {
      const [v1, v2] = vector;
      return [sx.invert(v1), sy.invert(v2)];
    },
  };
};
