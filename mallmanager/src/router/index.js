import Vue from 'vue'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import User from '@/components/users/users'
import Rights from '@/components/rights/rights'
import Role from '@/components/rights/role'
import Goodslist from '@/components/goods/goodslist'
import GoodsAdd from '@/components/goods/goodsadd.vue'
import GoodsCate from '@/components/goods/goodscate.vue'
import GoodsPara from '@/components/goods/cateparams.vue'
import Reoports from '@/components/reports/reports.vue'
import Order from '@/components/order/order.vue'
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
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goodslist
        },
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: GoodsAdd
        },
        {
          name: 'params',
          path: '/params',
          component: GoodsPara
        },
        {
          name: 'categories',
          path: '/categories',
          component: GoodsCate
        },
        {
          name: 'orders',
          path: '/orders',
          component: Order
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reoports
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
      router.push({ name: 'login', params: { type: 1 } })
    } else {
      next()
    }
  }
})
export default router
