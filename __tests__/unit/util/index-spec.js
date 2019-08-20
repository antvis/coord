import * as util from '../../../src/util/index';
import { expect } from 'chai';
describe('util', () => {
  it('#trunc', () => {
    expect(util.trunc(1.1)).to.be.eql(1);
    expect(util.trunc(-1.6)).to.be.eql(-1);
  });
  it('#formatNum', () => {
    expect(util.formatNum(1.123456, 5)).to.be.eql(1.12346);
    expect(util.formatNum(1.123456)).to.be.eql(1.123456);
  });
  it('#wrapNum', () => {
    expect(util.wrapNum(6, [ 0, 5 ])).to.be.eql(1);
    expect(util.wrapNum(5, [ 0, 5 ]), false).to.be.eql(0);
  });
});
