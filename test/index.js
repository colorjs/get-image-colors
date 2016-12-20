const getColors = require('..')
const fs = require('fs')
const path = require('path')
const assert = require('assert')

describe('get-image-colors', function () {
  it('works on JPG images', function (done) {
    getColors(path.join(__dirname, '/fixtures/thumb.jpg'), function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('works on GIF images', function (done) {
    getColors(path.join(__dirname, '/fixtures/thumb.gif'), function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('works on PNG images', function (done) {
    getColors(path.join(__dirname, '/fixtures/thumb.png'), function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('works on SVG images', function (done) {
    this.timeout(5000)
    getColors(path.join(__dirname, '/fixtures/thumb.svg'), function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      palette = palette.map(color => color.hex())
      assert(palette[0].match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('supports promises', function (done) {
    getColors(path.join(__dirname, '/fixtures/thumb.jpg'))
      .then(function (palette) {
        assert(Array.isArray(palette))
        done()
      })
  })

  it('works on Buffered JPEG images', function (done) {
    const buffer = fs.readFileSync(path.join(__dirname, '/fixtures/thumb.jpg'))

    getColors(buffer, 'image/jpeg', function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('works on Buffered GIF images', function (done) {
    const buffer = fs.readFileSync(path.join(__dirname, '/fixtures/thumb.gif'))

    getColors(buffer, 'image/gif', function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('works on Buffered PNG images', function (done) {
    const buffer = fs.readFileSync(path.join(__dirname, '/fixtures/thumb.png'))

    getColors(buffer, 'image/png', function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })

  it('works on Buffered SVG images', function (done) {
    const buffer = fs.readFileSync(path.join(__dirname, '/fixtures/thumb.svg'))

    getColors(buffer, 'image/svg+xml', function (err, palette) {
      if (err) throw err
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
  })
})
