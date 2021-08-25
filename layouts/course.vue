<template>
  <div class="course-container">
    <div class="sidenav-container">
      <AppSideNavbar />
    </div>
    <main class="lesson-container">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import AppSideNavbar from "@/components/AppSideNavbar.vue";
export default {
  components: {
    AppSideNavbar
  }
};
</script>

<style lang="scss" scoped>
.course-container {
  display: flex;
}

.sidenav-container {
  width: 360px;
  height: 100vh;
  overflow: auto;
}

.lesson-container {
  flex: 1;
}
</style>
