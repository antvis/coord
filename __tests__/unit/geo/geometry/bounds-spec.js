import { expect } from 'chai';
import { Bounds, toBounds } from '../../../../src/coord/geo/geometry/bounds';
import { Point } from '../../../../src/coord/geo/geometry/point';
let a,
  b,
  c,
  d;
describe('Geo Bounds', () => {
  beforeEach(() => {
    a = new Bounds([ 100, 20 ], [ 120, 40 ]);
    b = new Bounds([ [ 101, 25 ], [ 115, 30 ] ]);
    c = new Bounds(new Point(100, 20), new Point(120, 40));
    d = new Bounds();
  });
  describe('constructor', function() {
    it('creates bounds with proper min & max on ([],[])', function() {
      expect(a.min).to.eql(new Point(100, 20));
      expect(a.max).to.eql(new Point(120, 40));
    });
    it('creates bounds with proper min & max Array ([[100,20],[120,40]])', function() {
      expect(b.min).to.eql(new Point(101, 25));
      expect(b.max).to.eql(new Point(115, 30));
    });
    it('creates bounds with proper min & max Point (Point,Point)', function() {
      expect(c.min).to.eql(new Point(100, 20));
      expect(c.max).to.eql(new Point(120, 40));
    });
  });
  it('extends the bounds to contain the given point', function() {
    a.extend(new Point(50, 20));
    expect(a.min).to.eql(new Point(50, 20));
    expect(a.max).to.eql(new Point(120, 40));

    b.extend(new Point(30, 60));
    expect(b.min).to.eql(new Point(30, 25));
    expect(b.max).to.eql(new Point(115, 60));
  });
  it('#getCenter', () => {
    const a = new Bounds([ 100, 20 ], [ 120, 40 ]);
    expect(a.getCenter()).to.eql(new Point(110, 30));
  });
  it('#getBottomLeft', () => {
    expect(a.getBottomLeft()).to.eql(new Point(100, 40));
  });

  it('#getTopRight', () => {
    expect(a.getTopRight()).to.eql(new Point(120, 20));
  });
  it('#getBottomRight', () => {
    expect(a.getBottomRight()).to.eql(new Point(120, 40));
  });
  it('#getTopLeft', () => {
    expect(a.getTopLeft()).to.eql(new Point(100, 20));
  });
  it('#getSize', () => {
    expect(a.getSize()).to.eql(new Point(20, 20));
  });
  it('#contains other bounds or point', () => {
    // expect(a.contains(b)).to.be.ok();
    expect(b.contains(a)).to.be.false;
    expect(a.contains(b)).to.be.true;
    expect(a.contains(new Point(110, 25))).to.be.true;
    expect(a.contains(new Point(90, 65))).to.be.false;
  });
  it('#intersect', () => {
    expect(a.intersect(b)).to.be.true;
    expect(b.intersect(a)).to.be.true;
    expect(a.intersect(new Bounds(new Point(120, 40), new Point(121, 44)))).to.be.true;
  });
  it('#overlaps', () => {
    expect(a.overlaps(b)).to.be.true;
    expect(b.overlaps(a)).to.be.true;
    expect(a.overlaps(new Bounds(new Point(120, 40), new Point(122, 20)))).to.be.false;
  });
  it('#isValid', () => {
    expect(a.isValid()).to.be.true;
    expect(d.isValid()).to.be.false;
    d.extend([ 10, 10 ]);
    expect(d.isValid()).to.be.true;
  });

  it('#toBounds', () => {
    expect(a).to.eql(toBounds([ 100, 20 ], [ 120, 40 ]));
    expect(a).to.eql(toBounds([ [ 100, 20 ], [ 120, 40 ] ]));
    expect(a).to.eql(toBounds(new Point(100, 20), new Point(120, 40)));
  });
});
