<template>
  <div v-if="currentUser && currentUser.role === 'admin'">
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
    <section class="section">
      <div class="courses">
        <div class="container has-text-centered">
          <h1 class="title">
            📑 All Lessons
          </h1>
          <div class="box">
            <AppLessonsTable
              v-if="lessons && lessons.length"
              :lessons="lessons"
            ></AppLessonsTable>
            <div v-if="!lessons || !lessons.length">
              No lessons added yet 😑...
            </div>
          </div>
          <button
            @click="e => updateLessonModalActive(true)"
            class="button is-primary"
          >
            Add Lessons
          </button>
          <AppLessonModal></AppLessonModal>
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
import AppLessonModal from "@/components/AppLessonModal.vue";
import AppSubjectsTable from "@/components/AppSubjectsTable.vue";
import AppCoursesTable from "@/components/AppCoursesTable.vue";
import AppLessonsTable from "@/components/AppLessonsTable.vue";

export default {
  mounted() {
    if (!this.$store.state.auth.currentUser) {
      this.$router.push({
        path: "/"
      });
    }
  },
  async asyncData({ store }) {
    await store.dispatch("getCoursesData");
    await store.dispatch("getLessonsData");
  },
  components: {
    AppCardList,
    AppSubjectModal,
    AppCourseModal,
    AppLessonModal,
    AppSubjectsTable,
    AppCoursesTable,
    AppLessonsTable
  },
  computed: {
    ...mapState(["courses", "subjects", "lessons"]),
    ...mapState("auth", {
      currentUser: state => state.currentUser
    })
  },
  methods: {
    ...mapActions("admin", [
      "updateSubjectModalActive",
      "updateCourseModalActive",
      "updateLessonModalActive"
    ])
  },
  watch: {
    currentUser: function(value) {
      if (!value || !value.id || value.role !== "admin") {
        this.$router.push({
          path: "/"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
