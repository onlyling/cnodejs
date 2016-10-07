// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import routes from './routes'
import filter from './filter'
import vuex from './vuex'

Vue.use(VueRouter)
Vue.use(VueResource)

// Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))
for (let k in filter) {
  Vue.filter(k, filter[k])
}

const router = new VueRouter({
  routes // short for routes: routes
})

new Vue({
  router,
  store: vuex,
  render: h => h(App)
}).$mount('#app')
