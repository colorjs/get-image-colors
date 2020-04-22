const getPixels = require('get-pixels')
const getRgbaPalette = require('get-rgba-palette')
const chroma = require('chroma-js')
const getSvgColors = require('get-svg-colors')
const pify = require('pify')

const patterns = {
  image: /\.(gif|jpg|png|svg)$/i,
  raster: /\.(gif|jpg|png)$/i,
  svg: /svg$/i
}

function colorPalette (input, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {
      type: undefined,
      count: 5
    }
  } else if (typeof options === 'string') {
    options = {
      type: options,
      count: 5
    }
  }

  // SVG
  if (!Buffer.isBuffer(input)) {
    if (input.match(patterns.svg)) {
      return callback(null, getSvgColors(input, { flat: true }))
    }
  } else if (options.type === 'image/svg+xml') {
    return callback(null, getSvgColors(input, { flat: true }))
  }

  // PNG, GIF, JPG
  return paletteFromBitmap(input, options, callback)
}

function paletteFromBitmap (filename, options, callback) {
  if (!callback) {
    callback = options
    options = {
      type: undefined,
      count: 5
    }
  }

  getPixels(filename, options.type, function (err, pixels) {
    if (err) return callback(err)
    const palette = getRgbaPalette(pixels.data, options.count).map(function (rgba) {
      return chroma(rgba)
    })

    return callback(null, palette)
  })
}

module.exports = pify(colorPalette)
