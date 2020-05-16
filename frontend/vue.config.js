module.exports = {
  publicPath: process.env.BASE_URL ? process.env.BASE_URL : '/',
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: `http://${process.env.API_HOST || 'localhost'}:3000`
      }
    }
  }
}
