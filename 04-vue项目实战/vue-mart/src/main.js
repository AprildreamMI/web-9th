import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './cube-ui'

// 拦截器
import interceptor from './interceptor'

Vue.config.productionTip = false

// 执行拦截器初始化
// axios 的全局配置
interceptor()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
