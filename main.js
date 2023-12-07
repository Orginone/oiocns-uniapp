import App from './App'
import store from './store'
import base from './common/base'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
Vue.prototype.$getIndex = base.getIndex
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
const app = new Vue({
    store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif