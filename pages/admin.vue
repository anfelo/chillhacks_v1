<template>
  <aside class="section">
    <div class="subjects">
      <div class="container has-text-centered">
        <h1 class="title">
          🧠 All Subjects
        </h1>
        <div class="box is-dark">
          <AppSubjectsTable :subjects="subjects"></AppSubjectsTable>
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
    <div class="courses"></div>
    <div class="lessons"></div>
    <div class="users"></div>
  </aside>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppCardList from "@/components/AppCardList.vue";
import AppSubjectModal from "@/components/AppSubjectModal.vue";

export default {
  components: {
    AppCardList,
    AppSubjectModal
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
