import Vue from 'vue'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import User from '@/components/users/users'
import Rights from '@/components/rights/rights'
import Role from '@/components/rights/role'
import Router from 'vue-router'
import Message from "element-ui/packages/message/src/main";

Vue.use(Router)


const router = new Router({
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
          name: 'roles',
          path: '/roles',
          component: Role
        }
      ]
    },

  ]
})
const originalPush = Router.prototype.push

// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

//路由守卫 在路由配置生效之前执行

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('回到登录页')
      // this.$router.push({name:'login'}) 只能在vue组件使用 this.$router是路由对象
      // debugger
      router.push({name: 'login',params:{ type:1 }})
    } else {
      next()
    }
  }
})
export default router
