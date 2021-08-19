/*
主入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

new Vue({
  el: '#app',
  render: h => h(App),
  // 配置路由，多了<router-link>和<router-view>标签，每个组件对象都会增加$router属性和$route
  router
})
