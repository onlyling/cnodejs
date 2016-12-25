<template>
  <div class="page-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ms-pages'
  }
</script>
<style>
  .page-group { z-index: 2000 }
</style>