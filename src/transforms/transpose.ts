/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateTransformer } from '../type';

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
  return new Float32Array([0, 1, 0, 1, 0, 0, 0, 0, 0]);
};
