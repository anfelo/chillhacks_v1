<template>
  <AppModal :isActive="isSubjectModalActive">
    <template v-slot:head>
      <p class="modal-card-title">
        Add Subject
      </p>
      <button
        @click="e => updateSubjectModalActive(false)"
        class="delete"
        aria-label="close"
      ></button>
    </template>
    <template v-slot:content>Content...</template>
    <template v-slot:actions>
      <button class="button is-primary">Add</button>
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
    ...mapState("admin", ["isSubjectModalActive"])
  },
  methods: {
    ...mapActions("admin", ["updateSubjectModalActive"])
  }
};
</script>

<style lang="scss" scoped></style>
