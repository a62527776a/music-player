import Vue from 'vue'
import Vuex from 'vuex'
import process from './process'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    process
  }
})
