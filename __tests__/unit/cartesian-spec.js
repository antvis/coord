const expect = require('chai').expect;
import { isNumberEqual } from '@antv/util';
const Cartesian = require('../../src/coord/cartesian');
describe('Cartesian', function() {
  const coord = new Cartesian.default({
    start: {
      x: 0,
      y: 300,
    },
    end: {
      x: 200,
      y: 0,
    },
  });

  it('construction', function() {
    const center = coord.center;
    expect(center.x).to.equal(100);
    expect(center.y).to.equal(150);
  });

  it('convert', function() {
    let point = {
      x: 0.2,
      y: 0.7,
    };
    let point2 = {
      x: 0.7,
      y: 0.2,
    };
    point = coord.convert(point);

    expect(point.x).to.equal(40);
    expect(point.y).to.equal(90);
    coord.transpose();
    point2 = coord.convert(point2);
    coord.transpose();
    expect(point2.x).to.equal(40);
    expect(point2.y).to.equal(90);

  });

  it('invert', function() {
    let point = {
      x: 40,
      y: 90,
    };
    let point2 = {
      x: 40,
      y: 90,
    };
    point = coord.invert(point);
    expect(point.x).to.equal(0.2);
    expect(point.y).to.equal(0.7);
    coord.transpose();
    point2 = coord.invert(point2);
    coord.transpose();
    expect(point2.x).to.equal(0.7);
    expect(point2.y).to.equal(0.2);
  });

  it('getWidth and getHeight', function() {
    const width = coord.getWidth();
    const height = coord.getHeight();

    expect(width).to.equal(200);
    expect(height).to.equal(300);
  });

  it('translate', function() {
    let point = {
      x: 0.2,
      y: 0.7,
    };
    coord.translate(100, 20);
    point = coord.convert(point);
    expect(point.x).to.equal(140);
    expect(point.y).to.equal(110);
    coord.translate(-100, -20);
  });

  it('rotate', function() {
    let point = {
      x: 0.5,
      y: 0.7,
    };
    coord.rotate(Math.PI / 2);
    point = coord.convert(point);
    expect(point.x).to.equal(160);
    expect(point.y).to.equal(150);
    coord.rotate(-Math.PI / 2);
  });

  it('scale', function() {
    let point = {
      x: 0.5,
      y: 0.7,
    };
    coord.scale(2, 2);
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(30);
    coord.scale(0.5, 0.5);
  });

  it('reflect x', function() {
    let point = {
      x: 0.5,
      y: 0.7,
    };
    coord.reflect('x');
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(90);
    coord.reflect('x');
  });

  it('reflect y', function() {
    let point = {
      x: 0.3,
      y: 0.5,
    };
    coord.reflect('y');
    point = coord.convert(point);
    expect(point.x).to.equal(60);
    expect(point.y).to.equal(150);
    coord.reflect('y');
  });

  it('trans', function() {
    coord.rotate(Math.PI / 2);
    const vector = coord.applyMatrix(1, 0);
    expect(isNumberEqual(vector[0], 0)).to.be.true;
    expect(isNumberEqual(vector[1], 1)).to.be.true;
  });

  it('reverse', function() {
    const vector = coord.invertMatrix(0, 1);
    expect(isNumberEqual(vector[0], 1)).to.be.true;
    expect(isNumberEqual(vector[1], 0)).to.be.true;
  });
});
