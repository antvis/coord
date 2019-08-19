import { expect } from 'chai';
import { getCoord } from '../../src/index';
describe('coord index', () => {
  it('coord', () => {
    expect(getCoord('coord')).to.be.an('function');
    expect(getCoord('rect')).to.be.an('function');
    expect(getCoord('cartesian')).to.be.an('function');
    expect(getCoord('polar')).to.be.an('function');
    expect(getCoord('helix')).to.be.an('function');
  });
});
