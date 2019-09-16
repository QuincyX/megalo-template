const { $Message, $Toast } = require('@/static/iview/base/index')

export default {
  install(Vue, option) {
    // 自定义通知方法
    Vue.prototype.$message = {
      success: val => {
        return $Message({
          content: val,
          type: 'success'
        })
      },
      warning: val => {
        return $Message({
          content: val,
          type: 'warning'
        })
      },
      error: val => {
        return $Message({
          content: val,
          type: 'error'
        })
      }
    }
    Vue.prototype.$toast = {
      text: val => {
        return $Toast({
          content: val
        })
      },
      success: val => {
        return $Toast({
          content: val,
          type: 'success'
        })
      },
      warning: val => {
        return $Toast({
          content: val,
          type: 'warning'
        })
      },
      error: val => {
        return $Toast({
          content: val,
          type: 'error'
        })
      }
    }
    // 自定义加载动画
    let loadingInstance
    Vue.prototype.$loading = {
      start: val => {
        loadingInstance = $Toast({
          content: val || '加载中',
          type: 'loading',
          duration: 0
        })
        return loadingInstance
      },
      stop: () => {
        return $Toast.hide()
      }
    }
  }
}
