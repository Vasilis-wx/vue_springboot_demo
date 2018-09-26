// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import {initMenu} from './utils/utils'
import './utils/filter_utils'

import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

import {getRequest, getRequestUrl, postRequest, deleteRequest, putRequest} from './utils/request'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest
Vue.prototype.getRequestUrl = getRequestUrl
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

/* 登录前拦截 **/
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
    return
  }
  var name = store.state.user.name
  if (name === '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      next({path: '/', query: {redirect: to.path}})
    } else {
      next()
    }
  } else {
    initMenu(router, store)
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
