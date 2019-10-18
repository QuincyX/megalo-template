import App from './App'
import Vue from 'vue'
import '@/plugin/index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: [
      'pages/home/index',
      'pages/account/login',
      'pages/article/index',
      'pages/test/index'
    ],
    window: {
      navigationBarBackgroundColor: '#333',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: 'Megalo-sample',
      backgroundColor: '#eeeeee'
    },
    usingComponents: {
      'i-button': '/static/iview/button/index',
      'i-message': '/static/iview/message/index',
      'i-toast': '/static/iview/toast/index',
      'i-spin': '/static/iview/spin/index',
      'i-icon': '/static/iview/icon/index'
    },
    navigateToMiniProgramAppIdList: []
  }
}
