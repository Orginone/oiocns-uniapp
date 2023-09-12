module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://orginone.cn/',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': '@/'
      }
    }
  }
}