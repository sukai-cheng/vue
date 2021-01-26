import Vue from 'vue'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
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
      name:'home',
      path: '/home',
      component: Home
    }
  ]
})
