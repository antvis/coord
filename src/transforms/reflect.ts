import { CreateTransformer } from '../type';
import { scale } from './scale';

/**
 * Apply reflect transformation for current vector.
 * @param args same as scale
 * @returns transformer
 */
export const reflect: CreateTransformer = (...args) => {
  return scale(...args);
};
