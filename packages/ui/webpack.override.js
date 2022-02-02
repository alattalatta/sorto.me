module.exports = (webpackConfig) => {
  webpackConfig.module.rules.push({
    test: /\.(png|jpg|svg)$/,
    loader: 'url-loader',
  })

  return webpackConfig
}
