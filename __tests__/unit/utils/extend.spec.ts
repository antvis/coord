import { extend } from '../../../src/utils';
import { Transform } from '../../../src/type';

describe('extend', () => {
  test('Extends transform to accept high dimension vector', () => {
    const add: Transform = ([x, y]) => [x + y, 0];
    const extendedAdd = extend(add);
    expect(extendedAdd([1, 2, 3, 4])).toEqual([3, 0, 7, 0]);
  });
});
