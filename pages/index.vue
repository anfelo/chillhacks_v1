<template>
  <div>
    <section class="hero is-large">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title has-text-primary">
            Here goes some awesome headline
          </h1>
          <p class="subtitle">
            This is what Chillhacks is all about in a nutshell
          </p>
          <div class="control has-icons-left">
            <input
              class="input is-primary is-large"
              type="text"
              placeholder="Search courses"
            />
            <span class="icon is-medium is-left">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-small is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Recently Added
          </h1>
          <p class="subtitle">
            Most recent courses
          </p>
          <div class="card-list">
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img src="/img/python.svg" alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Python</strong> <small>courses: 3</small>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean efficitur sit amet massa fringilla egestas. Nullam
                      condimentum luctus turpis.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img src="/img/javascript.svg" alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>JavaScript</strong> <small>courses: 3</small>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean efficitur sit amet massa fringilla egestas. Nullam
                      condimentum luctus turpis.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img src="/img/vue.svg" alt="Image" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Vue.js</strong> <small>courses: 3</small>
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean efficitur sit amet massa fringilla egestas. Nullam
                      condimentum luctus turpis.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
