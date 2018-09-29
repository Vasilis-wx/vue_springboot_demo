const getters = {
  sidebar: state => state.app.sidebar,
  user: state => state.login.user,
  routes: state => state.login.routes,
  activeIndex: state => state.headBar.headerIndex + '',
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
