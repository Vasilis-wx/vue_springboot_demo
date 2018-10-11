import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
    // /*, {
    //   path: '/home',
    //   name: '首页',
    //   component: Home,
    //   hidden: true,
    //   meta: {
    //     requireAuth: true
    //   }
    // }*/
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
