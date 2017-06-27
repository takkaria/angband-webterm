var path = require('path');

module.exports = {
  entry: './lib/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  }
}
