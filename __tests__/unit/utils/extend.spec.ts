import { extend } from '../../../src/utils';
import { Transform } from '../../../src/type';

describe('extend', () => {
  test('Extends transformations to accept high dimension vector', () => {
    const add: Transform = ([x, y]) => [x + y, 0];
    const extendedAdd = extend(add);
    expect(extendedAdd([1, 2, 3, 4])).toEqual([3, 0, 7, 0]);
  });

  test('Extends transformations ignores extra value', () => {
    const add: Transform = ([x, y]) => [x + y, 0];
    const extendedAdd = extend(add);
    expect(extendedAdd([1, 2, 3, 4, 5])).toEqual([3, 0, 7, 0]);
  });
});
