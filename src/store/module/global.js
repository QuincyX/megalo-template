export default {
  state: {
    msg: '',
    count: 0
  },
  getters: {
    msg: state => state.msg,
    count: state => state.count
  },
  mutations: {
    msg: (state, payload) => {
      state.msg = payload
    },
    countPlus: state => {
      state.count++
    }
  },
  actions: {}
}
