import {initMenu} from '../../utils/utils'
import router from '../../router'
import store from '../index'

const login = {
  state: {
    headerIndex: 1
  },
  mutations: {
    selectHeader (state, headerIndex) {
      state.headerIndex = headerIndex
      console.info(headerIndex)
      window.localStorage.setItem('headerIndex', headerIndex)
      initMenu(router, store)
    }
  },
  actions: {}
}

export default login
