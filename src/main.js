import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// materializeCss
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
