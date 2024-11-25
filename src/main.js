import Vue from 'vue'
import App from '@/App.vue'

// Styles
import '@/assets/css/reset.css'
import '@/assets/css/main.css'

// Router
import router from '@/router'

// Vuex
import store from '@/store'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
