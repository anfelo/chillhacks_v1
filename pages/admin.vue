<template>
  <div>
    <section class="section">
      <div class="subjects">
        <div class="container has-text-centered">
          <h1 class="title">
            🧠 All Subjects
          </h1>
          <div class="box">
            <AppSubjectsTable
              v-if="subjects && subjects.length"
              :subjects="subjects"
            ></AppSubjectsTable>
            <div v-if="!subjects || !subjects.length">
              No subjects added yet 😑...
            </div>
          </div>
          <button
            @click="e => updateSubjectModalActive(true)"
            class="button is-primary"
          >
            Add Subjects
          </button>
          <AppSubjectModal></AppSubjectModal>
        </div>
      </div>
      <div class="lessons"></div>
      <div class="users"></div>
    </section>
    <section class="section">
      <div class="courses">
        <div class="container has-text-centered">
          <h1 class="title">
            📚 All Courses
          </h1>
          <div class="box">
            <AppCoursesTable
              v-if="courses && courses.length"
              :courses="courses"
            ></AppCoursesTable>
            <div v-if="!courses || !courses.length">
              No courses added yet 😑...
            </div>
          </div>
          <button
            @click="e => updateCourseModalActive(true)"
            class="button is-primary"
          >
            Add Courses
          </button>
          <AppCourseModal></AppCourseModal>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppCardList from "@/components/AppCardList.vue";
import AppSubjectModal from "@/components/AppSubjectModal.vue";
import AppCourseModal from "@/components/AppCourseModal.vue";
import AppSubjectsTable from "@/components/AppSubjectsTable.vue";
import AppCoursesTable from "@/components/AppCoursesTable.vue";

export default {
  async asyncData({ store }) {
    await store.dispatch("getCoursesData");
  },
  components: {
    AppCardList,
    AppSubjectModal,
    AppCourseModal,
    AppSubjectsTable,
    AppCoursesTable
  },
  computed: {
    ...mapState(["courses", "subjects"])
  },
  methods: {
    ...mapActions("admin", [
      "updateSubjectModalActive",
      "updateCourseModalActive",
      "updateLessonModalActive"
    ])
  }
};
</script>

<style lang="scss" scoped></style>
