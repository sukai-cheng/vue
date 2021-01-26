// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* 我们现在是开发阶段 -> 上线阶段(生产阶段) */
/* 如果你的项目为生产环境则vue自带的调试信息需不需要输出 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /* redner:()=>h(App) 将根组件放到组件中 */
  components: { App },
  /* <App></App> 把模版放到el所管理的视图中 */
  template: '<App/>'
})
