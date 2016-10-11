<template>
  <div class="list-block contacts-block">
    <div class="list-group">
      <ul>
        <li v-for="item in menu">
          <router-link :to="{name: 'topics', params: {type: item.query}}">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">{{item.text}}</div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        menu: [{
            text: '全部',
            query: 'all'
          }, {
            text: '精华',
            query: 'good'
          }, {
            text: '分享',
            query: 'share'
          }, {
            text: '问答',
            query: 'ask'
          }, {
            text: '招聘',
            query: 'job'
          }, {
            text: '分享',
            query: 'share'
          }]
        }
    }
  }
</script>