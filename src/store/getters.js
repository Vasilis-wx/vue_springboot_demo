const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  user: state => state.login.user,
  routes: state => state.login.routes,
  activeIndex: state => state.headBar.headerIndex + '',
  headMenu: state => state.headBar.headMenu,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
