import Polar from '../../src/coord/polar';

describe('Polar', function () {
  const coord = new Polar({
    start: {
      x: 0,
      y: 300,
    },
    end: {
      x: 200,
      y: 0,
    },
  });
  const coord2 = new Polar({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 300,
      y: 0,
    },
    radius: 0.5,
  });
  const coord3 = new Polar({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 300,
      y: 0,
    },
    radius: 1.5,
  });
  const coord4 = new Polar({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 300,
      y: 0,
    },
    radius: -1.5,
  });
  const coord5 = new Polar({
    start: {
      x: 0,
      y: 200,
    },
    end: {
      x: 300,
      y: 0,
    },
    startAngle: Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
    radius: -1.5,
  });

  test('construction', function () {
    const center = coord.getCenter();
    const center2 = coord2.getCenter();
    const center3 = coord2.getCenter();
    expect(center.x).toBe(100);
    expect(center.y).toBe(150);
    // 不应该更改用户传入的属性值
    expect(coord.radius).toBe(undefined);
    expect(coord.getRadius()).toBe(100);
    expect(center2.x).toBe(150);
    expect(center2.y).toBe(100);
    expect(coord2.getRadius()).toBe(50);
    expect(coord2.radius).toBe(0.5);

    expect(center3.x).toBe(150);
    expect(center3.y).toBe(100);

    expect(coord3.radius).toBe(1.5);
    expect(coord3.getRadius()).toBe(1.5);
    expect(coord4.radius).toBe(-1.5);
    expect(coord4.getRadius()).toBe(100);
    expect(coord5.radius).toBe(-1.5);
    expect(coord5.getRadius()).toBe(100);
  });

  test('convert', function () {
    let point = {
      x: 0,
      y: 1,
    };
    point = coord.convert(point);
    expect(point.x).toBe(100);
    expect(point.y).toBe(50);
    point = {
      x: 0.25,
      y: 1,
    };
    point = coord.convert(point);
    expect(point.x).toBe(200);
    expect(point.y).toBe(150);

    point = {
      x: 0.5,
      y: 0.5,
    };
    point = coord.convert(point);
    expect(point.x).toBe(100);
    expect(point.y).toBe(200);
  });

  test('invert', function () {
    let point = {
      x: 100,
      y: 200,
    };
    point = coord.invert(point);
    expect(point.x).toBe(0.5);
    expect(point.y).toBe(0.5);
  });

  test('getWidth and getHeight', function () {
    expect(coord.getWidth()).toBe(200);
    expect(coord.getHeight()).toBe(300);
  });

  test('translate', function () {
    let point = {
      x: 0.25,
      y: 1,
    };
    coord.translate(100, 20);
    point = coord.convert(point);
    expect(point.x).toBe(300);
    expect(point.y).toBe(170);
    coord.translate(-100, -20);
  });

  test('rotate', function () {
    let point = {
      x: 0.5,
      y: 0.5,
    };
    coord.rotate(Math.PI / 2);
    point = coord.convert(point);
    expect(point.x).toBe(50);
    expect(point.y).toBe(150);
    coord.rotate(-Math.PI / 2);
  });

  test('scale', function () {
    let point = {
      x: 0.5,
      y: 0.5,
    };
    coord.scale(2, 2);
    point = coord.convert(point);
    expect(point.x).toBe(100);
    expect(point.y).toBe(250);
    coord.scale(0.5, 0.5);
  });

  test('reflect x', function () {
    let point = {
      x: 0.25,
      y: 0.5,
    };
    coord.reflect('x');
    point = coord.convert(point);
    expect(point.x).toBe(50);
    expect(point.y).toBe(150);
    coord.reflect('x');
  });

  test('reflect y', function () {
    let point = {
      x: 0.75,
      y: 0.5,
    };
    coord.reflect('y');
    point = coord.convert(point);
    expect(point.x).toBe(50);
    expect(point.y).toBe(150);
    coord.reflect('y');
  });

  test('endAngle < startAngle', () => {
    const c = new Polar({
      start: { x: 80, y: 355 },
      end: { x: 480, y: 20 },
      startAngle: (1 / 2) * Math.PI,
      endAngle: (-1 / 2) * Math.PI,
    });
    expect(c.startAngle).toBe((1 / 2) * Math.PI);
    expect(c.endAngle).toBe((3 / 2) * Math.PI);
  });
});
