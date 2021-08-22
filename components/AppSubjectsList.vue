<template>
  <section class="hero is-small is-info">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          🧠 All Subjects
        </h1>
        <p class="subtitle">
          Find courses and practical resources for many tech subjects
        </p>
      </div>
      <div class="container card-list">
        <div class="box" v-for="subject in coursesBySubject" :key="subject.id">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="`/img/${subject.img}`" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ subject.title }}</strong>
                  <small>courses: {{ subject.coursesCount }}</small>
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
    coursesBySubject() {
      const subjects = this.courses.map(course => course.subject);
      const subjectsSet = new Set(subjects);
      return [...subjectsSet].map(subject => {
        return {
          ...this.subjects.find(sub => sub.id === subject),
          coursesCount: this.courses.filter(
            course => course.subject === subject
          ).length
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
