import $store from '@/store'

const isDev = process.env.NODE_ENV === 'development'
const baseURL = process.env.VUE_APP_BASEURL + '/api/'

Megalo.request.interceptors.before.use(
  option => {
    option.header = {
      'content-type': 'application/json;charset=utf-8'
    }
    if (option.method == 'post' && $store.getters.token) {
      option.data = {
        token: $store.getters.token,
        ...option.data
      }
    }
    if (option.url.slice(0, 4) === 'http') {
      option.url = option.url
    } else {
      option.url = baseURL + option.url
    }
    return option
  },
  err => {
    console.log('error')
    console.log(err)
    return Promise.reject(err)
  }
)
Megalo.request.interceptors.after.use(
  response => {
    if (response.data.code && response.data.code != 40001) {
      printError(response)
      forceLogout401(response.data.err)
      return Promise.reject(response.data)
    } else {
      if (response.data.data && response.data.data.pageSize) {
        printList(response)
        return Promise.resolve({
          page: {
            pageNo: response.data.data.pageNo,
            pageSize: response.data.data.pageSize,
            totalPage: response.data.data.totalPage,
            totalRecord: response.data.data.totalRecord
          },
          list: response.data.data.results
        })
      } else {
        printData(response)
        return Promise.resolve(response.data.data)
      }
    }
  },
  error => {
    if (error.response) {
      forceLogout401(error.response.status)
    }
    return Promise.reject(error)
  }
)

export default {
  get: (url, data) => {
    return Megalo.request({ method: 'get', url, data })
  },
  post: (url, data) => {
    return Megalo.request({ method: 'post', url, data })
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
const print = val => {
  console.log('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val, ...rainbow)
}
const groupStart = val => {
  console.group('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c ' + val, ...rainbow)
}
const printError = response => {
  if (isDev) {
    groupStart('出错了哦')
    console.log(
      '%cerror code: %c' + response.data.code,
      'color: #e74c3c',
      'color: #333'
    )
    console.log(
      '%cerror message: %c' + response.data.message,
      'color: #e74c3c',
      'color: #333'
    )
    console.groupEnd()
  }
}
const printList = response => {
  if (isDev) {
    print('request info')
    console.log('%c↓↓↓↓↓↓ response page', 'color: #3498db')
    console.log({
      pageNo: response.data.data.pageNo,
      pageSize: response.data.data.pageSize,
      totalPage: response.data.data.totalPage,
      totalRecord: response.data.data.totalRecord
    })
    console.log('%c↓↓↓↓↓↓ response list', 'color: #3498db')
    console.table(response.data.data.results)
    console.log('%c↓↓↓↓↓↓ response message', 'color: #3498db')
    console.log(response.data.message)
  }
}
const printData = response => {
  if (isDev) {
    print('request info')
    console.log('%c↓↓↓↓↓↓ response data', 'color: #3498db')
    console.log(response.data.data)
    console.log('%c↓↓↓↓↓↓ response message', 'color: #3498db')
    console.log(response.data.message)
  }
}
const forceLogout401 = code => {
  if (code == 401) {
    localStorage.clear()
    window.location.reload()
  }
}
