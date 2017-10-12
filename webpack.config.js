const path = require( 'path' );

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        include: path.resolve(__dirname, './src'),
        // exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-2', 'react', 'env', 'es2015']
        }
      }
    ]
  }
};
