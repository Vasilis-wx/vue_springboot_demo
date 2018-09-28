import { getRequest } from './request'
// import {Message} from 'element-ui'
// import ErrorPage from '@/views/errorPage/404'
import notFoundRouterMap from '@/router/notFoundRouterMap'

export const initMenu = (router, store, type, change) => {
  if (store.state.login.routes.length > 0 && change) {
    return
    // store.state.login.routes = []
  }
  getRequest('/menu.json').then(resp => {
    if (resp && resp.status === 200) {
      var headerIndex = store.state.headBar.headerIndex
      var fmtRoutes = formatRoutes(resp.data[headerIndex - 1].routers)
      store.commit('initMenu', fmtRoutes)
      if (type === 'selectHeader') {
        router.replace({ path: fmtRoutes[0].children[0].path })
      }
    }
  })
}

export const initAllMenu = (router, store, type) => {
  if (store.state.login.routes.length > 0) {
    return
  }
  getRequest('/menu.json?33').then(resp => {
    if (resp && resp.status === 200) {
      for (let i = 0; i < resp.data.length; i++) {
        var fmtRoutes = formatRoutes(resp.data[i].routers)
        router.addRoutes(fmtRoutes)
      }
      router.addRoutes(notFoundRouterMap)
    }
  })
}

export const formatRoutes = (routes) => {
  let fmRoutes = []
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }
    let fmRouter = {
      path: path,
      component (resolve) {
        if (component.startsWith('Home')) {
          require(['../views/layout/' + component + '.vue'], resolve)
        } else if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sal')) {
          require(['../views/salary/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sys')) {
          require(['../views/system/' + component + '.vue'], resolve)
        } else if (component.startsWith('index')) {
          require(['../views/system/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}
