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
                  <img :src="`/img/software-fundamentals.svg`" alt="Image" />
                </figure>
                <h1 class="title">Design Patterns</h1>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Deserunt debitis, natus mollitia eum asperiores, dignissimos et
                reiciendis laboriosam fugiat repellendus nulla saepe distinctio
                atque voluptatem, alias perferendis assumenda facere
                voluptatibus!
              </p>
              <AppCourseProgress progressText="14/42" progressPercentage="60" />
            </div>

            <div class="box">
              <h3 class="is-size-4">Behavioral Patterns</h3>
              <small>5 lessons</small>
              <ul>
                <li>
                  <div class="lesson has-progress done">
                    <div class="lesson-bullet has-background-primary"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet has-background-primary"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
              </ul>
              <hr />
              <h3 class="is-size-4">Behavioral Patterns</h3>
              <small>5 lessons</small>
              <ul>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson has-progress">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
                <li>
                  <div class="lesson">
                    <div class="lesson-bullet"></div>
                    <p>
                      Chain of Responsibility <br />
                      <small>07:30</small>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppSectionDivider>
  </div>
</template>

<script>
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

.lesson {
  margin-bottom: 5px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
