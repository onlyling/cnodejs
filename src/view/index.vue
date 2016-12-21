<template>
  <div class="index-logo-box">
    <img src="../assets/welcome.png" width="100%" class="index-logo">
  </div>
</template>
<script>
  export default {
    created () {
      setTimeout(() => {
        this.$router.push({name: 'topics', query: {type: 'all'}})
      }, 1500)
    }
  }
</script>

<style>
  .index-logo-box { position: relative; height: 100%; }
  .index-logo{ position: absolute; top: 50%; transform: translate(0,-50%);}
</style>
