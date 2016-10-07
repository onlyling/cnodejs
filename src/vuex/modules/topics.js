import * as types from '../mutation-types'

// initial state
const state = {
  data: {}
}

// mutations
// 按照下面这个写法，会报错，只好拆开写咯
// 升级babel-runtime，神奇般的好了
const mutations = {
  [types.SET_TOPICS] (state, topic) {
    state.data[topic.id] = topic
  }
}

export default {
  state,
  mutations
}
