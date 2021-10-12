<template>
  <transition name="fade">
    <div v-if="isActive" :class="`modal ${isActive ? 'is-active' : ''}`">
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
  </transition>
</template>

<script>
export default {
  props: {
    isActive: Boolean
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
