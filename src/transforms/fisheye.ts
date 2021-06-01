/* eslint-disable @typescript-eslint/no-unused-vars */
// https://github.com/d3/d3-plugins/blob/master/fisheye/fisheye.js
import { CreateTransformer, Vector2 } from '../type';

function fisheyeTransform(x: number, focus: number, distortion: number, min: number, max: number) {
  const left = x < focus;
  const m = (left ? focus - min : max - focus) || max - min;
  const f = left ? -1 : 1;
  return (f * m * (distortion + 1)) / (distortion + m / ((x - focus) * f)) + focus;
}

function fisheyeUntransform(tx: number, focus: number, distortion: number, min: number, max: number) {
  const left = tx < focus;
  const m = (left ? focus - min : max - focus) || max - min;
  const f = left ? -1 : 1;
  return m / ((m * (distortion + 1)) / (tx - focus) - distortion * f) + focus;
}

/**
 * Applies cartesian fisheye transforms for the first dimension of vector2.
 * @param params [focus, distortion]
 * @param x x of the the bounding box of coordinate
 * @param y y of the the bounding box of coordinate
 * @param width width of the the bounding box of coordinate
 * @param height height of the the bounding box of coordinate
 * @returns transformer
 */
export const fisheyeX: CreateTransformer = (params, x, y, width, height) => {
  const [focus, distortion] = params as number[];
  return {
    transform(vector: Vector2) {
      const [vx, vy] = vector;
      const fx = fisheyeTransform(vx, focus, distortion, x, x + width);
      return [fx, vy];
    },
    untransform(vector: Vector2) {
      const [fx, vy] = vector;
      const vx = fisheyeUntransform(fx, focus, distortion, x, x + width);
      return [vx, vy];
    },
  };
};

/**
 * Applies cartesian fisheye transforms for the second dimension of vector2.
 * @param params [focus, distortion]
 * @param x x of the the bounding box of coordinate
 * @param y y of the the bounding box of coordinate
 * @param width width of the the bounding box of coordinate
 * @param height height of the the bounding box of coordinate
 * @returns transformer
 */
export const fisheyeY: CreateTransformer = (params, x, y, width, height) => {
  const [focus, distortion] = params as number[];
  return {
    transform(vector: Vector2) {
      const [vx, vy] = vector;
      const fy = fisheyeTransform(vy, focus, distortion, y, y + height);
      return [vx, fy];
    },
    untransform(vector: Vector2) {
      const [vx, fy] = vector;
      const vy = fisheyeUntransform(fy, focus, distortion, y, y + height);
      return [vx, vy];
    },
  };
};

/**
 * Applies cartesian fisheye transforms for both dimensions of vector2.
 * @param params [focusX, focusY, distortionX, distortionY]
 * @param x x of the the bounding box of coordinate
 * @param y y of the the bounding box of coordinate
 * @param width width of the the bounding box of coordinate
 * @param height height of the the bounding box of coordinate
 * @returns transformer
 */
export const fisheye: CreateTransformer = (params, x, y, width, height) => {
  const [focusX, focusY, distortionX, distortionY] = params as number[];
  return {
    transform(vector: Vector2) {
      const [vx, vy] = vector;
      const fx = fisheyeTransform(vx, focusX, distortionX, x, x + width);
      const fy = fisheyeTransform(vy, focusY, distortionY, y, y + height);
      return [fx, fy];
    },
    untransform(vector: Vector2) {
      const [fx, fy] = vector;
      const vx = fisheyeUntransform(fx, focusX, distortionX, x, x + width);
      const vy = fisheyeUntransform(fy, focusY, distortionY, y, y + height);
      return [vx, vy];
    },
  };
};

/**
 * Applies circular fisheye transforms.
 * @param params [focusX, focusY, radius, distortion]
 * @param x x of the the bounding box of coordinate
 * @param y y of the the bounding box of coordinate
 * @param width width of the the bounding box of coordinate
 * @param height height of the the bounding box of coordinate
 * @returns transformer
 */
export const fisheyeCircular: CreateTransformer = (params, x, y, width, height) => {
  const [focusX, focusY, radius, distortion] = params as number[];
  return {
    transform(vector: Vector2) {
      const [x, y] = vector;
      const dx = x - focusX;
      const dy = y - focusY;
      const dd = Math.sqrt(dx * dx + dy * dy);
      if (dd > radius) return [x, y];
      const r = fisheyeTransform(dd, 0, distortion, 0, radius);
      const theta = Math.atan2(dy, dx);
      return [focusX + r * Math.cos(theta), focusY + r * Math.sin(theta)];
    },
    untransform(vector: Vector2) {
      const [tx, ty] = vector;
      const dx = tx - focusX;
      const dy = ty - focusY;
      const dd = Math.sqrt(dx * dx + dy * dy);
      if (dd > radius) return [tx, ty];
      const x = fisheyeUntransform(dd, 0, distortion, 0, radius);
      const theta = Math.atan2(dy, dx);
      return [focusX + x * Math.cos(theta), focusY + x * Math.sin(theta)];
    },
  };
};
