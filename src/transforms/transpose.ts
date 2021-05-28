/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateTransformer, Vector2, Transform } from '../type';

/**
 * Exchange dimensions of the vector.
 * @param params [tx, ty]
 * @param x x of the the bounding box of coordinate
 * @param y y of the the bounding box of coordinate
 * @param width width of the the bounding box of coordinate
 * @param height height of the the bounding box of coordinate
 * @returns transformer
 */
export const transpose: CreateTransformer = (params, x, y, width, height) => {
  const swap: Transform = (vector: Vector2) => {
    const [v1, v2] = vector;
    return [v2, v1];
  };
  return {
    transform: swap,
    untransform: swap,
  };
};
