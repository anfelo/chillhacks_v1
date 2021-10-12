<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>SubjectID</th>
        <th>Title</th>
        <th>Slug</th>
        <th>Image</th>
        <th>Updated At</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>
          <div class="is-flex is-justify-content-space-between">
            <abbr :title="course.id">{{ getShortID(course.id) }}</abbr>
            <button
              class="button is-small"
              @click="e => handleCopyToClipBoard(course.id)"
            >
              <span class="icon is-small">
                <i class="far fa-copy"></i>
              </span>
            </button>
          </div>
        </td>
        <td>
          <div class="is-flex is-justify-content-space-between">
            <abbr :title="course.subject_id">{{
              getShortID(course.subject_id)
            }}</abbr>
            <button
              class="button is-small"
              @click="e => handleCopyToClipBoard(course.subject_id)"
            >
              <span class="icon is-small">
                <i class="far fa-copy"></i>
              </span>
            </button>
          </div>
        </td>
        <td>{{ course.title }}</td>
        <td>{{ course.slug }}</td>
        <td>
          <figure class="image is-32x32">
            <img :src="`/img/${course.img_url}`" alt="Image" />
          </figure>
        </td>
        <td>{{ formatDate(course.updated) }}</td>
        <td>{{ formatDate(course.created) }}</td>
        <td>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <button
                  class="button is-info is-small"
                  @click="e => editCourse(course)"
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
    courses: Array
  },
  methods: {
    ...mapActions("admin", ["editCourse"]),
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
