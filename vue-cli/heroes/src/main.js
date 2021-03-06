/*导入对象*/
import Vue from 'vue'
import router from './router/router.js'
import App from './App.vue'

//引入样式文件
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

//导包
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
