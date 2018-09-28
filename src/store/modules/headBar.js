import {initMenu} from '../../utils/utils'
import router from '../../router'
import store from '../index'

const login = {
  state: {
    headerIndex: window.localStorage.getItem('headerIndex') == null ? 1 : window.localStorage.getItem('headerIndex')
  },
  mutations: {
    selectHeader (state, headerIndex) {
      const change = headerIndex === state.headerIndex

      state.headerIndex = headerIndex
      window.localStorage.setItem('headerIndex', headerIndex)
      initMenu(router, store, 'selectHeader', change)
    },
    initIndex (state) {
      state.headerIndex = 1
      window.localStorage.setItem('headerIndex', 1)
    }
  },
  actions: {}
}

export default login
