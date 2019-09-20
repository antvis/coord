import * as util from '../../../src/util/';

describe('util', () => {
  test('#trunc', () => {
    expect(util.trunc(1.1)).toBe(1);
    expect(util.trunc(-1.6)).toBe(-1);
  });
  test('#formatNum', () => {
    expect(util.formatNum(1.123456, 5)).toBe(1.12346);
    expect(util.formatNum(1.123456)).toBe(1.123456);
  });
  test('#wrapNum', () => {
    expect(util.wrapNum(6, [0, 5])).toBe(1);
    expect(util.wrapNum(5, [0, 5], false)).toBe(0);
  });
});
