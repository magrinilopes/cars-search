const fs = require('fs');

module.exports = {
  configureWebpack: {
    devServer: {
      https: {
        ca: fs.readFileSync('./rootCA.pem'),
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt')
      },
    }
  },
  filenameHashing: true,
  productionSourceMap: false,
  outputDir: 'dist/',
  publicPath: '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'TEx - Busca de Veículos';
        args[0].meta = {viewport: 'width=device-width,initial-scale=1,user-scalable=no, shrink-to-fit=no'};
        return args;
      })
  }
};
