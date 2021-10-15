<template>
  <AppModal :isActive="isLessonModalActive">
    <template v-slot:head>
      <h1 class="modal-card-title">
        {{ currentLesson.id ? "Edit Lesson" : "Add Lesson" }}
      </h1>
      <button
        @click="e => updateLessonModalActive(false)"
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
              :value="currentLesson.title"
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
              :value="currentLesson.slug"
              @input="e => handleFormChange({ slug: e.target.value })"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="courses">Course</label>
          <div class="control">
            <div class="select">
              <select
                @change="e => handleFormChange({ course_id: e.target.value })"
                name="courses"
              >
                <option value="">Select a course</option>
                <option
                  v-for="opt of coursesOpts"
                  :key="opt.value"
                  :value="opt.value"
                  :selected="opt.value === currentLesson.course_id"
                  >{{ opt.label }}</option
                >
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="category">Category</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="category"
              placeholder="Enter a category"
              :value="currentLesson.category"
              @input="e => handleFormChange({ category: e.target.value })"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="order">Order</label>
          <div class="control">
            <input
              class="input"
              type="number"
              name="order"
              placeholder="Enter a sorting order"
              :value="currentLesson.sorting_order"
              @input="e => handleFormChange({ sorting_order: e.target.value })"
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="content">Content File</label>
          <div class="file has-name is-fullwidth is-success">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="content"
                @input="e => handleFileChange(e)"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <span class="file-name" v-if="currentLesson.content_file">
                {{ currentLesson.content_file.name }}
              </span>
              <span class="file-name" v-if="currentLesson.content_filename">
                {{ currentLesson.content_filename }}
              </span>
              <span
                class="file-name"
                v-if="
                  !currentLesson.content_file && !currentLesson.content_filename
                "
              >
                No file uploaded
              </span>
            </label>
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
        {{ currentLesson.id ? "Edit" : "Add" }}
      </button>
      <button @click="e => updateLessonModalActive(false)" class="button">
        Cancel
      </button>
    </template>
  </AppModal>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["courses"]),
    ...mapState("admin", ["currentLesson", "isLessonModalActive", "loading"]),
    isFormValid() {
      return (
        this.currentLesson.title &&
        this.currentLesson.title.trim() &&
        this.currentLesson.slug &&
        this.currentLesson.slug.trim() &&
        this.currentLesson.category &&
        this.currentLesson.category.trim() &&
        this.currentLesson.sorting_order &&
        this.currentLesson.course_id &&
        ((this.currentLesson.content_file &&
          this.currentLesson.content_file.name) ||
          this.currentLesson.content_filename)
      );
    },
    coursesOpts() {
      return this.courses.map(course => {
        return {
          value: course.id,
          label: course.title
        };
      });
    }
  },
  methods: {
    ...mapActions("admin", [
      "updateLessonModalActive",
      "updateOrCreateLesson",
      "updateCurrentLesson"
    ]),
    handleFormChange(change) {
      this.updateCurrentLesson(change);
    },
    handleFileChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.handleFormChange({ content_file: event.target.files[0] });
      }
    },
    handleSubmit() {
      this.updateOrCreateLesson();
    }
  }
};
</script>

<style lang="scss" scoped></style>
