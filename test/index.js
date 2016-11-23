/* globals describe, it */

const getColors = require('..')
const assert = require('assert')

describe('get-image-colors', function(){

  it('works on JPG images', function(done){
    getColors(__dirname + '/fixtures/thumb.jpg')
    .then((palette) => {      
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
    .catch(err => {
      throw err;
    })
  })

  it('works on GIF images', function(done){
    getColors(__dirname + '/fixtures/thumb.gif')
    .then((palette) => {      
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
    .catch(err => {
      throw err;
    })
  })

  it('works on PNG images', function(done){
    getColors(__dirname + '/fixtures/thumb.png')
    .then((palette) => {      
      assert(Array.isArray(palette))
      assert(palette.length)
      assert(palette[0].hex().match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
    .catch(err => {
      throw err;
    })
  })

  it('works on SVG images', function(done){
    this.timeout(5000)
    getColors(__dirname + '/fixtures/thumb.svg')
    .then((palette) => {      
      assert(Array.isArray(palette))
      assert(palette.length)
      palette = palette.map(color => color.hex())
      assert(palette[0].match(/^#[0-9a-f]{3,6}$/i))
      done()
    })
    .catch(err => {
      throw err;
    })
  })

})
