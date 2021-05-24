<h1 align="center">
<b>@antv/coord</b>
</h1>

<div align="center">

Toolkit for mapping elements of sets into geometric objects.

[![Build Status](https://github.com/antvis/coord/workflows/build/badge.svg?branch=master)](https://github.com/antvis/coord/actions)
[![Coverage Status](https://img.shields.io/coveralls/github/antvis/coord/master.svg)](https://coveralls.io/github/antvis/coord?branch=master)
[![npm Version](https://img.shields.io/npm/v/@antv/coord.svg)](https://www.npmjs.com/package/@antv/coord)
[![npm Download](https://img.shields.io/npm/dm/@antv/coord.svg)](https://www.npmjs.com/package/@antv/coord)
[![npm License](https://img.shields.io/npm/l/@antv/coord.svg)](https://www.npmjs.com/package/@antv/coord)

</div>

## ✨ Features

- **Powerful**
- **High performance**
- **Fully embrace TypeScript**

## 📦 Installation

```bash
$ npm install @antv/coord
```

## 🔨 Getting Started

```ts
import { Coordinate, Options } from '@antv/coord';

const optons: Options = {
  x: 0,
  y: 0,
  width: 500,
  height: 500,
  transforms: [['scale', 10, 10]]
}

const coord = new Coordinate(options);
coord.transform('translate', 10, 10);
coord.map([0.5, 0.5]);
coord.getSize();
coord.getCenter();
```

## 📎 Links

- [Introduction](https://observablehq.com/@pearmini/antv-coord)
- [API Reference](./docs/api/readme.md)

## 📮 Contribution

```bash
$ git clone git@github.com:antvis/coord.git

$ cd coord

$ npm i

$ npm t
```

Then send a pull request after coding.

## 📄 License

MIT@[AntV](https://github.com/antvis).
