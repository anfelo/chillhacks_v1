<template>
  <div>
    <AppSectionDivider theme="is-info">
      <AppCoursesList
        theme="is-info"
        title="⚡ Recently Added"
        subtitle="Level up your coding skills"
      />
    </AppSectionDivider>

    <AppCoursesList
      v-for="subject in subjects"
      :key="subject.id"
      :theme="`${isDark ? 'is-dark' : ''}`"
      :filterby="subject.id"
      :title="subject.title"
      :img="subject.img"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppSectionDivider from "@/components/AppSectionDivider.vue";
import AppCoursesList from "@/components/AppCoursesList.vue";

export default {
  components: {
    AppCoursesList,
    AppSectionDivider
  },
  props: {
    isDark: Boolean
  },
  async asyncData({ store }) {
    await store.dispatch("getCoursesData");
  },
  computed: {
    ...mapState(["subjects"])
  }
};
</script>

<style lang="scss" scoped></style>
