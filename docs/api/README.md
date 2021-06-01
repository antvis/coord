# API Reference

There are two parts of @antv/coord. Follow the links below to learn more.

- [Coordinate](#coordinate)
- [Transformations](#transformations)([Affine](#affine), [Coordinate System](#coordinate-system), [Fisheye](#fisheye))

## Coordinate

The object to specify and apply transformations.

- [Coordinate](./coordinate.md#constructor) - Returns a new coordinate object with specified options.
- [coord.update](./coordinate.md#update) - Updates the options of the coordinate object.
- [coord.transform](./coordinate.md#transform) - Specifies transformation.
- [coord.clear](./coordinate.md#clear) - Clears current transformations.
- [coord.map](./coordinate.md#map) - Applies specified transformations to input vector and returns transformed vector.
- [coord.invert](./coordinate.md#invert) - Invert specified transformations to transformed vector and returns original vector.
- [coord.getSize](./coordinate.md#getSize) - Returns the size of the bounding box of the coordinate object.
- [coord.getCenter](./coordinate.md#getCenter) - Returns the center of the bounding box of the coordinate object.
- [coord.clone](./coordinate.md#clone) - Returns a new coordinate object with the same but independent options.

## Transformations

Supported transformations can applied to input vector.

### Affine

- [translate](./affine.md#translate) - Sends `(x, y)` to `(x + b, y + b)`.
- [scale](./affine.md#scale) - Sends `(x, y)` to `(ax, by)`.
- [rotate](./affine.md#rotate) - Sends `(x, y)` to `(cos(theta)) * x - sin(theta) * y, sin(theta) * x - cos(theta) * x)`.
- [reflect](./affine.md#reflect) - Sends `(x, y)` to `(-x, -y)`.
- [reflect.x](./affine.md#reflect.x) - Sends `(x, y)` to `(-x, y)`.
- [reflect.y](./affine.md#reflect.y) - Sends `(x, y)` to `(x, -y)`.
- [shear.x](./affine.md#shear.x) - Sends `(x, y)` to `(cot(theta) * y + x, y)`.
- [shear.y](./affine.md#shear.y) - Sends `(x, y)` to `(x, cot(theta) * x + y)`.
- [transpose](./affine.md#transpose) - Sends `(x, y)` to `(y, x)`.

### Coordinate System

- [cartesian](./coordinateSystem.md#cartesian) - Transforms points in normalized cartesian system to the bounding box of the coordinate.
- [polar](./coordinateSystem.md#polar) - Transforms points in normalized polar system to normalized cartesian system.
- [polar.theta](./coordinateSystem.md#polar.theta) - Transforms points in normalized polar system which radius dimension fixed to 1 to normalized cartesian system.
- [polar.rho](./coordinateSystem.md#polar.rho) - Transforms points in normalized polar system which angle dimension fixed to 1 to normalized cartesian system.
- [helix](./coordinateSystem.md#helix) - Transforms points in normalized helix system to normalized cartesian system.
- [parallel](./coordinateSystem.md#parallel) - Transforms points in normalized parallel system to normalized cartesian system.

### Fisheye Lens

- [fisheye](./fisheyeLens.md#fisheye) - Applies fisheye effects for both dimensions of input vector.
- [fisheye.x](./fisheyeLens.md#fisheye.y) - Applies fisheye effects for the x dimensions of input vector.
- [fisheye.y](./fisheyeLens.md#fisheye.x) - Applies fisheye effects for the y dimensions of input vector.
- [fisheye.circular](./fisheyeLens.md#fisheye.circular) - Applies circular fisheye effects for input vector.

### User Defined

- [custom](./userDefined.md#custom) - Customized transform and untransform functions.
- [matrix](./userDefined.md#matrix) - Customized transform matrix.
