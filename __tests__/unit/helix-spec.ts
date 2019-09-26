import Helix from '../../src/coord/helix';

describe('Helix', function() {
  const coord = new Helix({
    start: {
      x: 0,
      y: 300,
    },
    end: {
      x: 200,
      y: 0,
    },
  });

  test('constructor', function() {
    const center = coord.getCenter();

    expect(center.x).toBe(100);
    expect(center.y).toBe(150);
    expect(coord.type).toBe('helix');
    expect(coord.innerRadius).toBe(0);
    expect(coord.startAngle).toBe(1.25 * Math.PI);
    expect(coord.endAngle).toBe(7.25 * Math.PI);
  });

  test('convert & invert', function() {
    let point2 = {
      x: 0,
      y: 0,
    };
    point2 = coord.convert(point2);
    point2 = coord.invert(point2);

    expect(point2.x).toBe(0);
    expect(point2.y).toBe(0);

    point2 = {
      x: 0.7,
      y: 0.7,
    };
    point2 = coord.convert(point2);
    point2 = coord.invert(point2);

    expect(point2.x).toBe(0.7);
  });
});
