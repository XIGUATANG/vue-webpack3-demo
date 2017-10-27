import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import(/* webpackChunkName: "index" */  '../components/HelloWorld')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})
