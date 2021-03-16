// eslint-disable-next-line
const path = require('path');  
module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@components', path.join(__dirname, 'src/components'))
    config.resolve.alias.set('@layout', path.join(__dirname, 'src/components/layout'))
    config.resolve.alias.set('@lib', path.join(__dirname, 'src/lib'))
    config.resolve.alias.set('@mixins', path.join(__dirname, 'src/mixins'))
  },
}
