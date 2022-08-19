# Transformations

There are two methods to specify desired transformations and they are equivalent.

```ts
import { Coord } from '@antv/coord';

// first
const coord1 = new Coord({
  transformations: [['scale', 10, 10]],
});

// second
const coord = new Coord();
coord.transform('scale', 10, 10);
```

**The order of selected transformations is very important, it will result in unexpected output or even some confusing errors if they are ordered incorrectly.**

The following rules must be noticed:

- Affine transformations can be applied before or after cartesian transformation according to different situations.
- Coordinate System transformations must applied before cartesian transformation, because they only accept normalized points but cartesian transformation outputs normal points.
- Fisheye Lens transformations must applied after cartesian transformation, because they accept normal points.

## Affine

<a name="translate" href="#translate">#</a> **transform**<i>('translate', x: number, y: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#translate)

Sends `(x, y)` to `(x + a, y + b)`.

```ts
import { Coordinate, Vector2 } from '@antv/coord';

const v: Vector2 = [0, 0];
const coord0 = new Coordinate();
coord0.transform('translate', 0.1, 0.1);
coord0.transform('cartesian');
coord0.map(v); // [30, 15]

const coord1 = new Coordinate();
coord1.transform('cartesian');
coord1.transform('translate', 10, 20);
coord1.map(v); //[10, 20]
```

<a name="scale" href="#scale">#</a> **transform**<i>('scale', x: number, y: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#scale)

Sends `(x, y)` to `(a * x, b * x)`.

```ts
import { Coordinate } from '@antv/coord';

const coord0 = new Coordinate();
coord0.transform('cartesian');
coord0.transform('scale', 2, 4);
coord.map([0.1, 0.2]); // [60, 120]

const coord1 = new Coordinate();
coord1.transform('scale', 2, 4);
coord1.transform('cartesian');
coord1.map([0.1, 0.2]); //[60, 120]
```

<a name="rotate" href="#rotate">#</a> **transform**<i>('rotate', theta: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#rotate)

Sends `(x, y)` to `(cos(theta)) * x - sin(theta) * y, sin(theta) * x - cos(theta) * y)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('rotate', Math.PI / 3);
coord.transform('cartesian');
coord.map([0.8, 0]); // [120, 103.9230465888977]
```

<a name="reflect" href="#reflect">#</a> **transform**<i>('reflect') : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#reflect)

Sends `(x, y)` to `(-x, -y)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('reflect');
coord.map([0.3, 0.6]); // [-0.3, -0.6]
```

<a name="reflect.x" href="#reflect.x">#</a> **transform**<i>('reflect.x') : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#reflectX)

Sends `(x, y)` to `(-x, y)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('reflect.x');
coord.map([0.3, 0.6]); // [-0.3, 0.6]
```

<a name="reflect.y" href="#reflect.y">#</a> **transform**<i>('reflect.y') : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#reflectY)

Sends `(x, y)` to `(x, -y)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('reflect.y');
coord.map([0.3, 0.6]); // [0.3, -0.6]
```

<a name="shear.x" href="#shear.x">#</a> **transform**<i>('shear.x', theta: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#shearX)

Sends `(x, y)` to `(cot(theta) * y + x, y)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('shear.x', Math.PI / 4);
coord.map([0, 0.4]); // [0.4, 0.4]
```

<a name="shear.y" href="#shear.y">#</a> **transform**<i>('shear.y', theta: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#shearY)

Sends `(x, y)` to `(x, cot(theta) * x + y)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('shear.y', Math.PI / 4);
coord.map([0.4, 0]); // [0.4, 0.4]
```

<a name="transpose" href="#transpose">#</a> **transform**<i>('transpose') : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#transpose)

Sends `(x, y)` to `(y, x)`.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('transpose');
coord.map([0.3, 0.6]); // [0.6, 0.3]
```

## Coordinate System

<a name="cartesian" href="#cartesian">#</a> **transform**<i>('cartesian') : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#cartesian)

Transforms points in normalized cartesian system to the bounding box of the coordinate.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('cartesian');
coord.map([0.5, 0.5]); // [150, 75]
coord.map([1, 1]); // [300, 150]
```

<a name="polar" href="#polar">#</a> **transform**<i>('polar', startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#polar)

Transforms points in normalized polar system to normalized cartesian system.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate({
  width: 200,
  height: 300,
  transformations: [['polar', -Math.PI / 2, (Math.PI * 3) / 2, 0, 1], ['cartesian']],
});

coord.map([0, 1]); // [100, 50]
```

<a name="helix" href="#helix">#</a> **transform**<i>('helix', startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#helix)

Transforms points in normalized helix system to normalized cartesian system.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate({
  width: 300,
  height: 300,
  transformations: [['helix', 0, Math.PI * 6, 0, 1], ['cartesian']],
});

coord.map([0, 1]); // [187.5, 150]
```

<a name="parallel" href="#parallel">#</a> **transform**<i>('parallel', x0: number, x1: number, y0: number, y1: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#parallel)

Transforms points in normalized parallel system to normalized cartesian system.

```ts
import { Coordinate, Vector } from '@antv/coord';

const coord = new Coordinate();
coord.transform('parallel', 0, 1, 0, 1);
coord.transform('cartesian');
coord.transform('translate', 10, 5);

const from: Vector = [0.5, 0.3, 0.2, 0.4];
coord.map(from); // [10, 80, 85, 50, 160, 35, 235, 65]
```

## Fisheye Lens

<a name="fisheye" href="#fisheye">#</a> **transform**<i>('fisheye', focusX: number, focusY: number, distortionX: number, distortionY: number, isVisual?: boolean) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#cartesianFisheye)

Applies cartesian fisheye effects for both dimensions of input vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
// The first way to declare.
coord.transform('fisheye', 0.5, 0.5, 2, 2); // Abstract value by default.
coord.transform('cartesian');

// The second way to declare.
coord.transform('fisheye', 300, 150, 2, 2, true); // visual value.
coord.transform('cartesian');

coord.map([0.4, 0.2]); // [85.71428571428571, 13.63636363636364]
```

<a name="fisheye.x" href="#fisheye.x">#</a> **transform**<i>('fisheye.x', focus: number, distortion: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#cartesianFisheye)

Applies cartesian fisheye effects for the x dimensions of input vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('fisheye.x', 0.5, 2);
coord.transform('cartesian');
coord.map([0.4, 0.2]); // [85.71428571428571, 30]
```

<a name="fisheye.y" href="#fisheye.y">#</a> **transform**<i>('fisheye.y', focus: number, distortion: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#cartesianFisheye)

Applies cartesian fisheye effects for the y dimensions of input vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('fisheye.y', 0.5, 2);
coord.transform('cartesian');
coord.map([0.4, 0.2]); // [120, 13.63636363636364]
```

<a name="fisheye.circular" href="#fisheye.circular">#</a> **transform**<i>('fisheye.circular', focusX: number, focusY: number, radius: number, distortion: number) : Coordinate</i> · [examples](https://observablehq.com/@pearmini/antv-coord#circularFisheye)

Applies circular fisheye effects for input vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.transform('fisheye.circular', 0.5, 0.5, 30, 2);
coord.transform('cartesian');
coord.map([0.45, 0.45]); // [128.75388202501892, 64.37694101250946]
```

## User Defined

<a name="custom" href="#custom">#</a> **transform**<i>('custom', callback: TransformCallback) : Coordinate</i>

Customizes transform and untransform functions.

```ts
import { Coordinate, Transformer } from '@antv/coord';

const coord = new Coordinate();
coord.transform('custom', (x, y, width, height) => {
  x; // 0
  y; // 0
  width; // 300
  height; // 150
  return {
    transform(vector) {
      const [v1, v2] = vector;
      return [x + width * v1, y + height * v2];
    },
    untransform(vector) {
      const [v1, v2] = vector;
      return [(v1 - x) / width, (v2 - y) / height];
    },
  };
});

coord.map([0.5, 0.5]); // [150, 75])
coord.invert([150, 75]); // [0.5, 0.5])
```

<a name="matrix" href="#matrix">#</a> **transform**<i>('matrix', matrix3: Matrix3) : Coordinate</i>

Customizes transform matrix.

```ts
import { Coordinate, Matrix3 } from '@antv/coord';

const m3: Matrix3 = [1, 0, 0, 0, 1, 0, 10, 20, 1];
const coord = new Coordinate({
  transformations: [['cartesian']],
});

coord.transform('matrix', m3);
coord.map([0.5, 0.5]); // [160, 95]
coord.invert([160, 95]); // [0.5, 0.5]
```
