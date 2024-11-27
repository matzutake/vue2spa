import Vuex from 'vuex'
import Vue from 'vue'

// Modules
import auth from '@/store/auth'
import requests from '@/store/requests'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    requests
  }
})

export default store
