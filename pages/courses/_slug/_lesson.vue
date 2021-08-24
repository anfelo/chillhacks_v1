<template>
  <div>{{ lessonSlug }}</div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const lessonSlug = params.lesson;
    // await store.dispatch("getCourseData", slug);
    return { lessonSlug };
  }
};
</script>

<style lang="scss" scoped></style>
