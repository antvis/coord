const expect = require('chai').expect;
const coord = require('../../src/index');

describe('#1', () => {
  it('description', () => {
    expect('coord').to.be.a('string');
    expect(coord).to.be.an('object');
  });
});
