const expect = require('chai').expect;
const coord = require('../../src/index');

describe('sample', () => {
  it('coord', () => {
    expect('coord').to.be.a('string');
    expect(coord).to.be.an('object');
  });
});
