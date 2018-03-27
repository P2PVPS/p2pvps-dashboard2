module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: `http://p2pvps.net:3001`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
};
