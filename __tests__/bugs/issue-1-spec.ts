import { Coordinate, getCoordinate, registerCoordinate } from '../../src';

describe('#1', () => {
  test('description', () => {
    expect(getCoordinate).toBeDefined();
    expect(registerCoordinate).toBeDefined();
    expect(Coordinate).toBeDefined();
  });
});
