<template>
  <ul class="lessons-list">
    <li v-for="(lesson, index) in lessons" :key="lesson.slug">
      <nuxt-link :to="`/courses/${course}/${lesson.slug}`">
        <div
          :class="`lesson ${index < lessons.length - 1 ? 'has-progress' : ''}`"
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
</template>

<script>
export default {
  props: {
    lessons: {
      type: Array,
      default: []
    },
    course: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";

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
