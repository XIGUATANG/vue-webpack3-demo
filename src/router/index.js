import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import(/* webpackChunkName: "index" */  '../components/HelloWorld')
const Loading = () => import(/* webpackChunkName: "loading" */  '../components/Loading')
const test = () => import(/* webpackChunkName: "test" */  '../components/test')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }, {
      path: '/Loading',
      name: 'Loading',
      component: Loading
    }, {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
