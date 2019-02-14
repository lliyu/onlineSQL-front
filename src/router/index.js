import Vue from 'vue'
import Router from 'vue-router'
import dbTable from '@/components/dbTable'
import download from '@/components/download'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/download'
    },
    {
      path: '/dbas',
      name: 'dbTable',
      component: dbTable
    },
    {
      path: '/download',
      name: 'download',
      component: download
    }
  ]
})
