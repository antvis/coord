import { adjustAngle } from '../../../src/utils';

describe('adjustAngle', () => {
  test('adjustAngle(angle, min, max) adjusts angle smaller than min', () => {
    expect(adjustAngle(-Math.PI, 0, Math.PI * 2)).toBe(Math.PI);
  });

  test('adjustAngle(angle, min, max) adjusts angle bigger than max', () => {
    expect(adjustAngle(Math.PI * 3, 0, Math.PI * 2)).toBe(Math.PI);
  });
});
