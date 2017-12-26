import Loading from './components/load'
import LoadingView from './components/Loading.vue'


const LodaingPlugin = {
  LoadingView
}
const install = (Vue, opt = {}) => {
  Vue.component('Loading', LoadingView);
  Vue.prototype.$Loading = Loading
}


// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(LodaingPlugin, { install })