<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("auth/getCurrentUser");
  }
};
</script>

<style lang="scss" scoped></style>
