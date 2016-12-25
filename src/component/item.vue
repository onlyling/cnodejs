<template>

  <li>

    <router-link
      class="item-content"
      :to="link"
      :tag="!!link.name ? 'a' : 'div'"
      :class="{'item-link': !!link.name}"
      >
     
      <div class="item-media" v-if="!!imgurl"><img :src="imgurl" style="width: 2.2rem;"></div>

      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title" v-text="title"></div>
          <div class="item-after cnode-item-title" :class="typeclass" :subtitle="type"></div>
        </div>
        <div class="item-subtitle" v-html="subtitle"></div>
      </div>

    </router-link>

  </li>

</template>
<script>
  export default {
    name: 'ms-item',
    props: {
      link: Object,
      imgurl: String,
      title: String,
      subtitle: String,
      type: String,
      top: Boolean,
      text: String,
      typeclass: String
    }
  }
</script>
<style>
  /*.item-after.cnode-item-title{ max-height: auto }*/
  .cnode-item-title:before{ content: attr(subtitle); float: right; font-size: 12px; background-color: #0894ec; color: #fff; border-radius: 3px; height: 1rem; line-height: 1rem; padding: 0 .2rem;}
  .cnode-item-title.top:before{ background-color: #f6383a; }
  .cnode-item-title.good:before{ background-color: #4cd964; }
  .cnode-item-title.share:before{ background-color: #1abc9c; }
  .cnode-item-title.job:before{ background-color: #9b59b6; }
</style>