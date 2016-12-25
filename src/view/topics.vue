<template>
  <ms-pages :class="{'with-panel-left-reveal': openMenu}">
    <ms-page>
      <!-- 标题栏 -->
      <ms-bar-header :title="getTitleStr(query)">
        <a slot="left" class="icon icon-menu pull-left" @click="toggleMenu"></a>
      </ms-bar-header>

      <!-- 这里是页面内容区 -->
      <div class="content" id="list">

        <div class="list-block media-list">
          <ul>
            <ms-item v-for="item in list"
              :link="{name: 'topic', params: {id: item.id}}"
              :imgurl="item.author.avatar_url"
              :title="item.title"
              :subtitle="getSubTitle(item.author.loginname,item.reply_count, item.visit_count)"
              :type="getTabStr(item.tab, item.good, item.top)"
              :typeclass="getTabClass(item.tab, item.good, item.top)"
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
        <p><a @click="toggleMenu">关闭</a></p>
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
      let scrollTop = store.get('scrollTop')
      // scrollTop 可能是 0 也可能是 undefined
      scrollTop = !!scrollTop ? scrollTop : (scrollTop == 0) ? 0 : -1
      if (scrollTop >= 0) {
        self.page = store.get('page')
        self.query = store.get('query')
        self.list = store.get('list')
        self.$nextTick(() => {
          self.$el.querySelector('#list').scrollTop = scrollTop
        })
      } else {
        self.page = 1
        self.query = self.$route.query.type
        self.getData()
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
    beforeRouteLeave (to, from, next) {

      var self = this

      // 路由离开之前记录一些数据
      if (to.name === 'topic') {

        store.set('query', self.query || 'all')
        store.set('list', self.list)
        store.set('page', self.page)
        store.set('scrollTop', self.$el.querySelector('#list').scrollTop)

      }
      next()
    },
    beforeRouteEnter (to, from, next) {
      if (from.name !== 'topic') {
        store.remove('tab')
        store.remove('list')
        store.remove('page')
        store.remove('scrollTop')
      }
      next()
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
      },
      getTabStr (tab, good, top){
        let str = ''
        if (top) {
          str = '置顶'
        } else if (good) {
          str = '精华'
        } else {
          switch (tab) {
            case 'share':
              str = '分享'
              break
            case 'ask':
              str = '问答'
              break
            case 'job':
              str = '招聘'
              break
            default:
              str = '暂无'
              break
          }
        }
        return str
      },
      getTabClass (tab, good, top) {
        if (top) {
          return 'top'
        }
        if (good) {
          return 'good'
        }
        return tab
      },
      getTitleStr (tab) {
        let str = ''
        switch (tab) {
          case 'share':
            str = '分享'
            break
          case 'ask':
            str = '问答'
            break
          case 'job':
            str = '招聘'
            break
          case 'good':
            str = '精华'
            break
          default:
            str = '全部'
            break
        }
        return str
      },
      getSubTitle (userName, r, v) {
        return userName + '<span class="pull-right">' + r + '/' + v + '</span>'
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
