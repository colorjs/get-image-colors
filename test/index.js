import getColors from '../index.js';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const hexReg = /^#[0-9a-f]{3,6}$/i;
const _dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-undef
describe('get-image-colors', () => {
  // eslint-disable-next-line no-undef
  it('works on JPG images', (done) => {
    getColors(join(_dirname, '/fixtures/thumb.jpg'), (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on GIF images', (done) => {
    getColors(join(_dirname, '/fixtures/thumb.gif'), (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on PNG images', (done) => {
    getColors(join(_dirname, '/fixtures/thumb.png'), (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on SVG images', (done) => {
    getColors(join(_dirname, '/fixtures/thumb.svg'), (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('supports promises', (done) => {
    getColors(join(_dirname, '/fixtures/thumb.jpg')).then((palette) => {
      assert(Array.isArray(palette));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on Buffered JPEG images', (done) => {
    const buffer = readFileSync(join(_dirname, '/fixtures/thumb.jpg'));

    getColors(buffer, 'image/jpeg', (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on Buffered GIF images', (done) => {
    const buffer = readFileSync(join(_dirname, '/fixtures/thumb.gif'));

    getColors(buffer, 'image/gif', (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on Buffered PNG images', (done) => {
    const buffer = readFileSync(join(_dirname, '/fixtures/thumb.png'));

    getColors(buffer, 'image/png', (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });

  // eslint-disable-next-line no-undef
  it('works on Buffered SVG images', (done) => {
    const buffer = readFileSync(join(_dirname, '/fixtures/thumb.svg'));

    getColors(buffer, 'image/svg+xml', (err, palette) => {
      if (err != undefined) throw err;

      assert(Array.isArray(palette));
      assert(palette.length !== 0);
      assert(hexReg.test(palette[0].hex()));
      done();
    });
  });
});
