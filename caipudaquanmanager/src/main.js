import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//添加全局样式
import "./assets/css/global.css"
//引入iconfont
import './assets/font/iconfont.css'
import './assets/font_ce/iconfont.css'
//导入axios  跨域请求
import axios from 'axios'
import Store from './store'



//给http下挂载axios
Vue.prototype.$http = axios
//挂载完后设置请求的初始信息 设置访问根路径
axios.defaults.baseURL = "http://localhost:9000"



Vue.config.productionTip = false

new Vue({
  router,
  Store,
  render: h => h(App)
}).$mount('#app')
