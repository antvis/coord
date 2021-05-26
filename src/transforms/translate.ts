import { mat3 } from '@antv/matrix-util';
import { CreateTransformer } from '../type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const translate: CreateTransformer = (params, x, y, width, height) => {
  const [tx, ty] = params;
  const matrix = mat3.create();
  return mat3.fromTranslation(matrix, [tx, ty]);
};
