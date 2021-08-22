<template>
  <section class="hero is-small is-info">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          ⚡ Recently Added
        </h1>
        <p class="subtitle">
          Level up your coding skills
        </p>
      </div>
      <div class="container">
        <AppCardList :items="recentCourses" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import AppCardList from "@/components/AppCardList.vue";

export default {
  components: {
    AppCardList
  },
  computed: {
    ...mapState(["courses", "subjects"]),
    recentCourses() {
      return this.courses.map(course => {
        return {
          ...course,
          subject: { ...this.subjects.find(sub => sub.id === course.subject) },
          subtitle: `${course.lessons} lessons`,
          tags: ["New!"]
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
