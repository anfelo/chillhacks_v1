<template>
  <aside class="menu">
    <div class="menu-header">
      <nuxt-link to="/">
        <span>chillhacks</span>
      </nuxt-link>
      <button class="menu-close-button" @click="$emit('close', true)">
        <span class="icon is-small">
          <i class="fas fa-arrow-left"></i>
        </span>
      </button>
    </div>
    <div class="menu-item">
      <AppCourseProgress
        :progressText="`0/${currentCourse.lessonsCount}`"
        :progressPercentage="0"
      />
    </div>
    <div v-for="(category, catIndex) in lessonsByCategory" :key="category.id">
      <p class="menu-label">
        {{ category.id }}
        <br />
        <small>{{ `${category.lessons.length} lessons` }}</small>
      </p>
      <div class="menu-list">
        <AppLessonsList
          :lessons="category.lessons"
          :course="currentCourse.slug"
        />
      </div>
      <hr v-if="catIndex < lessonsByCategory.length - 1" />
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import AppLessonsList from "@/components/AppLessonsList.vue";
import AppCourseProgress from "@/components/AppCourseProgress.vue";

export default {
  components: {
    AppLessonsList,
    AppCourseProgress
  },
  computed: {
    ...mapState(["currentCourse", "currentLesson"]),
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

.menu {
  height: 100%;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.75rem;
  border-bottom: 2px solid $light-grey;
}

.menu-item {
  padding: 1rem 0.75rem;
  border-bottom: 2px solid $light-grey;
}

.menu-item:not(:last-child) {
  margin-bottom: 1em;
}

.menu-close-button {
  background-color: rgba($color: $dark, $alpha: 0.8);
  color: $white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba($color: $dark, $alpha: 1);
  }
}
</style>
