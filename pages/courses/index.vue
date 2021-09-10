<template>
  <div>
    <AppSectionDivider theme="is-info">
      <AppCoursesList
        theme="is-info"
        title="⚡ Recently Added"
        subtitle="Level up your coding skills"
        :filterby="subjectExists(subjectQuery) ? subjectQuery : ''"
      />
    </AppSectionDivider>

    <AppCoursesList
      v-for="subject in filteredSubjects"
      :key="subject.id"
      :theme="`${isDark ? 'is-dark' : ''}`"
      :filterby="subject.id"
      :title="subject.title"
      :img="subject.img_url"
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
  async asyncData({ store, query }) {
    const subjectQuery = query.subject;
    await store.dispatch("getCoursesData");
    return { subjectQuery };
  },
  computed: {
    ...mapState(["subjects"]),
    filteredSubjects() {
      if (!this.subjectQuery || !this.subjectExists(this.subjectQuery))
        return this.subjects;
      return this.subjects.filter(sub => sub.id === this.subjectQuery);
    }
  },
  methods: {
    subjectExists(subject) {
      return this.subjects.map(sub => sub.id).includes(subject);
    }
  }
};
</script>

<style lang="scss" scoped></style>
