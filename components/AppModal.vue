<template>
  <div :class="`modal ${isActive ? 'is-active' : ''}`">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="head"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="content"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="actions"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  }
};
</script>

<style lang="scss" scoped></style>
