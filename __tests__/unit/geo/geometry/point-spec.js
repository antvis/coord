import { expect } from 'chai';
import { Point, toPoint } from '../../../../src/coord/geo/geometry/point';
describe('Geo Point', () => {
  it('constructor', () => {
    let p = new Point(1.5, 2.5);
    expect(p.x).to.eql(1.5);
    expect(p.y).to.eql(2.5);
    p = new Point(1.3, 2.7, true);
    expect(p.x).to.eql(1);
    expect(p.y).to.eql(3);

  });
  it('# add', () => {
    expect(new Point(50, 30).add(new Point(20, 10))).to.eql(new Point(70, 40));
  });
  it('#subtract', () => {
    const a = new Point(50, 30),
      b = new Point(20, 10);
    expect(a.subtract(b)).to.eql(new Point(30, 20));
  });
  it('#divideBy', () => {
    expect(new Point(50, 30).divideBy(5)).to.eql(new Point(10, 6));
  });
  it('#multiplyBy', () => {
    expect(new Point(50, 30).multiplyBy(2)).to.eql(new Point(100, 60));
  });
  it('#scaleBy', () => {
    const a = new Point(10, 30);
    const b = new Point(2, 3);
    const c = new Point(20, 90);
    expect(a.scaleBy(b)).to.eql(c);

  });
  it('#unscaleBy', () => {
    const a = new Point(10, 20);
    const b = new Point(2, 3);
    const c = new Point(20, 60);
    expect(c.unscaleBy(b)).to.eql(a);

  });
  it('#round', () => {
    const a = new Point(10.3, 30.6);
    const b = new Point(10, 31);
    expect(a.round()).to.eql(b);
  });
  it('#floor', () => {
    const a = new Point(10.3, 30.6);
    const b = new Point(10, 30);
    expect(a.floor()).to.eql(b);
  });
  it('#ceil', () => {
    const a = new Point(10.3, 30.6);
    const b = new Point(11, 31);
    expect(a.ceil()).to.eql(b);
  });
  it('#trunc', () => {
    expect(new Point(50.56, 30.123).trunc()).to.eql(new Point(50, 30));
    expect(new Point(-50.56, -30.123).trunc()).to.eql(new Point(-50, -30));
  });
  it('#distanceTo', () => {
    const p1 = new Point(0, 30);
    const p2 = new Point(40, 0);
    expect(p1.distanceTo(p2)).to.eql(50.0);
  });
  it('#equals', () => {
    const p1 = new Point(20.4, 50.12);
    const p2 = new Point(20.4, 50.12);
    const p3 = new Point(20.5, 50.13);

    expect(p1.equals(p2)).to.be.true;
    expect(p1.equals(p3)).to.be.false;
  });
  it('#contains', () => {
    const p1 = new Point(50, 30),
      p2 = new Point(-40, 20),
      p3 = new Point(60, -20),
      p4 = new Point(-40, -40);
    expect(p1.contains(p2)).to.be.true;
    expect(p1.contains(p3)).to.be.false;
    expect(p1.contains(p4)).to.be.false;
  });
  it('#toString', () => {
    expect(new Point(50, 30) + '').to.eql('Point(50, 30)');
    expect(new Point(50.1234567, 30.1234567) + '').to.eql('Point(50.123457, 30.123457)');

  });
  it('#toPoint', () => {
    const a = new Point(10, 20);
    expect(a).to.eql(toPoint(10, 20));
    expect(a).to.eql(toPoint([ 10, 20 ]));
    expect(a).to.eql(toPoint(a));
    expect(a).to.eql(toPoint({ x: 10, y: 20 }));
    expect(a).to.not.eql(toPoint());

  });


});
