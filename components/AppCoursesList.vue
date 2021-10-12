<template>
  <section
    v-if="filterCourses(recentCourses).length"
    :class="`hero is-small ${theme}`"
  >
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="section-title">
          <figure v-if="img" class="image is-32x32">
            <img :src="`/img/${img}`" alt="Image" />
          </figure>
          <h1 class="title">
            {{ title }}
          </h1>
        </div>
        <p class="subtitle">
          {{ subtitle }}
        </p>
      </div>
      <div class="container">
        <AppCardList :items="filterCourses(recentCourses)" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import AppCardList from "@/components/AppCardList.vue";

export default {
  components: {
    AppCardList
  },
  props: {
    theme: {
      type: String,
      default: ""
    },
    filterby: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState(["courses", "subjects"]),
    recentCourses() {
      return this.courses.map(course => {
        return {
          ...course,
          subject: {
            ...this.subjects.find(sub => sub.id === course.subject_id)
          },
          subtitle: `${course.lessons_count} lessons`,
          tags: ["New!"],
          url: `/courses/${course.slug}`
        };
      });
    }
  },
  methods: {
    filterCourses(courses) {
      if (!this.filterby) {
        return courses;
      }
      return courses.filter(course => course.subject.id === this.filterby);
    }
  }
};
</script>

<style lang="scss" scoped>
.section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  .image {
    margin-right: 5px;
  }
}
</style>
