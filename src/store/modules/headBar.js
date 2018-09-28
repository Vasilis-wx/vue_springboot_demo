const login = {
  state: {
    headerIndex: window.localStorage.getItem('headerIndex' || '[]') == null ? 1 : window.localStorage.getItem('headerIndex' || '[]'),
    routes: []
  },
  mutations: {
    selectHeader (state, headerIndex) {
      state.headerIndex = headerIndex
      window.localStorage.setItem('headerIndex', headerIndex)
    }
  },
  actions: {}
}

export default login
