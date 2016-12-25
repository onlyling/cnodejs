import store from 'store'

import * as types from '../mutation-types'

// initial state
const state = {
  userInfo: store.get('userInfo') || {}
}



// mutations
const mutations = {
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
    store.set('userInfo', userInfo)
  }
}

export default {
  state,
  mutations
}
