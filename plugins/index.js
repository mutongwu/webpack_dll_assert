
const HtmlWebpackPlugin = require('html-webpack-plugin')
const createLibs = require('./lib.js');

// A JavaScript class.
class WebpackHtmlCopyExternal {
  constructor(options = {}) {
    this.buildDir = options.buildDir
    this.modulesDir = options.node_modules;
    this.webpackMajorVersion = 4;
    console.log('root', this.buildDir)
  }
  getResources(webpackPublicPath, externals) {
    const result = createLibs({
      distDir: this.buildDir, 
      modulesDir: this.modulesDir,
      libs: Object.keys(externals)
    });

    
    const publicPath = this.webpackMajorVersion >= 5
      ? webpackPublicPath.trim() !== '' && webpackPublicPath !== 'auto'
        ? webpackPublicPath : ''
      : webpackPublicPath || ''
    return result.map(item => {
      const res = {}
      if (item.js) {
        res.tagName =  'script';
        res.attributes =  {
          src: `${publicPath}${item.js}`
        };
      } else if (item.css) {
        res.tagName =  'link';
        res.attributes =  {
          href: `${publicPath}${item.css}`,
          type: 'text/css',
          rel: 'stylesheet'
        };
      }
      return res;
    }).filter(item => {
      return item.tagName;
    })
  }
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
        // for webpack5+, we can get webpack version from `compiler.webpack`
    if (compiler.webpack) {
      this.webpackMajorVersion = compiler.webpack.version.split('.')[0]
    }

    const pluginName = this.constructor.name;
    console.log('webpack:', pluginName)


     compiler.hooks.compilation.tap(pluginName, compilation => {
         console.log('externals config: ', compilation.options.externals);
         const webpackPublicPath = compilation.outputOptions.publicPath;

         HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
            pluginName,
            (htmlPluginData) => {
              const resourceHints = this.getResources(webpackPublicPath, compilation.options.externals);
              htmlPluginData.assetTags.styles = [
                  ...resourceHints,
                  ...htmlPluginData.assetTags.styles
              ]
              return htmlPluginData
            }
          )
     })
  }
}

module.exports = WebpackHtmlCopyExternal;