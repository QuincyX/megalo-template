/*
 * @Author: QuincyX (likequincy@outlook.com)
 * @Date: 2019-10-18 14:16:23
 * @Last Modified by:   QuincyX
 * @Last Modified time: 2019-10-18 14:16:23
 */
import Axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import $store from '@/store/index'
Axios.defaults.adapter = mpAdapter
const isDev = process.env.NODE_ENV === 'development'
const axios = Axios.create()

axios.defaults.baseURL = process.env.VUE_APP_BASEURL + '/api/v1/'
axios.defaults.headers.common['X-Powered-By'] = 'likequincy@outlook.com'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Expose-Headers'] = 'x-refresh-token'
axios.defaults.withCredentials = false

axios.interceptors.request.use(
  option => {
    if (option.url.slice(0, 4) === 'http') {
      option.url = option.url
    } else {
      if ($store.getters.token) {
        option.headers['x-q-token'] = $store.getters.token
      }
    }
    if (option.data) {
      delete option.data.totalPage
      delete option.data.total
      delete option.data.finished
    }
    if (option.params) {
      delete option.params.totalPage
      delete option.params.total
      delete option.params.finished
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
    if (response.data.code && response.data.code != 1) {
      printError(response)
      return Promise.reject(response.data)
    } else {
      if (response.data.data && response.data.data.pageSize) {
        let finished =
          response.data.data.totalPage == 0 ||
          response.data.data.totalPage == response.data.data.pageNum
        printList(response, finished)
        return Promise.resolve({
          page: {
            pageNum: response.data.data.pageNum,
            pageSize: response.data.data.pageSize,
            totalPage: response.data.data.totalPage,
            totalNum: response.data.data.totalNum,
            finished
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

const printError = response => {
  if (isDev) {
    console.groupCollapsed(
      '%cerror >>>>>>>>>>>>>>> ' + response.config.url,
      'color: #e74c3c'
    )
    printReq('request query', response.config.params)
    printReq('request payload', response.config.data)
    printMessage(response)
    console.groupEnd()
  }
}
const printList = (response, finished) => {
  if (isDev) {
    groupStart(response.config.method.toUpperCase() + ' ' + response.config.url)
    printReq('request query', response.config.params)
    printReq('request payload', response.config.data)
    printRes('response page', {
      pageNum: response.data.page.pageNo,
      pageSize: response.data.page.pageSize,
      totalPage: response.data.page.totalPage,
      totalRecord: response.data.page.totalRecord,
      finished: finished
    })
    printRes('response list', response.data.results)
    printMessage(response)
    console.groupEnd()
  }
}
const printData = response => {
  if (isDev) {
    groupStart(response.config.method.toUpperCase() + ' ' + response.config.url)
    printReq('request query', response.config.params)
    printReq('request payload', response.config.data)
    printRes('response data', response.data.data || response.data)
    printMessage(response)
    console.groupEnd()
  }
}

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
const printMessage = response => {
  if (response && response.data && response.data.msg) {
    console.log(
      '%c' + 'response message: ' + response.data.msg,
      'background:linear-gradient(to right,#ff7f50, #ff6b81);color:#fff;padding:5px 10px'
    )
  }
}
const printRes = (type, val) => {
  if (val) {
    console.log(
      '%c' + (type || 'response data') + ': ',
      'background:linear-gradient(to right,#e67e22, #f3a158);color:#fff;padding:5px 10px'
    )
    console.log(val)
  }
}
const printReq = (type, val) => {
  if (val) {
    console.log(
      '%c' + (type || 'request payload') + ': ',
      'background:linear-gradient(to right,#1e90ff, #56acff);color:#fff;padding:5px 10px'
    )
    console.log(val)
  }
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
