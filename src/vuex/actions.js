import * as types from './mutation-types'

export const updateTopic = ({ commit }, topic) => {
  commit(types.SET_TOPIC, topic)
}
