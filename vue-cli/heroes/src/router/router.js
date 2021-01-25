//模块：配置路由

//模块化路由的用法
import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入要渲染的组件
import List from '../components/list/list.vue'
import Bar from '../components/bar/bar.vue'
import Foo from '../components/foo/foo.vue'

const routes = [
  {name: 'heroes', path: '/heroes', component: List},
  {name: 'bar', path: '/bar', component: Bar},
  {name: 'foo', path: '/foo', component: Foo}
]

const router = new VueRouter({
  routes
})

export default router

