// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import MyServerHttp from '../src/plugins/http';
import moment from 'moment'
/*回顾axios插件*/
// import axios from 'axios'
// Vue.prototype.$http = axios

/*把一个不是vue的第三方插件变成vue插件*/
Vue.use(MyServerHttp)
/* 使用element-ui */
Vue.use(ElementUI)
/* 我们现在是开发阶段 -> 上线阶段(生产阶段) */
/* 如果你的项目为生产环境则vue自带的调试信息需不需要输出 */
Vue.config.productionTip = false

//全局过滤器
Vue.filter('fmtDate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /* redner:()=>h(App) 将根组件放到组件中 */
  components: { App },
  /* <App></App> 把模版放到el所管理的视图中 */
  template: '<App/>'
})
