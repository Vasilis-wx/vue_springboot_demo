import { getRequest } from './request'
// import {Message} from 'element-ui'
// import ErrorPage from '@/views/errorPage/404'
import notFoundRouterMap from '@/router/notFoundRouterMap'

/* ************ 加载所选headBar的路由存入store *******************/
// change时候切换了headBar
export const initMenu = (router, store, type, change) => {
  if (store.state.login.routes.length > 0 && change) {
    return
  }
  getRequest('/menu.json?' + Math.random(1)).then(resp => {
    if (resp && resp.status === 200) {
      // 初始化头部menu
      store.commit('initHeadMenu', resp.data)

      var headerIndex = store.state.headBar.headerIndex
      var fmtRoutes = formatRoutes(resp.data[headerIndex - 1].routers)

      // 初始化左边menu
      store.commit('initSiderBarMenu', fmtRoutes)
      // 点击headBar时打开对应首页
      if (type === 'selectHeader') {
        router.replace({ path: fmtRoutes[0].children[0].path })
      }
    }
  })
}

/* ************ 加载全部路由放入路由器 *************/
export const initAllMenu = (router, store) => {
  if (store.state.login.routes.length > 0) {
    return
  }
  getRequest('/menu.json?' + Math.random(1)).then(resp => {
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
        } else if (component.startsWith('Dash')) {
          require(['../views/dashboard/' + component + '.vue'], resolve)
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

export const getWindowClientWH = () => {
  let winWidth = 0
  let winHeight = 0
  // 获取窗口宽度
  if (window.innerWidth) {
    winWidth = window.innerWidth
  } else if ((document.body) && (document.body.clientWidth)) {
    winWidth = document.body.clientWidth
  }
  // 获取窗口高度
  if (window.innerHeight) {
    winHeight = window.innerHeight
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
  }
  // 通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight
    winWidth = document.documentElement.clientWidth
  }
  return {
    width: winWidth,
    height: winHeight
  }
}

export const getImgUrl = (url) => {
  return 'api/' + url
}
