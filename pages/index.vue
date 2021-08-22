<template>
  <div>
    <section class="hero is-large">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-primary">
            Here goes some awesome headline
          </h1>
          <p class="subtitle">
            This is what Chillhacks is all about in a nutshell
          </p>
          <div class="control has-icons-left">
            <input
              class="input is-primary is-large"
              type="text"
              placeholder="Search courses"
            />
            <span class="icon is-medium is-left">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
    <AppSubjectsList />
    <AppCoursesList />
  </div>
</template>

<script lang="ts">
import AppCoursesList from "@/components/AppCoursesList.vue";
import AppSubjectsList from "@/components/AppSubjectsList.vue";

export default {
  async asyncData({ store }) {
    await store.dispatch("getCoursesData");
  },
  components: {
    AppCoursesList,
    AppSubjectsList
  }
};
</script>

<style lang="scss" scoped></style>
