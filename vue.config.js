// eslint-disable-next-line
const path = require('path');  
module.exports = {
  publicPath: '/vue-portfolio/',
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_animations.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_globals.scss";
        `
      }
    }
  },
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@components', path.join(__dirname, 'src/components'))
    config.resolve.alias.set('@layout', path.join(__dirname, 'src/components/layout'))
    config.resolve.alias.set('@lib', path.join(__dirname, 'src/lib'))
    config.resolve.alias.set('@mixins', path.join(__dirname, 'src/mixins'))
    config.resolve.alias.set('@atoms', path.join(__dirname, 'src/components/atoms'))
    config.resolve.alias.set('@organisms', path.join(__dirname, 'src/components/organisms'))
    config.resolve.alias.set('@images', path.join(__dirname, 'src/assets/images'))
    config.resolve.alias.set('@sections', path.join(__dirname, 'src/components/sections'))
  },
}
