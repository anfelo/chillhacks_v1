<template>
  <div>
    <AppSectionDivider theme="is-info">
      <div class="has-background-info">
        <div class="container">
          <div
            class="column is-three-fifths-desktop is-offset-one-fifth-desktop"
          >
            <div class="box">
              <div class="section-title">
                <figure class="image is-32x32">
                  <img :src="`/img/${currentCourse.img}`" alt="Image" />
                </figure>
                <h1 class="title">{{ currentCourse.title }}</h1>
              </div>
              <p>
                {{ currentCourse.description }}
              </p>
              <div class="section-progress">
                <AppCourseProgress
                  :progressText="`0/${currentCourse.lessonsCount}`"
                  :progressPercentage="0"
                />
              </div>
            </div>

            <div class="box" v-if="lessonsByCategory.length">
              <div
                v-for="(category, catIndex) in lessonsByCategory"
                :key="category.id"
              >
                <h3 class="is-size-4">{{ category.id }}</h3>
                <small>{{ `${category.lessons.length} lessons` }}</small>
                <AppLessonsList :lessons="category.lessons" :course="slug" />
                <hr v-if="catIndex < lessonsByCategory.length - 1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppSectionDivider>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppCourseProgress from "@/components/AppCourseProgress.vue";
import AppSectionDivider from "@/components/AppSectionDivider.vue";
import AppLessonsList from "@/components/AppLessonsList.vue";

export default {
  components: {
    AppCourseProgress,
    AppSectionDivider,
    AppLessonsList
  },
  async asyncData({ params, store }) {
    const slug = params.slug;
    await store.dispatch("getCourseData", slug);
    return { slug };
  },
  computed: {
    ...mapState(["currentCourse"]),
    lessonsByCategory() {
      const categories = this.currentCourse.lessons.map(
        lesson => lesson.category
      );
      const categoriesSet = new Set(categories);
      return [...categoriesSet].map(category => {
        return {
          id: category,
          lessons: this.currentCourse.lessons.filter(
            less => less.category === category
          )
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";

body.dark-theme {
  .box {
    border-bottom: 4px solid $light-grey;
    small {
      color: $lighter-grey;
    }
  }
}

.section-title {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .image {
    margin-right: 5px;
  }
}

.course-progress {
  margin: 20px 0;
}
</style>
