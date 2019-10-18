export default {
  state: {
    msg: '',
    count: 0,
    randomColorList: [
      '#e74c3c',
      '#e67e22',
      '#f1c40f',
      '#1abc9c',
      '#2ecc71',
      '#3498db',
      '#9b59b6'
    ]
  },
  getters: {
    msg: state => state.msg,
    count: state => state.count,
    randomColor: state => () =>
      state.randomColorList[
        Math.round(Math.random() * (state.randomColorList.length - 1))
      ]
  },
  mutations: {
    msg: (state, payload) => {
      state.msg = payload
    },
    countPlus: state => {
      state.count++
    }
  },
  actions: {
    chooseImage(
      {},
      {
        sizeType = ['original', 'compressed'],
        sourceType = ['album', 'camera']
      }
    ) {
      return Megalo.chooseImage({
        count: 1,
        sizeType,
        sourceType
      })
        .then(fileList => {
          return Megalo.compressImage({
            src: fileList.tempFilePaths[0]
          }).catch(err => {
            return Promise.resolve({ tempFilePath: fileList.tempFilePaths[0] })
          })
        })
        .then(compressed => {
          return Megalo.uploadFile({
            url: process.env.VUE_APP_BASEURL + '/file/uploadImage',
            filePath: compressed.tempFilePath,
            name: 'file'
          })
        })
        .then(res => {
          const data = JSON.parse(res.data).data
          return data
        })
    }
  }
}
