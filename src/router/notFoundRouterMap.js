import ErrorPage from '@/views/errorPage/404'

export default [
  {
    path: '/404',
    name: '404',
    component: ErrorPage,
    hidden: true
  },
  {
    path: '*',
    redirect: '/404'
  }
]
