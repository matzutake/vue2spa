import Vuex from 'vuex'
import Vue from 'vue'

// Modules
import auth from '@/store/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth
  }
})

export default store
