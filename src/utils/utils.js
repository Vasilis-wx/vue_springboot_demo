import {getRequest} from './request'
// import {Message} from 'element-ui'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }
  getRequest('/menu.json').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initMenu', fmtRoutes)
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
          require(['../views/' + component + '.vue'], resolve)
        } else if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sal')) {
          require(['../views/salary/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sys')) {
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
