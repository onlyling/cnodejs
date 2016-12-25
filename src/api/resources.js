import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.root = 'https://cnodejs.org/api/v1/'

// Vue.http.interceptors.push({
//   request (request) {
//     // 这里对请求体进行处理
//     request.url += ((request.url.indexOf('?') >= 0) ? '&' : '?') + '_time=' + (new Date()).getTime()
//     return request
//   },
//   response (response) {
//     // 这里可以对响应的结果进行处理
//     return response
//   }
// })

Vue.http.interceptors.push((request, next) => {
  request.url += ((request.url.indexOf('?') >= 0) ? '&' : '?') + '_time=' + (new Date()).getTime()
  next()
})

export const loginResource = Vue.resource('accesstoken')

export const userResource = (user) => {
  return Vue.resource('user/' + user)
}

export const getTopics = Vue.resource('topics')

export const getTopic = Vue.resource('topic/{id}')
