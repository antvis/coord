import { getCoordinate } from '../../src/';

describe('coordinate', () => {
  test('coordinate', () => {
    expect(getCoordinate('rect')).toBeInstanceOf(Function);
    expect(getCoordinate('cartesian')).toBeInstanceOf(Function);
    expect(getCoordinate('polar')).toBeInstanceOf(Function);
    expect(getCoordinate('helix')).toBeInstanceOf(Function);
  });
});
