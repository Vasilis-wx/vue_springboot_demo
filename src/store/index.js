import Vue from 'vue'
import Vuex from 'vuex'

import tagsView from './modules/tagsView'
import login from './modules/login'
import headBar from './modules/headBar'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    tagsView,
    app,
    headBar
  },
  getters
})
