export default [{
  path: '/',
  redirect: {
    name: 'index'
  }
}, {
  path: '/index',
  name: 'index',
  component: resolve => require(['./view/index.vue'], resolve)
}, {
  path: '/login',
  name: 'login',
  component: resolve => require(['./view/login.vue'], resolve),
  meta: {
    goback: true
  }
}, {
  path: '/topics',
  name: 'topics',
  component: resolve => require(['./view/topics.vue'], resolve)
}, {
  path: '/topic/:id',
  name: 'topic',
  component: resolve => require(['./view/topic.vue'], resolve),
  meta: {
    goback: true
  }
}, {
  path: '*',
  name: '404',
  component: resolve => require(['./view/404.vue'], resolve)
}]
