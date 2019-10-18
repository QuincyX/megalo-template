import $http from '@/plugin/axios'

export default {
  namespaced: false,
  state: {
    user: {}
  },
  getters: {
    user: state => state.user,
    token: state => state.user.token,
    isLogin: state => !!state.user.token,
    userId: (state, getters) => {
      if (getters.isLogin) {
        return state.user.id
      }
    }
  },
  mutations: {
    user(state, payload) {
      state.user = payload
    }
  },
  actions: {
    loginBySms({ commit }, payload) {
      if (!payload) {
        return Promise.reject('参数错误')
      } else if (!payload.phone) {
        return Promise.reject('手机号码不能为空')
      } else if (payload.phone.length !== 11) {
        return Promise.reject('请输入11位手机号码')
      } else if (!payload.sms) {
        return Promise.reject('验证码不能为空')
      } else if (payload.sms.length !== 4) {
        return Promise.reject('验证码格式不正确')
      } else {
        return $http
          .post('/account/loginBySms', {
            ...payload
          })
          .then(res => {
            commit('user', res)
            return res
          })
      }
    },
    loginByPassword({ commit }, payload) {
      if (!payload) {
        return Promise.reject('参数错误')
      } else if (!payload.phone) {
        return Promise.reject('手机号码不能为空')
      } else if (payload.phone.length !== 11) {
        return Promise.reject('请输入11位手机号码')
      } else if (!payload.password) {
        return Promise.reject('密码不能为空')
      } else if (payload.password.length < 6 || payload.password.length > 24) {
        return Promise.reject('密码格式不正确')
      } else {
        return $http
          .post('/account/loginByPassword', {
            ...payload
          })
          .then(res => {
            commit('user', res)
            return res
          })
      }
    },
    loginByWeixin({}) {
      return Megalo.login()
        .then(({ code }) => {
          return $http.get('/weixin/code', { params: { code } })
        })
        .then(({ unionId }) => {
          return $http.post('/account/loginByWeixin', { unionId })
        })
        .then(res => {
          commit('user', res)
          return res
        })
    },
    refreshUserInfo({ getters, commit }) {
      if (getters.isLogin && getters.token) {
        return $http.get('/account/refreshUserInfo').then(res => {
          commit('user', res)
          return res
        })
      }
    },
    getSmsCode({}, phone) {
      if (!phone || phone.length !== 11) {
        return Promise.reject('手机号格式不正确')
      } else {
        return $http.post('/account/getSms', { phone })
      }
    },
    logout({ commit }) {
      commit('user', {})
      Megalo.clearStorage()
    },
    registerUser({ commit }, payload) {
      if (!payload) {
        return Promise.reject('参数错误')
      } else if (!payload.phone) {
        return Promise.reject('手机号码不能为空')
      } else if (payload.phone.length !== 11) {
        return Promise.reject('请输入11位手机号码')
      } else if (!payload.sms) {
        return Promise.reject('验证码不能为空')
      } else if (payload.sms.length !== 4) {
        return Promise.reject('验证码格式不正确')
      } else if (!payload.password) {
        return Promise.reject('密码不能为空')
      } else if (payload.password.length < 6 || payload.password.length > 24) {
        return Promise.reject('密码格式不正确')
      } else if (payload.password !== payload.password2) {
        return Promise.reject('两次输入的密码不一致')
      } else {
        return $http.post('/account/register', payload).then(res => {
          commit('user', res)
          return res
        })
      }
    },
    updateUser({ getters }, payload) {
      if (!getters.isLogin) {
        return Promise.reject('当前用户未登录')
      } else {
        return $http.put(`/user/${getters.userId}`, payload)
      }
    }
  }
}
