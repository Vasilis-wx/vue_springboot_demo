import {initMenu} from '../../utils/utils'
import router from '../../router'
import store from '../index'

const login = {
  state: {
    headerIndex: window.localStorage.getItem('headerIndex') == null ? 1 : window.localStorage.getItem('headerIndex')
  },
  mutations: {
    selectHeader (state, obj) {
      const change = obj.headerIndex === state.headerIndex
      state.headerIndex = obj.headerIndex
      window.localStorage.setItem('headerIndex', obj.headerIndex)
      if (obj.type) {
        initMenu(router, store, obj.type, change)
      } else {
        initMenu(router, store, 'selectHeader', change)
      }
    },
    initIndex (state) {
      state.headerIndex = 1
      window.localStorage.setItem('headerIndex', 1)
    }
  },
  actions: {}
}

export default login
