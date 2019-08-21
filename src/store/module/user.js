import $http from '@/plugin/request'

export default {
  namespaced: false,
  state: {
    user: {},
    token: ''
  },
  getters: {
    user: state => state.user,
    token: state => state.user.token || state.user.accessToken,
    isLogin: state => !!state.token,
    userId: (state, getters) => {
      if (getters.isLogin) {
        return state.user.id
      }
    }
  },
  mutations: {
    user(state, payload) {
      state.user = payload
    },
    token(state, payload) {
      state.token = payload
    },
    clearStorage(state) {
      Megalo.clearStorage()
    }
  },
  actions: {
    loginBySms({ commit }, payload) {
      return $http
        .post('/account/loginBySms', {
          mobile: payload.mobile,
          code: payload.code
        })
        .then(res => {
          commit('clearStorage')
          commit('user', res)
          commit('token', res.accessToken)
          return res
        })
    },
    loginByPhone({ commit }, payload) {
      return $http.post('/account/loginByPassword', payload).then(res => {
        commit('clearStorage')
        commit('user', res)
        commit('token', res.accessToken)
        return res
      })
    },
    refreshUserInfo({ getters, commit }) {
      if (getters.isLogin && getters.token) {
        return $http.post('/account/refreshUserInfo').then(res => {
          commit('clearStorage')
          commit('user', res)
          return res
        })
      }
    },
    logout({ commit }) {
      commit('user', {})
      commit('token', '')
      commit('clearStorage')
    },
    registerUser({ commit }, payload) {
      return $http.post('/account/registerUser', payload).then(res => {
        commit('user', res)
        commit('token', res.accessToken)
        return res
      })
    }
  }
}
