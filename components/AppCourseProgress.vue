<template>
  <div class="course-progress">
    <div class="course-progress-text">
      <small v-if="progressText">{{ progressText }} completed</small>
      <small class="has-text-primary">{{ progressPercentage }}%</small>
    </div>
    <progress class="progress is-primary" :value="progressPercentage" max="100"
      >{{ progressPercentage }}%</progress
    >
  </div>
</template>

<script>
export default {
  props: {
    progressText: {
      type: String,
      default: ""
    },
    progressPercentage: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.course-progress {
  margin: 20px 0;
}
.course-progress-text {
  display: flex;
  justify-content: space-between;
}
</style>
