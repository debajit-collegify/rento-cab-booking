const withCSS = require('@zeit/next-css')
module.exports = withCSS({/* my next config */})
module.exports.useFileSystemPublicRoutes = false;
node: {
    fs: 'empty'
  }
  