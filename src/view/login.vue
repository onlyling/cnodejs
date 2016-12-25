<template>
  <ms-pages>
    <ms-page>

      <ms-bar-header title="登录" :back="true"></ms-bar-header>

      <div class="content">
        
        <div class="content-block-title">Access Token</div>
        <div class="list-block">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input type="text" placeholder="Your Token" v-model="accesstoken">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="content-block">
          <div class="row">
            <div class="col-50"><a class="button button-big button-fill button-danger" @click="() => {$router.push({path: $route.query.redirect || '/'})}">返回</a></div>
            <div class="col-50"><a class="button button-big button-fill button-success" @click="login">登录</a></div>
          </div>
        </div>

      </div>

    </ms-page>
  </ms-pages>
</template>
<script>
  import api from '../api'
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        accesstoken: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    mounted() {
      if (this.user.userInfo.loginname) {
        this.goback()
      }
    },
    methods: {
      ...mapActions([
        'updateUserInfo'
      ]),
      goback () {
        this.$router.push({
          path: this.$route.query.redirect
        })
      },
      login () {

        var self = this

        if (!!!self.accesstoken) {
          alert('Token')
          return
        }

        api.doLogin({
          accesstoken: self.accesstoken
        }).then((res) => {

          let userInfo = res.body
          self.updateUserInfo(userInfo)
          this.goback()

        }, () => {
          alert('err')
        })

      }
    }
  }
</script>