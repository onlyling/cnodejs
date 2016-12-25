import * as types from './resources'

export default {
  doLogin (data) {
    return types.loginResource.save(data)
  },
  getUser (user) {
    return types.userResource(user).get()
  },

  getTopics (data) {
    return types.getTopics.get(data)
  },
  getTopic (id) {
    return types.getTopic.get({id})
  }
}
