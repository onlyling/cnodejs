<template>
  <ms-pages>
    <ms-page>
      <ms-bar-header title="主题" :back="true"></ms-bar-header>
      <div class="content bgfff">
        <div class="content-padded">
          <h2>{{topic.title}}</h2>
          <div class="markdown-body" v-html="topic.content"></div>
        </div>
      </div>
    </ms-page>
  </ms-pages>
</template>
<script>
  import api from '../api'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        topic: '',
        id: ''
      }
    },
    mounted () {
      var self = this
      self.id = self.$route.params.id
      let topic = self.topics.data[self.id]
      if (!!!topic) {
        api.getTopic(self.id)
          .then((res) => {
            self.topic = res.body.data
          })
      } else {
        self.topic = topic
      }
    },
    computed: {
      ...mapState({
        topics: state => state.topics
      })
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="less">
  @import '../assets/github-markdown.css';

  .bgfff{ background-color: #fff;}
</style>