<template>
  <footer
    :class="`footer ${isDark ? 'has-background-dark' : 'has-background-white'}`"
  >
    <div class="container">
      <div class="content has-text-centered">
        <div class="copy">
          <p>Made with 😍 and tons of ☕</p>
        </div>
        <!-- <div class="social-icons-container">
          <a
            href="https://twitter.com/anfelocyber"
            class="social-icon"
            target="_blank"
          >
            <img src="/img/twitter.svg" alt="Twitter logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/andres-felipe-osorio-8568b6a1"
            class="social-icon"
            target="_blank"
          >
            <img src="/img/linkedin.svg" alt="Linkedin logo" />
          </a>
          <a
            href="https://github.com/anfelo"
            class="social-icon"
            target="_blank"
          >
            <img src="/img/github.svg" alt="Github logo" />
          </a>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.social-icons-container {
  display: flex;
  justify-content: center;
}
.social-icons-container img {
  margin: 0 5px;
  width: 25px;
  height: 25px;
}
.copy {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.copy p {
  margin: 0;
  font-size: 0.8em;
}
</style>
