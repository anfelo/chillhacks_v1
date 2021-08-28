<template>
  <div class="lesson-container">
    <h1 class="lesson-title title">{{ currentLesson.title }}</h1>
    <div class="lesson-content">
      <AppMarkdown :markdown="currentLesson.content" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppMarkdown from "@/components/AppMarkdown.vue";

export default {
  layout: "course",
  components: {
    AppMarkdown
  },
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
