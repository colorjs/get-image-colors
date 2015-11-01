const colorPalette = require('./')

colorPalette(__dirname + 'file.jpg', function(err, palette){
  // palette is an array of chroma.js color instances

  // To convert all the values to hex codes:
  palette = palette.map(color => color.hex())
  
})

colorPalette(__dirname + 'file.jpg', function(err, palette){
  // palette is an array of hex colors
})
