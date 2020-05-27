module.exports = {
  publicPath: '',

  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: `http://${process.env.API_HOST || 'localhost'}:3000`
      }
    }
  },

  pluginOptions: {
    cordovaPath: 'cordova'
  }
}
