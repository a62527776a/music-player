// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import common from './components/common/'
import baseService from './services/base.service'

import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
Vue.config.productionTip = false

Object.keys(common).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`v${name}`, common[key])
})

Vue.prototype.baseService = baseService

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
