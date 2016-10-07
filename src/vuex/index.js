import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import topics from './modules/topics'
// import createLogger from 'vuex/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    topics
  },
  strict: debug,
  plugins: []
  // plugins: debug ? [createLogger()] : []
})
