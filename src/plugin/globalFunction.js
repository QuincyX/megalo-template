export default {
  install(Vue, option) {
    Vue.prototype.$sleep = time => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time || 2000)
      })
    }
  }
}
