import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/layout/Home'
import ErrorPage from '@/views/errorPage/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/home',
      name: '主页',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: ErrorPage,
      hidden: true,
      meta: {
        requireAuth: true
      }
    }
    //   ,
    //   children: [
    //     {
    //       path: '/chat',
    //       name: '消息',
    //       component: Chat,
    //       hidden: true,
    //       meta: {
    //         keepAlive: false,
    //         requireAuth: true
    //       }
    //     }
    //   ]
    // }
  ]
})
