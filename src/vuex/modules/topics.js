import * as types from '../mutation-types'
import store from 'store'

// initial state
const state = {
  data: {}
}

state.data = store.get('topics') || {}

// mutations
// 按照下面这个写法，会报错，只好拆开写咯
// 升级babel-runtime，神奇般的好了
const mutations = {
  [types.SET_TOPIC] (state, topic) {
    state.data[topic.id] = topic
    store.set('topics', state.data)
  },
  [types.GET_TOPIC] (state, id) {
    console.log(state.data[id])
    return state.data[id] || ''
  }
}

export default {
  state,
  mutations
}
