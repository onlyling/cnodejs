<template>
  <div class="page-group">
    <header class="bar bar-nav">
      <a class="icon icon-left pull-left" v-on:click="back"></a>
      <a class="icon icon-refresh pull-right"></a>
      <h1 class="title">主题</h1>
    </header>
    <div class="content bgfff">
      <div class="content-padded">
        <h2>{{topic.title}}</h2>
        <div class="markdown-body" v-html="topic.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
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
      self.topic = self.topics.data[self.id]
      console.log(self.topic)
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