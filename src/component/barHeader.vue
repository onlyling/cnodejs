<template>
  <header class="bar bar-nav">
    <a class="icon icon-left pull-left" v-if="back" @click="() => {$router.go(-1)}"></a>
    <slot name="left"></slot>
    <slot name="right"></slot>
    <h1 class="title" v-text="title"></h1>
  </header>
</template>
<script>
  export default {
    name: 'ms-bar-header',
    props: {
      title: String,
      back: Boolean
    }
  }
</script>