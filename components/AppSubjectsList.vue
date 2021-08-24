<template>
  <section :class="`hero is-small ${theme}`">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          🧠 All Subjects
        </h1>
        <p class="subtitle">
          Find courses and practical resources for many tech subjects
        </p>
      </div>
      <div class="container">
        <AppCardList :items="coursesBySubject" />
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
  props: {
    theme: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["courses", "subjects"]),
    coursesBySubject() {
      const subjects = this.courses.map(course => course.subject);
      const subjectsSet = new Set(subjects);
      return [...subjectsSet].map(subject => {
        const coursesCount = this.courses.filter(
          course => course.subject === subject
        ).length;
        return {
          ...this.subjects.find(sub => sub.id === subject),
          subtitle: `${coursesCount} courses`,
          url: `/courses?subject=${subject}`
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
