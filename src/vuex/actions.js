import * as types from './mutation-types'

export const updateTopic = ({ commit }, topic) => {
  commit(types.SET_TOPICS, topic)
}
