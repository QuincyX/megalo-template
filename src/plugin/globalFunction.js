/*
 * @Author: QuincyX (likequincy@outlook.com)
 * @Date: 2019-10-18 14:16:36
 * @Last Modified by:   QuincyX
 * @Last Modified time: 2019-10-18 14:16:36
 */
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
