import { Coordinate } from '../../../src';

describe('Transpose', () => {
  test('transpose exchanges dimensions', () => {
    const coord = new Coordinate();
    coord.transform('transpose');
    expect(coord.map([0, 1])).toEqual([1, 0]);
    expect(coord.map([0.2, 0.8])).toEqual([0.8, 0.2]);
    expect(coord.invert([1, 0])).toEqual([0, 1]);
    expect(coord.map([0.8, 0.2])).toEqual([0.2, 0.8]);
  });
});
