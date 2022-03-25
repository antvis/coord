import { Coordinate, Vector } from '../../../src';

describe('Parallel', () => {
  test('parallel() transforms high dimension vector to a list of vector2', () => {
    const coord = new Coordinate();
    coord.transform('parallel', 0, 1, 0, 1);

    const from: Vector = [0.5, 0.3, 0.2, 0.4, 0.1];
    const to: Vector = [0, 0.5, 0.25, 0.3, 0.5, 0.2, 0.75, 0.4, 1, 0.1];
    expect(coord.map(from)).toEqual(to);
    expect(coord.invert(to)).toEqual(from);
  });

  test('parallel() can applied before cartesian() and translate() ', () => {
    const coord = new Coordinate();
    coord.transform('parallel', 0, 1, 0, 1);
    coord.transform('cartesian');
    coord.transform('translate', 10, 5);

    expect(coord.map([0.5, 0.3, 0.2, 0.4, 0.1])).toEqual([10, 80, 85, 50, 160, 35, 235, 65, 310, 20]);
    expect(coord.invert([10, 80, 85, 50, 160, 35, 235, 65, 310, 20])).toEqual([0.5, 0.3, 0.2, 0.4, 0.1]);
  });
});
