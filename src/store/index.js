import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global: require('./module/global').default,
    user: require('./module/user').default
  },
  plugins: [
    persistedState({
      storage: {
        getItem: key => Megalo.getStorageSync(key),
        setItem: (key, value) => Megalo.setStorageSync(key, value),
        removeItem: key => () => Megalo.removeStorageSync(key)
      }
    })
  ]
})
