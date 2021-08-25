<template>
  <div class="lesson-container">
    <h1 class="title">{{ currentLesson.title }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "course",
  async asyncData({ params, store }) {
    const lessonSlug = params.lesson;
    const courseSlug = params.slug;
    await store.dispatch("getLessonData", {
      course: courseSlug,
      lesson: lessonSlug
    });
    return { lessonSlug };
  },
  computed: {
    ...mapState(["currentLesson"])
  }
};
</script>

<style lang="scss" scoped>
.lesson-container {
  width: 100%;
  padding: 1rem;
}
</style>
