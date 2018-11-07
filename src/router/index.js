import Vue from 'vue'
import Router from 'vue-router'
import dbTable from '@/components/dbTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dbas'
    },
    {
      path: '/dbas',
      name: 'dbTable',
      component: dbTable
    }
  ]
})
