import store from '@/store/index'

export default {
  install(Vue, option) {
    Vue.prototype.$store = store
  }
}
