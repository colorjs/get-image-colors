const fs = require('fs')
const path = require('path')
const tmp = require('tmp')
const getPixels = require('get-pixels')
const getRgbaPalette = require('get-rgba-palette')
const chroma = require('chroma-js')
const getSvgColors = require('get-svg-colors')

const patterns = {
  image: /\.(gif|jpg|png|svg)$/i,
  raster: /\.(gif|jpg|png)$/i,
  svg: /svg$/i
}

module.exports = function colorPalette (filename) {
  // SVG
  if (filename.match(patterns.svg)) {
    return new Promise((resolve, reject) => {
      return resolve(getSvgColors(filename, {flat: true}));
    })
  }

  // PNG, GIF, JPG
  return paletteFromBitmap(filename)
}

function paletteFromBitmap (filename) {

  return new Promise((resolve, reject) => {
    getPixels(filename, function (err, pixels) {
      if (err) reject(err)
      const palette = getRgbaPalette(pixels.data, 5).map(function (rgba) {
        return chroma(rgba);
      })

      resolve(palette);
    })
  })
}
