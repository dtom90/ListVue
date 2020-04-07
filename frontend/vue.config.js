module.exports = {
  publicPath: process.env.BASE_URL ? process.env.BASE_URL : '/',
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
