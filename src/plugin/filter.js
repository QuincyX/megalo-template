import * as filters from '@/utils/filter'

export default {
  install(Vue, option) {
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}
