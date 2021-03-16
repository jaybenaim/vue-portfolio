// eslint-disable-next-line
const path = require('path');  
module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@components', path.join(__dirname, 'src/components'))
    config.resolve.alias.set('@layout', path.join(__dirname, 'src/components/layout'))
    config.resolve.alias.set('@types', path.join(__dirname, 'src/lib/types'))
  },
}
