<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Slug</th>
        <th>Image</th>
        <th>Updated At</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="subject in subjects" :key="subject.id">
        <td>
          <div class="is-flex is-justify-content-space-between">
            <abbr :title="subject.id">{{ getShortID(subject.id) }}</abbr>
            <button
              class="button is-small"
              @click="e => handleCopyToClipBoard(subject.id)"
            >
              <span class="icon is-small">
                <i class="far fa-copy"></i>
              </span>
            </button>
          </div>
        </td>
        <td>{{ subject.title }}</td>
        <td>{{ subject.slug }}</td>
        <td>
          <figure class="image is-32x32">
            <img :src="`/img/${subject.img_url}`" alt="Image" />
          </figure>
        </td>
        <td>{{ formatDate(subject.updated) }}</td>
        <td>{{ formatDate(subject.created) }}</td>
        <td>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <button
                  class="button is-info is-small"
                  @click="e => editSubject(subject)"
                >
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                </button>
              </div>
              <div class="level-item">
                <button
                  class="button is-danger is-small"
                  @click="processDeleteSubject(subject)"
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
    subjects: Array
  },
  methods: {
    ...mapActions("admin", ["editSubject", "processDeleteSubject"]),
    getShortID(id: string) {
      return id.slice(0, 8);
    },
    handleCopyToClipBoard(id: string) {
      navigator.clipboard.writeText(id);
    },
    formatDate(date: string) {
      return getDateStringFromISOString(date);
    }
  }
};
</script>

<style lang="scss" scoped></style>
