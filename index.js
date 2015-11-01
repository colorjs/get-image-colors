const fs = require('fs')
const path = require('path')
const getPixels = require('get-pixels')
const getRgbaPalette = require('get-rgba-palette')
const chroma = require('chroma-js')
const svg2png = require('svg2png')

const patterns = {
  image: /\.(gif|jpg|png|svg)$/i,
  bitmap: /\.(gif|jpg|png)$/i,
  svg: /svg$/i
}

module.exports = function colorPalette(filename, callback) {

  // SVG
  if (filename.match(patterns.svg)) {
    var newFilename = filename.replace(patterns.svg, 'png')
    return svg2png(filename, newFilename, function (err) {
      if (err) return callback(err)
      return paletteFromBitmap(newFilename, callback)
    })
  }

  // PNG, GIF, JPG
  return paletteFromBitmap(filename, callback)
}

function paletteFromBitmap(filename, callback) {
  getPixels(filename, function(err, pixels) {
    if (err) return callback(err)
    const palette = getRgbaPalette(pixels.data, 5).map(function(rgba){
      return chroma(rgba)
    })
    return callback(null, palette)
  })
}
