# get-image-colors

Extract colors from images. Supports GIF, JPG, PNG, and even SVG!

![example color palette](https://cldup.com/-uw9Ub6L6s.png)

## Installation

```sh
npm install get-image-colors --save
```

This package is intended for use in node environments. It won't work in a browser because it has node-specific dependencies.

## Usage

```js
const path = require('path')
const getColors = require('get-image-colors')

getColors(path.join(__dirname, 'double-rainbow.png')).then(colors => {
  // `colors` is an array of color objects
})
```

You can also use a buffer as an input source.
```js
const fs = require('fs')
const buffer = fs.readFileSync(path.join(__dirname, 'double-rainbow.gif'))
const getColors = require('get-image-colors')

getColors(buffer, 'image/gif').then(colors => {
  // `colors` is an array of color objects
})
```

`colors` is an array of [chroma.js](http://gka.github.io/chroma.js) color objects. chroma.js objects have methods that lets you pick the color format you want (RGB hex, HSL, etc), and give you access to powerful color manipulation features:

```js
colors.map(color => color.hex())
// => ['#FFFFFF', '#123123', '#F0F0F0']

colors[0].alpha(0.5).css()
// => 'rgb(0,128,128)''
```

If you don't like promises, you can use node-style callbacks too:

```js
getColors(filename, function (err, colors) {
  if (err) throw err
  // ...
})
```

## How it Works

`get-image-colors` uses [get-pixels](http://npm.im/get-pixels) to create a pixel array, then extracts a color palette with [get-rgba-palette](http://npm.im/get-rgba-palette), which uses [quantize](http://npm.im/quantize) under the hood.

Colors are converted from [get-rgba-palette's flat array format](https://github.com/mattdesl/get-rgba-palette#palettepixels-count-quality-filter) into [chroma.js color instances](http://gka.github.io/chroma.js/).

## Tests

```sh
npm install
npm test
```

## Dependencies

- [chroma-js](https://github.com/gka/chroma.js): JavaScript library for color conversions
- [get-pixels](https://github.com/scijs/get-pixels): Reads the pixels of an image as an ndarray
- [get-rgba-palette](https://github.com/mattdesl/get-rgba-palette): gets a palette of prominent colors from an array of pixels
- [get-svg-colors](https://github.com/colorjs/get-svg-colors): Extract stroke and fill colors from SVG files

## Dev Dependencies

- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework

## License

MIT
