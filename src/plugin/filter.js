export default {
  install(Vue, option) {
    Vue.filter('formatDate', val => {
      if (val) {
        if (typeof val === 'string') {
          val = val.replace(/-/g, '/')
        }
        let date = new Date(val)
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() < 9
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          '-' +
          (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
        )
      } else {
        return '-'
      }
    })
    Vue.filter('formatTime', val => {
      if (val) {
        let theTime = parseInt(val)
        let theTime1 = 0
        let theTime2 = 0
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60)
            theTime1 = parseInt(theTime1 % 60)
          }
        }
        let result = '' + parseInt(theTime) + '秒'
        if (theTime1 > 0) {
          result = '' + parseInt(theTime1) + '分' + result
        }
        if (theTime2 > 0) {
          result = '' + parseInt(theTime2) + '小时' + result
        }
        return result
      } else {
        return '-'
      }
    })
    Vue.filter('formatFullDate', val => {
      if (val) {
        if (typeof val === 'string') {
          val = val.replace(/-/g, '/')
        }
        let date = new Date(val)
        let currentY = new Date().getFullYear()
        return (
          (date.getFullYear() === currentY ? '' : date.getFullYear() + '-') +
          (date.getMonth() < 9
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          '-' +
          (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
          ' ' +
          (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
          ':' +
          (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        )
      } else {
        return '-'
      }
    })
    Vue.filter('sliceString', (val, length = 12) => {
      if (val && val.length > length) {
        return val.slice(0, length) + '...'
      } else {
        return val
      }
    })
    Vue.filter('lockPhoneNumber', val => {
      if (val && val.length === 11) {
        return (val = val.substr(0, 3) + '****' + val.substr(-4, 4))
      } else {
        val
      }
    })
  }
}
