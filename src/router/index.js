import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Play from '../components/playlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    }
  ]
})
