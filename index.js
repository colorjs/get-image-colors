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

const defaultOptions = {
  type: undefined,
  paletteSize: 5
}

function colorPalette (input, options, callback) {
  const config = Object.assign(defaultOptions, options)

  if (typeof options === 'function')
    callback = options


  // SVG
  if (!Buffer.isBuffer(input)) {
    if (input.match(patterns.svg)) {
      return callback(null, getSvgColors(input, { flat: true }))
    }
  } else if (config.type === 'image/svg+xml') {
    return callback(null, getSvgColors(input, { flat: true }))
  }

  // PNG, GIF, JPG
  return paletteFromBitmap(input, config, callback)
}

function paletteFromBitmap (filename, config, callback) {
  if (!callback) {
    callback = config.type
    config.type = null
  }

  getPixels(filename, config.type, function (err, pixels) {
    if (err) return callback(err)
    const palette = getRgbaPalette(pixels.data, config.paletteSize).map(function (rgba) {
      return chroma(rgba)
    })

    return callback(null, palette)
  })
}

module.exports = pify(colorPalette)
