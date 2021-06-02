# API Reference

There are two parts of API Reference for @antv/coord. Follow the links below to learn more.

- [Coordinate](#coordinate)
- [Transformations](#transformations)([Affine](#affine), [Coordinate System](#coordinate-system), [Fisheye Lens](#fisheye-lens), [User Defined](#user-defined))

## Coordinate

The object to specify and apply transformations.

- [Coordinate](./coordinate.md#constructor) - Returns a new coordinate object with specified options.
- [coord.update](./coordinate.md#update) - Updates the options of the coordinate object.
- [coord.transform](./coordinate.md#transform) - Specifies transformation to be applied to the input vector.
- [coord.clear](./coordinate.md#clear) - Clears current transformations.
- [coord.map](./coordinate.md#map) - Applies specified transformations to input vector and returns the transformed vector.
- [coord.invert](./coordinate.md#invert) - Invert the specified transformations to transformed vector and returns the original vector.
- [coord.getSize](./coordinate.md#getSize) - Returns the size of the bounding box of the coordinate object.
- [coord.getCenter](./coordinate.md#getCenter) - Returns the center of the bounding box of the coordinate object.
- [coord.clone](./coordinate.md#clone) - Returns a new coordinate object with the same but independent options.

## Transformations

Built-in transformations can applied to the input vector.

### Affine

- [translate](./transformations.md#translate) - Sends `(x, y)` to `(x + b, y + b)`.
- [scale](./transformations.md#scale) - Sends `(x, y)` to `(a * x, b * y)`.
- [rotate](./transformations.md#rotate) - Sends `(x, y)` to `(cos(theta)) * x - sin(theta) * y, sin(theta) * x - cos(theta) * y)`.
- [reflect](./transformations.md#reflect) - Sends `(x, y)` to `(-x, -y)`.
- [reflect.x](./transformations.md#reflect.x) - Sends `(x, y)` to `(-x, y)`.
- [reflect.y](./transformations.md#reflect.y) - Sends `(x, y)` to `(x, -y)`.
- [shear.x](./transformations.md#shear.x) - Sends `(x, y)` to `(cot(theta) * y + x, y)`.
- [shear.y](./transformations.md#shear.y) - Sends `(x, y)` to `(x, cot(theta) * x + y)`.
- [transpose](./transformations.md#transpose) - Sends `(x, y)` to `(y, x)`.

### Coordinate System

- [cartesian](./transformations.md#cartesian) - Transforms points in normalized cartesian system to the bounding box of the coordinate.
- [polar](./transformations.md#polar) - Transforms points in normalized polar system to normalized cartesian system.
- [helix](./transformations.md#helix) - Transforms points in normalized helix system to normalized cartesian system.
- [parallel](./transformations.md#parallel) - Transforms points in normalized parallel system to normalized cartesian system.

### Fisheye Lens

- [fisheye](./transformations.md#fisheye) - Applies cartesian fisheye effects for both dimensions of input vector.
- [fisheye.x](./transformations.md#fisheye.y) - Applies cartesian fisheye effects for the x dimensions of input vector.
- [fisheye.y](./transformations.md#fisheye.x) - Applies cartesian fisheye effects for the y dimensions of input vector.
- [fisheye.circular](./transformations.md#fisheye.circular) - Applies circular fisheye effects for input vector.

### User Defined

- [custom](./transformations.md#custom) - Customizes transform and untransform functions.
- [matrix](./transformations.md#matrix) - Customizes transform matrix.
