<template>
  <div class="avatar">
    <figure class="image is-32x32">
      <img :src="`https://avatars.dicebear.com/api/bottts/${username}.svg`" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: "avatar"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";
.avatar {
  padding: 0 0.5em;
  display: flex;
  align-items: center;

  .image {
    border-radius: 50%;
    background-color: darken($dark, 5%);
  }
}
</style>
