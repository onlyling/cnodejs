<template>

  <li>

    <router-link
      class="item-content"
      :to="link"
      :tag="!!link.name ? 'a' : 'div'"
      :class="{'item-link': !!link.name}"
      >
     
      <div class="item-media" v-if="!!imgUrl"><img :src="imgUrl" style="width: 4rem;"></div>

      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title" v-text="title"></div>
          <div class="item-after" v-text="after"></div>
        </div>
        <div class="item-subtitle" v-text="subtitle"></div>
        <div class="item-text" v-text="text"></div>
      </div>

    </router-link>

  </li>

</template>
<script>
  export default {
    name: 'ms-item',
    props: {
      link: Object,
      imgUrl: String,
      title: String,
      subtitle: String,
      after: String,
      text: String
    }
  }
</script>