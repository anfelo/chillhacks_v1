<template>
  <div :class="`column ${size}`">
    <nuxt-link v-if="item.url" :to="item.url">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="`/img/${item.img_url}`" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p class="has-text-left">
                <strong>{{ item.title }}</strong>
                <br />
                <small v-if="item.subtitle">{{ item.subtitle }}</small>
                <br />
              </p>
            </div>
          </div>
          <div class="media-right">
            <div v-for="tag in item.tags" :key="tag" class="tags">
              <span class="tag is-success">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </nuxt-link>
    <div class="box" v-if="!item.url">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="`/img/${item.img_url}`" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="has-text-left">
              <strong>{{ item.title }}</strong>
              <br />
              <small v-if="item.subtitle">{{ item.subtitle }}</small>
              <br />
            </p>
          </div>
        </div>
        <div class="media-right">
          <div v-for="tag in item.tags" :key="tag" class="tags">
            <span class="tag is-success">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    size: {
      type: String,
      default: ""
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";
.box {
  border-bottom: 4px solid $dark-grey;
  transition: all 0.2s ease;
  cursor: pointer;
}

.box:hover {
  border-bottom-color: $link;
  transform: translateY(-5px);
}
</style>
