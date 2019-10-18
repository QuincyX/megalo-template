/*
 * @Author: QuincyX (likequincy@outlook.com)
 * @Date: 2019-10-18 14:16:41
 * @Last Modified by:   QuincyX
 * @Last Modified time: 2019-10-18 14:16:41
 */
function getURL(val, query) {
  let result
  if (val === '/') {
    result = '/pages/home/index'
  } else if (val.slice(0, 6) !== '/pages') {
    result = '/pages' + val
  }
  if (query) {
    result = result + '?'
    Object.keys(query).forEach(name => {
      result = result + name + '=' + query[name] + '&'
    })
  }
  return result
}

export default {
  install(Vue, option) {
    const router = this
    router.route = {}
    Vue.prototype.$router = {
      replace: (url, query) => {
        Megalo.redirectTo({
          url: getURL(url, query)
        })
      },
      push: (url, query) => {
        Megalo.navigateTo({
          url: getURL(url, query)
        })
      },
      back: (delta = 1) => {
        Megalo.navigateBack({ delta })
      }
    }
    Vue.mixin({
      mounted() {
        if (this.$mp && this.$mp.page) {
          router.route.fullPath = this.$mp.page.route
          router.route.path = this.$mp.page.route.replace('pages', '')
          router.route.query = this.$mp.query
        }
      }
    })
    Vue.prototype.$route = router.route
  }
}
