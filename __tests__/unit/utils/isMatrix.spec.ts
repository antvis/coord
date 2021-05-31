import { isMatrix } from '../../../src/utils';

describe('isMatrix', () => {
  test('Only Array and Float32Array is matrix', () => {
    expect(isMatrix([0, 1])).toBeTruthy();
    expect(isMatrix(new Float32Array([0, 1]))).toBeTruthy();
    expect(isMatrix(new Float64Array([0, 1]))).toBeFalsy();
    expect(isMatrix({ a: 1, b: 1 })).toBeFalsy();
    expect(isMatrix(0)).toBeFalsy();
    expect(isMatrix('1')).toBeFalsy();
  });
});
