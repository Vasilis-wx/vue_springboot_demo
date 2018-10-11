// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './components/SvgIcon/index.js' // icon
import 'element-ui/lib/theme-chalk/index.css'

import {initMenu, initAllMenu, getWindowClientWH, getImgUrl} from './utils/utils'
import './utils/filter_utils'

import '@/components/dynamic-form'

import i18n from './lang' // Internationalization

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

import {getRequest, getRequestUrl, postRequest, deleteRequest, putRequest} from './utils/request'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import '@/utils/directive'

import Icon from 'vue2-svg-icon/Icon.vue'
Vue.component('icon', Icon)

NProgress.configure({ showSpinner: false })// NProgress Configuration

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest
Vue.prototype.getRequestUrl = getRequestUrl
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

Vue.prototype.getWindowClientWH = getWindowClientWH
Vue.prototype.getImgUrl = getImgUrl

/* 登录前拦截 **/
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.name === 'Login') {
    next()
    return
  }
  var name = store.state.login.user.name
  if (!name || name === '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      next({path: '/', query: {redirect: to.path}})
    } else {
      next()
    }
  } else {
    if (to.meta.index) {
      store.commit('selectHeader', {
        headerIndex: to.meta.index,
        type: 'selectTagView'
      })
    } else {
      initMenu(router, store, '', true)
    }
    // 初始化所有路由
    initAllMenu(router, store)
    next()
  }
  NProgress.done() // finish progress bar
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
})
