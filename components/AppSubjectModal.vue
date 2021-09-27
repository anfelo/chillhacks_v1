<template>
  <AppModal :isActive="isSubjectModalActive">
    <template v-slot:head>
      <h1 class="modal-card-title">
        {{ currentSubject.id ? "Edit Subject" : "Add Subject" }}
      </h1>
      <button
        @click="e => updateSubjectModalActive(false)"
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
              :value="currentSubject.title"
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
              :value="currentSubject.slug"
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
              :value="currentSubject.img_url"
              @input="e => handleFormChange({ img_url: e.target.value })"
            />
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
        {{ currentSubject.id ? "Edit" : "Add" }}
      </button>
      <button @click="e => updateSubjectModalActive(false)" class="button">
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
    ...mapState("admin", ["currentSubject", "isSubjectModalActive", "loading"]),
    isFormValid() {
      return (
        this.currentSubject.title &&
        this.currentSubject.title.trim() &&
        this.currentSubject.slug &&
        this.currentSubject.slug.trim() &&
        this.currentSubject.img_url &&
        this.currentSubject.img_url.trim()
      );
    }
  },
  methods: {
    ...mapActions("admin", [
      "updateSubjectModalActive",
      "updateOrCreateSubject",
      "updateCurrentSubject"
    ]),
    handleFormChange(change) {
      this.updateCurrentSubject(change);
    },
    handleSubmit() {
      this.updateOrCreateSubject();
    }
  }
};
</script>

<style lang="scss" scoped></style>
