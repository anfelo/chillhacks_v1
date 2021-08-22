<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-primary">
            Here goes some awesome headline
          </h1>
          <p class="subtitle">
            This is what Chillhacks is all about in a nutshell
          </p>
          <div class="buttons is-centered">
            <nuxt-link to="/courses" class="button is-success is-large">
              <span class="icon">
                <i class="fas fa-arrow-right"></i>
              </span>
              <span>Explore Courses</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <AppSectionDivider theme="is-info">
      <AppSubjectsList theme="is-info" />
      <AppCoursesList
        theme="is-info"
        title="⚡ Recently Added"
        subtitle="Level up your coding skills"
      />
    </AppSectionDivider>
  </div>
</template>

<script lang="ts">
import AppCoursesList from "@/components/AppCoursesList.vue";
import AppSubjectsList from "@/components/AppSubjectsList.vue";
import AppSectionDivider from "@/components/AppSectionDivider.vue";

export default {
  async asyncData({ store }) {
    await store.dispatch("getCoursesData");
  },
  components: {
    AppCoursesList,
    AppSubjectsList,
    AppSectionDivider
  }
};
</script>

<style lang="scss" scoped></style>
