# get-image-colors

Extract colors from images. Supports GIF, JPG, PNG, and even SVG!

![example color palette](https://cldup.com/-uw9Ub6L6s.png)

## Installation

```sh
npm install get-image-colors
```

This package is intended for use in node environments. It won't work in a browser because it has node-specific dependencies.

**Note:** when installing with webpack, if you get the error

```
Can't resolve 'fs' in '/node_modules/get-svg-colors'
```

as per an [open issue in webpack-contrib](https://github.com/webpack-contrib/css-loader/issues/447), you will need to add `node: { fs: 'empty' }` to your `webpack.base.config`:

```js
module.exports = {
    ...,
    node: { fs: 'empty' }
};
```

## Usage

```js
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import getColors from 'get-image-colors';

getColors(
  join(dirname(fileURLToPath(import.meta.url)), 'double-rainbow.png')
).then((colors) => {
  // `colors` is an array of color objects
});
```

You can also use a buffer as an input source.

```js
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import getColors from 'get-image-colors';

const buffer = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'double-rainbow.gif')
);

getColors(buffer, 'image/gif').then((colors) => {
  // `colors` is an array of color objects
});
```

`colors` is an array of [chroma.js][] color objects. chroma.js objects have methods that lets you pick the color format you want (RGB hex, HSL, etc), and give you access to powerful color manipulation features:

```js
colors.map((color) => color.hex());
// => ['#FFFFFF', '#123123', '#F0F0F0']

colors[0].alpha(0.5).css();
// => 'rgb(0,128,128)'
```

If you don't like promises, you can use node-style callbacks too:

```js
getColors(filename, (err, colors) => {
  if (err != undefined) throw err;
  // ...
});
```

The default number of colors returned is 5. You can specify a different number of colors by passing an options object into the call to getColors:

```js
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import getColors from 'get-image-colors';

const options = {
  count: 10,
  type: 'image/png'
};

getColors(
  join(dirname(fileURLToPath(import.meta.url)), 'double-rainbow.png'),
  options
).then((colors) => {
  // `colors` is an array of 10 color objects
});
```

## How it Works

`get-image-colors` uses [get-pixels][] to create a pixel array, then extracts a color palette with [get-rgba-palette][], which uses [quantize](http://npmjs.com/package/quantize) under the hood.

Colors are converted from [get-rgba-palette's flat array format](https://github.com/mattdesl/get-rgba-palette#palettepixels-count-quality-filter) into [chroma.js color instances][chroma.js].

## Tests

```sh
npm install
npm test
```

## Dependencies

- [chroma-js][chroma.js]: JavaScript library for color conversions
- [get-pixels][]: Reads the pixels of an image as an ndarray
- [get-rgba-palette][]: Gets a palette of prominent colors from an array of pixels
- [get-svg-colors](https://npmjs.com/package/get-svg-colors): Extract stroke and fill colors from SVG files

## Dev Dependencies

- [eslint](https://npmjs.com/package/eslint): ECMAScript/JavaScript linter
- [mocha](https://npmjs.com/package/mocha): Simple, flexible, fun test framework
- [prettier](https://npmjs.com/package/prettier): Opinionated code formatter

## License

MIT

[chroma.js]: https://npmjs.com/package/chroma-js
[get-pixels]: https://npmjs.com/package/get-pixels
[get-rgba-palette]: https://npmjs.com/package/get-rgba-palette
