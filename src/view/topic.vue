<template>
  <div class="page-group">
    <header class="bar bar-nav">
      <a class="icon icon-left pull-left" v-on:click="back"></a>
      <a class="icon icon-refresh pull-right"></a>
      <h1 class="title">主题</h1>
    </header>
    <div class="content">
      <div class="content-block">
        发生地方都是
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>