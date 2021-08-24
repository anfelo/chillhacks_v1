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
              <AppCourseProgress
                :progressText="`0/${currentCourse.lessonsCount}`"
                :progressPercentage="0"
              />
            </div>

            <div class="box" v-if="lessonsByCategory.length">
              <div
                v-for="(category, catIndex) in lessonsByCategory"
                :key="category.id"
              >
                <h3 class="is-size-4">{{ category.id }}</h3>
                <small>{{ `${category.lessons.length} lessons` }}</small>
                <ul class="lessons-list">
                  <li
                    v-for="(lesson, index) in category.lessons"
                    :key="lesson.slug"
                  >
                    <nuxt-link :to="`/courses/${slug}/${lesson.slug}`">
                      <div
                        :class="
                          `lesson ${
                            index < category.lessons.length - 1
                              ? 'has-progress'
                              : ''
                          }`
                        "
                      >
                        <div class="lesson-bullet"></div>
                        <p>
                          {{ lesson.title }} <br />
                          <small>{{ lesson.duration }}</small>
                        </p>
                      </div>
                    </nuxt-link>
                  </li>
                </ul>
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

export default {
  components: {
    AppCourseProgress,
    AppSectionDivider
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

.lessons-list {
  margin-top: 10px;
}

.lesson {
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1.2;
  color: var(--text-color);
  transition: all 0.2s ease;
  cursor: pointer;
}

.lesson:hover {
  color: $primary;
}

.lesson.has-progress:before {
  content: "";
  position: absolute;
  top: 25px;
  left: 6px;
  height: 45px;
  width: 3px;
  background-color: $light-grey;
}

.lesson.done {
  &:before {
    background-color: $primary;
  }
}

.lesson-bullet {
  margin-right: 7px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: $light-grey;
  z-index: 1;
}
</style>
