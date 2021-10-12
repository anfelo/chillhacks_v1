<template>
  <div>
    <slot v-if="!currentUserLoading"></slot>
    <div v-if="currentUserLoading">
      <AppLoader />
    </div>
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

<style lang="scss" scoped></style>
