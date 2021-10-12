<template>
  <div class="app-loader">
    <div class="water">
      <span class="loading-text">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";
.app-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.water {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  background-color: $primary;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}
.water:before,
.water:after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  top: -150px;
  background-color: #fff;
}
.water:before {
  border-radius: 45%;
  background: rgba(255, 255, 255, 0.7);
  animation: wave 5s linear infinite;
}
.water:after {
  border-radius: 35%;
  background: rgba(255, 255, 255, 0.3);
  animation: wave 5s linear infinite;
}
.loading-text {
  margin-top: 40px;
  color: $primary;
  font-weight: bolder;
  z-index: 1;
}
@keyframes wave {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
