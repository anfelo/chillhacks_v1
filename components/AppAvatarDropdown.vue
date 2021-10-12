<template>
  <div class="avatar">
    <figure class="image is-32x32 has-background-info">
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
.avatar {
  padding: 0 0.5em;
  display: flex;
  align-items: center;

  .image {
    border-radius: 50%;
  }
}
</style>
