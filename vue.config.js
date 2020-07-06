// vue.config.js
module.exports = {
  devServer: {
    host: "localhost"
  },
  configureWebpack: {
    devtool: "source-map",
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            chunks: "all",
            enforce: true,
            name: "common"
          }
        }
      }
    }
  }
};
