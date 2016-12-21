<template>
  <ms-pages :class="{'with-panel-left-reveal': openMenu}">
    <ms-page>
      <!-- 标题栏 -->
      <header class="bar bar-nav">
        <a class="icon icon-menu pull-left" v-on:click="toggleMenu"></a>
        <h1 class="title">{{query | getTitleStr}}</h1>
      </header>

      <!-- 这里是页面内容区 -->
      <div class="content">

        <div class="list-block media-list">
          <ul>
            <ms-item v-for="item in list"
              :link="{name: 'topic', params: {id: item.id}}"
              :imgUrl="item.author.avatar_url"
              :title="item.title"
              :subtitle="item.author.loginname"
              :text="getContent(item.content)"
              ></ms-item>
          </ul>
        </div>

        <div class="content-block">
          <p><a class="button button-fill" @click="getData">加载更多</a></p>
        </div>

      </div>
    </ms-page>
    <div class="panel panel-left panel-reveal theme-dark">
      <div class="content-block">
        <p>这是一个侧栏</p>
        <p>你可以在这里放用户设置页面</p>
        <p><a v-on:click="toggleMenu">关闭</a></p>
      </div>
      <side-menu></side-menu>
    </div>
  </ms-pages>
</template>
<script>
  import api from '../api'
  import sideMenu from '../component/menu'
  import { mapActions } from 'vuex'
  import store from 'store'
  export default {
    components: {
      sideMenu
    },
    data () {
      return {
        list: [],
        openMenu: false,
        query: 'all',
        page: 1
      }
    },
    mounted () {
      var self = this
      const _local = store.get('list') || {}
      self.page = _local.page || 1
      self.list = _local.list || []
      self.query = self.$route.query.type
      if (!!!self.list.length) {
        self.getData()
      } else {
        self.list.forEach((obj) => {
          self.updateTopic(obj)
        })
      }
    },
    watch: {
      $route (to, from) {
        this.openMenu = false
        this.query = this.$route.query.type
        this.page = 1
        this.getData()
      }
    },
    methods: {
      ...mapActions([
        'updateTopic'
      ]),
      getData () {
        var self = this
        // 先把数组清空，为了能让列表回到顶部
        // 我也不清楚是哪边的问题
        if (self.page === 1) {
          self.list = []
        }
        api.getTopics({
          page: self.page,
          tab: self.query,
          limit: 20
        }).then(function (res) {
          self.list = self.list.concat(res.body.data)
          self.page++
          res.body.data.forEach((obj) => {
            self.updateTopic(obj)
          })
        })
      },
      toggleMenu () {
        this.openMenu = !this.openMenu
      },
      changeChannel (obj) {
        this.page = 1
        this.toggleMenu()
        this.$router.push({name: 'topics', query: {type: obj.query}})
      },
      getContent (html) {
        return html.replace(/<\/?[^>]*>/g,'').replace(/\s/g, '')
      },
      jump (id) {
        this.openMenu = false
        store.set('list', {
          page: this.page - 1,
          list: this.list
        })
        this.$router.push({name: 'topic', params: {id: id}})
      }
    }
  }
</script>
<style>
  .title-icon { display: inline-block; font-size: 12px; vertical-align: middle; margin-right: 2px; padding: 2px 4px; background-color: #e7e7e7; border-radius: 3px; color: #fff; }
  .title-icon.share { background-color: #1ABC9C; }
  .title-icon.ask { background-color: #3498DB; }

  .page-group .page-current{
    transition: transform .5s;
  }

  .page-group.with-panel-left-reveal .page-current{
    -webkit-transform: translate3d(12rem, 0, 0);
          transform: translate3d(12rem, 0, 0);
  }
   .page-group .panel {
    display: block;
   }

</style>
