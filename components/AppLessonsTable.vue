<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>SubjectID</th>
        <th>Title</th>
        <th>Slug</th>
        <th>Description</th>
        <th>Image</th>
        <th>Updated At</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="lesson.id">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <button
                  class="button is-info is-small"
                  @click="e => editLesson(lesson)"
                >
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                </button>
              </div>
              <div class="level-item">
                <button class="button is-danger is-small">
                  <span class="icon is-small">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </button>
              </div>
            </div>
          </nav>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import { getDateStringFromISOString } from "@/helpers/formatters";

export default {
  props: {
    lessons: Array
  },
  methods: {
    ...mapActions("admin", ["editLesson"]),
    getShortID(id: string) {
      return id.slice(0, 8);
    },
    handleCopyToClipBoard(id: string) {
      navigator.clipboard.writeText(id);
    },
    formatDate(date: string) {
      return getDateStringFromISOString(date);
    }
  },
  filters: {
    truncate(value, length) {
      if (!value) return "";
      return value.slice(0, length) + "...";
    }
  }
};
</script>

<style lang="scss" scoped></style>
