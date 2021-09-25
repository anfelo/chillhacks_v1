<template>
  <div :class="`column ${size}`">
    <nuxt-link :to="item.url">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="`/img/${item.img}`" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ item.title }}</strong>
                <br />
                <small>{{ item.subtitle }}</small>
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
