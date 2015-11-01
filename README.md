# color-palette

Extract colors from images. Supports GIF, JPG, PNG, and even SVG!

## Installation

```sh
npm install color-palette --save
```

This package is intended for use in node environments. It won't work in a browser because it has node-specific dependencies.

## Usage

```js
const colorPalette = require("color-palette")

colorPalette(__dirname + 'double-rainbow.png', function(err, palette){
  // palette is an array of colors
})
```

The `palette` is an array of [chroma.js](http://gka.github.io/chroma.js) color objects. This is convenient because it lets you pick the color format you want (RGB hex, HSL, etc), and gives you access to powerful color manipulation features:

```js
palette.map(color => color.hex())
// => ['#FFFFFF', '#123123', '#F0F0F0']

palette[0].alpha(0.5).css();
// => 'rgb(0,128,128)''
```

## How it Works

`color-palette` uses [get-pixels](https://npm.im/get-pixels) to create a pixel array, then extracts a color palette with [get-rgba-palette](https://npm.im/get-rgba-palette), which uses [quantize](https://www.npmjs.com/package/quantize) under the hood.

Colors are converted from [get-rgba-palette's flat array format](https://github.com/mattdesl/get-rgba-palette#palettepixels-count-quality-filter) into [chroma.js color instances](http://gka.github.io/chroma.js/).

To extract palettes from SVG files, a PNG copy is created on the fly using [svg2png](https://npm.im/svg2png), which depends on PhantomJS. PhantomJS can be installed as a local node module, unlike [canvas](https://npm.im/canvas) which has [external dependencies](https://github.com/Automattic/node-canvas#installation).

## Tests

```sh
npm install
npm test
```

## Dependencies

- [chroma-js](https://github.com/gka/chroma.js): JavaScript library for color conversions
- [get-pixels](https://github.com/scijs/get-pixels): Reads the pixels of an image as an ndarray
- [get-rgba-palette](https://github.com/mattdesl/get-rgba-palette): gets a palette of prominent colors from an array of pixels
- [svg2png](https://github.com/domenic/svg2png): A SVG to PNG converter, using PhantomJS

## Dev Dependencies

- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework


## License

MIT
