<template>
  <div>
    <slot v-if="!currentUserLoading"></slot>
    <transition name="fade">
      <AppLoader v-if="currentUserLoading" />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppLoader from "@/components/AppLoader.vue";
export default {
  components: {
    AppLoader
  },
  created() {
    this.$store.dispatch("auth/getCurrentUser");
  },
  computed: {
    ...mapState("auth", {
      currentUserLoading: state => state.currentUserLoading
    })
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
