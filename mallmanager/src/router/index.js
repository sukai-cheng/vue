import Vue from 'vue'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import User from '@/components/users/users'
import Rights from '@/components/rights/rights'
import Role from '@/components/rights/role'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: User
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'role',
          path: '/role',
          component: Role
        }
      ]
    },

  ]
})
