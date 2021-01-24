/*导入对象*/
import Vue from 'vue'

import App from './App.vue'

//引入样式文件
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
new Vue({
  el: '#app',
  render: h => h(App)
})
