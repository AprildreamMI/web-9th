import Vue from 'vue'
import Vuex from 'vuex'
import A from './A'
import B from './B'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    A,
    B
  }
})
