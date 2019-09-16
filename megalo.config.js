const path = require('path')
function resolve(_path) {
  return path.resolve(process.cwd(), _path)
}

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: config => {
    // 添加 pug loader
    config.module.rules.push({
      test: /\.pug$/,
      loader: 'pug-plain-loader',
      resourceQuery: /^\?vue/
    })
    // less自动注入全局变量功能 --start
    config.module.rules[
      config.module.rules.findIndex(o => {
        if (o.test) {
          return o.test.toString().includes('less')
        }
      })
    ].use.push({
      loader: 'style-resources-loader',
      options: {
        preProcessor: 'less',
        patterns: ['./src/style/mixin.less', './src/style/theme.less']
      }
    })
    // axios兼容配置
    config.resolve.aliasFields = ['browser']

    return config
  },
  chainWebpack: chainConfig => {
    // 自动复制 static 目录，用于第三方UI组件
    chainConfig.plugin('copy-webpack-plugin').tap(oldArgs => {
      oldArgs[0].push({
        context: resolve('src/static'),
        from: `**/*`,
        to: resolve(`dist-${process.env.PLATFORM}/static`)
      })
      return oldArgs
    })
  },
  nativeDir: '/src/native',
  css: {
    loaderOptions: {
      css: {},
      less: {},
      sass: {},
      stylus: {},
      px2rpx: {
        rpxUnit: 0.5
      }
    }
  }
}
