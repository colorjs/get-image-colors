import getPixels from 'get-pixels';
import getRgbaPalette from 'get-rgba-palette';
import chroma from 'chroma-js';
import getSvgColors from 'get-svg-colors';
import pify from 'pify';

const patterns = {
  image: /\.(?:gif|jpg|png|svg)$/i,
  raster: /\.(?:gif|jpg|png)$/i,
  svg: /\.svg$/i
};

function colorPalette(input, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {
      type: undefined,
      count: 5
    };
  } else if (typeof options === 'string')
    options = {
      type: options,
      count: 5
    };

  // SVG
  if (
    (!Buffer.isBuffer(input) && patterns.svg.test(input)) ||
    options.type === 'image/svg+xml'
  )
    return callback(null, getSvgColors(input, { flat: true }));

  // PNG, GIF, JPG
  return paletteFromBitmap(input, options, callback);
}

function paletteFromBitmap(filename, options, callback) {
  if (callback == undefined) {
    callback = options;
    options = {
      type: undefined,
      count: 5
    };
  }

  getPixels(filename, options.type, (err, pixels) => {
    if (err != undefined) {
      callback(err);

      return;
    }

    const palette = getRgbaPalette(pixels.data, options.count).map((rgba) =>
      chroma(rgba)
    );

    callback(null, palette);
  });
}

export default pify(colorPalette);
