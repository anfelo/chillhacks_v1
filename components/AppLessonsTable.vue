<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>CourseID</th>
        <th>Title</th>
        <th>Slug</th>
        <th>Category</th>
        <th>Order</th>
        <th>Updated At</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="lesson in lessons" :key="lesson.id">
        <td>
          <div class="is-flex is-justify-content-space-between">
            <abbr :title="lesson.id">{{ getShortID(lesson.id) }}</abbr>
            <button
              class="button is-small"
              @click="e => handleCopyToClipBoard(lesson.id)"
            >
              <span class="icon is-small">
                <i class="far fa-copy"></i>
              </span>
            </button>
          </div>
        </td>
        <td>
          <div class="is-flex is-justify-content-space-between">
            <abbr :title="lesson.course_id">{{
              getShortID(lesson.course_id)
            }}</abbr>
            <button
              class="button is-small"
              @click="e => handleCopyToClipBoard(lesson.course_id)"
            >
              <span class="icon is-small">
                <i class="far fa-copy"></i>
              </span>
            </button>
          </div>
        </td>
        <td>{{ lesson.title }}</td>
        <td>{{ lesson.slug }}</td>
        <td>{{ lesson.category }}</td>
        <td>{{ lesson.sorting_order }}</td>
        <td>{{ formatDate(lesson.updated) }}</td>
        <td>{{ formatDate(lesson.created) }}</td>
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
                <button
                  class="button is-danger is-small"
                  @click="processDeleteLesson(lesson)"
                >
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
    ...mapActions("admin", ["editLesson", "processDeleteLesson"]),
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
