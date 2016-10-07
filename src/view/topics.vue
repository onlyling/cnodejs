<template>
  <div>
    <div class="page-group" :class="{'with-panel-left-reveal': openMenu}">
        <div class="page page-current">
          <!-- 标题栏 -->
          <header class="bar bar-nav">
              <a class="icon icon-menu pull-left" v-on:click="toggleMenu"></a>
              <h1 class="title">{{title}}</h1>
          </header>

          <!-- 这里是页面内容区 -->
          <div class="content">
          
              <div class="card" v-for="item in list">
                <div class="card-content" v-on:click="jump(item.id)">
                  <div class="list-block media-list">
                    <ul>
                      <li class="item-content">
                        <div class="item-media">
                          <img :src="item.author.avatar_url" width="40">
                        </div>
                        <div class="item-inner">
                          <div class="item-title-row">
                            <div class="item-title"><span class="title-icon" :class="item.tab">{{item.tab | getTabStr(item.good, item.top)}}</span>{{item.title}}</div>
                          </div>
                          <div class="item-subtitle">{{item.author.loginname}}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card-footer">
                  <span>{{item.create_at | getDate}}</span>
                  <span>{{item.reply_count}} / {{item.visit_count}}</span>
                </div>
              </div>

              <div class="content-block">
                <p><a class="button button-fill" v-on:click="getData">加载更多</a></p>
              </div>

          </div>
      </div>
      <div class="panel panel-left panel-reveal theme-dark">
        <div class="content-block">
          <p>这是一个侧栏</p>
          <p>你可以在这里放用户设置页面</p>
          <p><a v-on:click="toggleMenu">关闭</a></p>
        </div>
        <div class="list-block contacts-block">
          <div class="list-group">
            <ul>
              <li v-for="item in menu">
                <div class="item-content" v-on:click="changeChannel(item)">
                  <div class="item-inner">
                    <div class="item-title">{{item.text}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import api from '../api'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        list: [],
        openMenu: false,
        title: '全部',
        query: 'all',
        page: 1,
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
    },
    mounted () {
      this.getData()
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
        this.title = obj.text
        this.query = obj.query
        this.page = 1
        this.toggleMenu()
        this.getData()
      },
      jump (id) {
        this.openMenu = false
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
