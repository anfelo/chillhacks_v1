<template>
  <AppModal :isActive="isConfirmationModalActive">
    <template v-slot:head>
      <h1 class="modal-card-title">
        Are you sure you want to continue?
      </h1>
      <button
        @click="e => updateConfirmationModalActive(false)"
        class="delete"
        aria-label="close"
      ></button>
    </template>
    <template v-slot:content>
      You are about to make a change that can't be reversed. Are you sure you
      want to continue?
    </template>
    <template v-slot:actions>
      <button
        @click="e => confirmAction()"
        :class="`button is-primary ${loading ? 'is-loading' : ''}`"
      >
        Continue
      </button>
      <button @click="e => updateConfirmationModalActive(false)" class="button">
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
    ...mapState("admin", ["isConfirmationModalActive", "loading"])
  },
  methods: {
    ...mapActions("admin", ["updateConfirmationModalActive", "confirmAction"])
  }
};
</script>

<style lang="scss" scoped></style>
