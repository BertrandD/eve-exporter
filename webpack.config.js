module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'app.js',
    libraryTarget: 'umd'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  }
}
