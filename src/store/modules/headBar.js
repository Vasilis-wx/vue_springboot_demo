import {initMenu} from '../../utils/utils'
import router from '../../router'
import store from '../index'

const headBar = {
  state: {
    headMenu: [],
    headerIndex: window.localStorage.getItem('headerIndex') == null ? 1 : window.localStorage.getItem('headerIndex')
  },
  mutations: {
    selectHeader (state, {headerIndex = '', type = 'selectHeader'} = {}) {
      const change = headerIndex === state.headerIndex
      state.headerIndex = headerIndex
      window.localStorage.setItem('headerIndex', headerIndex)
      initMenu(router, store, type, change)
    },
    initIndex (state) {
      state.headerIndex = 1
      window.localStorage.setItem('headerIndex', 1)
    },
    initHeadMenu (state, menu) {
      state.headMenu = menu
    }
  },
  actions: {}
}

export default headBar
