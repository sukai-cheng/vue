//模块：配置路由

//模块化路由的用法
import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入要渲染的组件
import List from '../components/list/list.vue'
import Bar from '../components/bar/bar.vue'
import Foo from '../components/foo/foo.vue'
import Add from '../components/list/add.vue'
import Edit from '../components/list/edit.vue'

const routes = [
  {name: 'heroes', path: '/heroes', component: List},
  {name: 'bar', path: '/bar', component: Bar},
  {name: 'foo', path: '/foo', component: Foo},
  {name: 'add', path: '/add', component: Add},
  {name: 'edit', path: '/edit/:id', component: Edit}
]

/*实例化路由*/
const router = new VueRouter({
  //全局设置激活routerlink的类名
  linkExactActiveClass:'active',
  routes
})

export default router

