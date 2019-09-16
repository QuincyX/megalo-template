import Axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
Axios.defaults.adapter = mpAdapter

const isDev = process.env.NODE_ENV === 'development'
const axios = Axios.create()

axios.defaults.baseURL = process.env.VUE_APP_BASEURL + '/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = false

axios.interceptors.request.use(
  option => {
    if (option.url.slice(0, 4) === 'http') {
      option.url = option.url
    } else {
      if (option.method == 'post' && $store.getters.token()) {
        option.data = {
          userToken: $store.getters.token(),
          ...option.data
        }
      }
    }
    if (option.data) {
      if (option.data.totalPage || option.data.totalPage === 0) {
        option.data.totalPage = undefined
      }
      if (option.data.totalRecord || option.data.totalRecord === 0) {
        option.data.totalRecord = undefined
      }
    }
    return option
  },
  err => {
    console.log('error')
    console.log(err)
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.data.code && response.data.code != 40001) {
      printError(response)
      warning(response.data.message)
      return Promise.reject(response.data)
    } else {
      if (response.data.data && response.data.data.pageSize) {
        let finished = false
        if (response.data.data.totalPage == 0) {
          finished = true
        } else if (response.data.data.totalPage == response.data.data.pageNo) {
          finished = true
        }
        printList(response, finished)
        return Promise.resolve({
          page: {
            pageNum: response.data.data.pageNo,
            pageSize: response.data.data.pageSize,
            totalPage: response.data.data.totalPage,
            totalRecord: response.data.data.totalRecord,
            finished: finished
          },
          list: response.data.data.results || [],
          other: response.data.data.other
        })
      } else {
        printData(response)
        return Promise.resolve(response.data.data || response.data)
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios

const rainbow = [
  'color: #e74c3c',
  'color: #e67e22',
  'color: #f1c40f',
  'color: #2ecc71',
  'color: #1abc9c',
  'color: #3498db',
  'color: #9b59b6',
  'color: #333'
]
const print = val => {
  console.log('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val, ...rainbow)
}
const printColor = val => {
  console.log(
    '%c' + val,
    'background-color: #e67e22;color:#fff;padding:5px 10px'
  )
}
const printGradientRed = val => {
  console.log(
    '%c' + val,
    'background:linear-gradient(to right,#ff7f50, #ff6b81);color:#fff;padding:5px 10px'
  )
}
const printRed = val => {
  console.log(
    '%c' + val,
    'background-color: #ff4757;color:#fff;padding:5px 10px'
  )
}
const printYellow = val => {
  console.log(
    '%c' + val,
    'background-color: #ffa502;color:#fff;padding:5px 10px'
  )
}
const printBlue = val => {
  console.log(
    '%c' + val,
    'background-color: #1e90ff;color:#fff;padding:5px 10px'
  )
}
const printGreen = val => {
  console.log(
    '%c' + val,
    'background-color: #2ed573;color:#fff;padding:5px 10px'
  )
}
const groupStart = val => {
  let cord = []
  while (cord.length < 7) {
    let n = Math.floor(Math.random() * 7)
    if (!cord.includes(rainbow[n])) {
      cord.push(rainbow[n])
    }
  }
  console.groupCollapsed(
    '%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val,
    ...cord,
    'color: #333'
  )
}
const groupStartError = val => {
  console.groupCollapsed('%cerror >>>>>>>>>>>>>>> ' + val, 'color: #e74c3c')
}
const printError = response => {
  if (isDev) {
    groupStartError(
      response.config.method.toUpperCase() + ' ' + response.config.url
    )
    if (response.config.data) {
      printBlue('request payload')
      console.log(JSON.parse(response.config.data))
    }
    printGradientRed('error message: ' + response.data.message)
    console.groupEnd()
  }
}
const printList = (response, finished) => {
  if (isDev) {
    groupStart(response.config.method.toUpperCase() + ' ' + response.config.url)
    if (response.config.params) {
      console.log('%c↓↓↓↓↓↓ query params', 'color: #e67e22')
      console.log(response.config.params)
    }
    if (response.config.data) {
      printBlue('request payload')
      console.log(JSON.parse(response.config.data))
    }
    printYellow('response other')
    console.log(response.data.data.other)
    printYellow('response page')
    console.log({
      pageNum: response.data.data.pageNo,
      pageSize: response.data.data.pageSize,
      totalPage: response.data.data.totalPage,
      totalRecord: response.data.data.totalRecord,
      finished: finished
    })
    printYellow('response list')
    console.table(response.data.data.results)
    if (response.data.message) {
      printGradientRed('response message: ' + response.data.message)
    }
    console.groupEnd()
  }
}
const printData = response => {
  if (isDev) {
    groupStart(response.config.method.toUpperCase() + ' ' + response.config.url)
    if (response.config.params) {
      console.log('%c↓↓↓↓↓↓ query params', 'color: #e67e22')
      console.log(response.config.params)
    }
    if (response.config.data) {
      printBlue('request payload')
      console.log(JSON.parse(response.config.data))
    }
    if (response.data && response.data.data) {
      printColor('response data')
      console.log(response.data.data)
    } else {
      printColor('response data')
      console.log(response.data)
    }
    if (response.data.message) {
      printGradientRed('response message' + response.data.message)
    }
    console.groupEnd()
  }
}
