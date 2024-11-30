import Vue from 'vue'
import App from '@/App.vue'

// Styles
import '@/assets/css/reset.css'
import '@/assets/css/main.css'

// Router
import router from '@/router'

// Vuex
import store from '@/store'

// Components
import MyButton from '@/components/UI/MyButton.vue'
import MyInput from '@/components/UI/MyInput.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MySearch from '@/components/UI/MySearch.vue'
import MyTextArea from '@/components/UI/MyTextArea.vue'

Vue.component('my-button', MyButton)
Vue.component('my-input', MyInput)
Vue.component('my-select', MySelect)
Vue.component('my-search', MySearch)
Vue.component('my-textarea', MyTextArea)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
