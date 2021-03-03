//将来要导入的插件模块
import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install = function (Vue) {

  // 4. 添加实例方法
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'


  //在请求发起之前 设置头信息
  axios.interceptors.request.use(function (config) {
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    return config
  }, function (error) {
    //错误处理
    return Promise.reject(error)
  })

  //添加实例方法
  Vue.prototype.$http = axios

}

export default MyHttpServer
