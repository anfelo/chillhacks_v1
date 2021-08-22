<template>
  <section class="hero is-small is-info">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          ⚡ Recently Added
        </h1>
        <p class="subtitle">
          Level up your coding skills
        </p>
      </div>
      <div class="container card-list">
        <div class="box" v-for="course in recentCourses" :key="course.id">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="`/img/${course.img}`" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ course.title }}</strong>
                  <br />
                  <small>{{ course.lessons }} lessons</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["courses", "subjects"]),
    recentCourses() {
      return this.courses.map(course => {
        return {
          ...course,
          subject: { ...this.subjects.find(sub => sub.id === course.subject) }
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
