<template>
  <AppModal :isActive="isCourseModalActive">
    <template v-slot:head>
      <h1 class="modal-card-title">
        {{ currentCourse.id ? "Edit Course" : "Add Course" }}
      </h1>
      <button
        @click="e => updateCourseModalActive(false)"
        class="delete"
        aria-label="close"
      ></button>
    </template>
    <template v-slot:content>
      <div class="subject-form has-text-left">
        <div class="field">
          <label class="label" for="title">Title</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="title"
              placeholder="Enter a title"
              :value="currentCourse.title"
              @input="e => handleFormChange({ title: e.target.value })"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="slug">Slug</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="slug"
              placeholder="Enter a slug"
              :value="currentCourse.slug"
              @input="e => handleFormChange({ slug: e.target.value })"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="img">Image</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="img"
              placeholder="Enter an img url"
              :value="currentCourse.img_url"
              @input="e => handleFormChange({ img_url: e.target.value })"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="subject">Subject</label>
          <div class="control">
            <div class="select">
              <select
                @change="e => handleFormChange({ subject_id: e.target.value })"
                name="subject"
              >
                <option value="">Select a subject</option>
                <option
                  v-for="opt of subjectsOpts"
                  :key="opt.value"
                  :value="opt.value"
                  :selected="opt.value === currentCourse.subject_id"
                  >{{ opt.label }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="description">Description</label>
          <div class="control">
            <textarea
              name="description"
              class="textarea"
              placeholder="Add some description"
              :value="currentCourse.description"
              @input="e => handleFormChange({ description: e.target.value })"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <button
        :class="`button is-primary ${loading ? 'is-loading' : ''}`"
        @click="e => handleSubmit()"
        :disabled="!isFormValid"
      >
        {{ currentCourse.id ? "Edit" : "Add" }}
      </button>
      <button @click="e => updateCourseModalActive(false)" class="button">
        Cancel
      </button>
    </template>
  </AppModal>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppModal from "@/components/AppModal.vue";

export default {
  components: {
    AppModal
  },
  computed: {
    ...mapState(["subjects"]),
    ...mapState("admin", ["currentCourse", "isCourseModalActive", "loading"]),
    isFormValid() {
      return (
        this.currentCourse.title &&
        this.currentCourse.title.trim() &&
        this.currentCourse.slug &&
        this.currentCourse.slug.trim() &&
        this.currentCourse.img_url &&
        this.currentCourse.img_url.trim() &&
        this.currentCourse.subject_id &&
        this.currentCourse.description &&
        this.currentCourse.description.trim()
      );
    },
    subjectsOpts() {
      return this.subjects.map(subject => {
        return {
          value: subject.id,
          label: subject.title
        };
      });
    }
  },
  methods: {
    ...mapActions("admin", [
      "updateCourseModalActive",
      "updateOrCreateCourse",
      "updateCurrentCourse"
    ]),
    handleFormChange(change) {
      this.updateCurrentCourse(change);
    },
    handleSubmit() {
      this.updateOrCreateCourse();
    }
  }
};
</script>

<style lang="scss" scoped></style>
