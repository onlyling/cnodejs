<template>
  <header class="bar bar-nav">
    <slot name="left"></slot>
    <slot name="right"></slot>
    <h1 class="title" v-text="title"></h1>
  </header>
</template>
<script>
  export default {
    name: 'ms-bar-header',
    props: {
      title: String
    }
  }
</script>