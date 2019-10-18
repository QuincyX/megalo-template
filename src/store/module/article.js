import $http from '@/plugin/axios'

export default {
  state: {
    articleList: [],
    articleDetail: {}
  },
  getters: {
    articleList: state => state.articleList,
    articleDetail: state => state.articleDetail
  },
  mutations: {
    articleList: (state, payload) => {
      state.articleList = payload
    },
    articleDetail: (state, payload) => {
      state.articleDetail = payload
    }
  },
  actions: {
    async getArticleList({ commit }, params) {
      return $http.get('/article', { params }).then(res => {
        commit('articleList', res.list)
        return res
      })
    },
    async getArticleDetail({ commit }, id) {
      if (!id) {
        return Promise.reject('参数错误')
      } else {
        return $http.get(`/article/${id}`).then(res => {
          commit('articleDetail', res)
          return res
        })
      }
    }
  }
}
