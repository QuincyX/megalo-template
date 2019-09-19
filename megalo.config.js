const path = require('path')
function resolve(_path) {
  return path.resolve(process.cwd(), _path)
}
const qLessToolkit = require('@quincyx/less-toolkit')

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
      less: {
        plugins: [
          new qLessToolkit({
            extend: [
              resolve('./src/style/theme.less'),
              resolve('./src/style/mixin.less')
            ]
          })
        ],
        javascriptEnabled: true
      },
      sass: {},
      stylus: {},
      px2rpx: {
        rpxUnit: 0.5
      }
    }
  }
}
