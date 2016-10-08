import * as types from '../mutation-types'

// initial state
const state = {
  data: {}
}

// mutations
// 按照下面这个写法，会报错，只好拆开写咯
// 升级babel-runtime，神奇般的好了
const mutations = {
  [types.SET_TOPIC] (state, topic) {
    state.data[topic.id] = topic
  },
  [types.GET_TOPIC] (state, id) {
    return state.data[id] || ''
  }
}

export default {
  state,
  mutations
}
