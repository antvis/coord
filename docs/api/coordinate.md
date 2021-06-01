# Coordinate

The object to specify and apply transformations.

<a name="constructor" href="#constructor">#</a> **Coordinate**<i>(options?: Options) : Coordinate</i>

Returns a new coordinate object with specified options.

```ts
/* basic usage */
import { Coordinate, Options } from '@antv/coord';

const options: Options = {
  x: 10,
  y: 20,
  width: 500,
  height: 600,
  transformations: [['cartesian'], ['translate', 10, 10]],
};

const coord = new Coordinate(options);
```

| Key             | Description                                   | Type    | Default |
| --------------- | --------------------------------------------- | ------- | ------- |
| x               | x of the bounding box of the coordinate       | number  | `0`     |
| y               | y of the bounding box of the coordinate       | number  | `0`     |
| width           | width of the bounding box of the coordinate   | number  | `300`   |
| height          | height of the bounding box of the coordinate  | number  | `150`   |
| transformations | transformations to be applied to input vector | `Array` | `[]`    |

<a name="update" href="#update">#</a> **update**<i>(options?: Options) : void</i>

Updates the options of the coordinate object.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();

coord.update({
  width: 200,
  height: 200,
});
```

<a name="transform" href="#transform">#</a> **transform**<i>(...args?: Tranformation) : Coordinate</i>

Specifies transformation to be applied to the input vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();

coord
  .transform('polar', 0, Math.PI * 2, 0, 1)
  .transform('cartesian')
  .transform('scale', 10, 10);
```

<a name="clear" href="#clear">#</a> **clear**<i>() : void</i>

Clears current transformations.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();

coord
  .transform('polar', 0, Math.PI * 2, 0, 1)
  .transform('cartesian')
  .transform('scale', 10, 10);

coord.clear();
```

<a name="map" href="#map">#</a> **map**<i>(vector: Vector2 | Vector) : Vector2 | Vector </i>

Applies specified transformations to input vector and returns transformed vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();

coord
  .transform('cartesian')
  .transform('scale', 10, 10);

coord.map([0.5, 0.5]); // [1500, 750]
```

<a name="invert" href="#invert">#</a> **invert**<i>(vector: Vector2 | Vector) : Vector2 | Vector </i>

Invert specified transformations to transformed vector and returns original vector.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();

coord
  .transform('cartesian')
  .transform('scale', 10, 10);
  
coord.invert([1500, 750]); // [0.5, 0.5]
```

<a name="getSize" href="#getSize">#</a> **getSize**<i>() : Vector2 </i>

Returns the size of the bounding box of the coordinate object.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.getSize(); // [300, 150]
```

<a name="getCenter" href="#getCenter">#</a> **getCenter**<i>() : Vector2 </i>

Returns the center of the bounding box of the coordinate object.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
coord.getCenter(); // [150, 75]
```

<a name="clone" href="#clone">#</a> **clone**<i>() : Coordinate </i>

Returns a new coordinate object with the same but independent options.

```ts
import { Coordinate } from '@antv/coord';

const coord = new Coordinate();
const coord1 = coord.clone();
```
