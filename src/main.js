// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

 Vue.use(loading)

// import Loading from './components/load'

// Vue.prototype.$Loading = Loading

/* eslint-disable no-new */
window.app =new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
