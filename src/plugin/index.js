import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import tui from '@/plugin/tui'
import store from '@/plugin/store'
import router from '@/plugin/router'
import filter from '@/plugin/filter'
import globalFunction from '@/plugin/globalFunction'
import { globalMixin } from '@/utils/mixin'
import axios from '@/plugin/axios'

// Vue.mixin(globalMixin)
import '@/style/iconfont/index.less'

Vue.use(VHtmlPlugin)
Vue.use(tui)
Vue.use(store)
Vue.use(router)
Vue.use(filter)
Vue.use(globalFunction)

// 挂载 Ajax 对象
Vue.prototype.$http = axios
