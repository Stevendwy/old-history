module.exports = {
  entry: `${__dirname}/js/index.js`,
  output: {
      path: `${__dirname}/js`,
      filename: 'history.js'
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader'
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          }
      ]
  },
  resolve: {
      alias: {
          vue: 'vue/dist/vue.js'
      }
  }
}