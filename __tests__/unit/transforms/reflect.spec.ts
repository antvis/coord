import { Coordinate } from '../../../src';

describe('Reflect', () => {
  test('reflect() applies translate transformation for vector2', () => {
    const coord = new Coordinate();
    coord.transform('reflect', -1, -1);

    expect(coord.map([0.1, 0.2])).toEqual([-0.1, -0.2]);
    expect(coord.invert([-0.1, -0.2])).toEqual([0.1, 0.2]);
  });
});
