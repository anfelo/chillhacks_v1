<template>
  <div class="switch">
    <input
      id="switch"
      type="checkbox"
      :class="`switch-input ${isThemeToggle ? 'theme-toggle' : ''}`"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <label for="switch" class="switch-label">Switch</label>
    <span class="icon" v-if="checked">🌜</span>
    <span class="icon" v-else>🌞</span>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: true
    },
    isThemeToggle: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";
.switch {
  position: relative;
  display: inline-block;
}
.switch-input {
  display: none;
}
.switch-label {
  display: block;
  width: 56px;
  height: 32px;
  clip: rect(0 0 0 0);
  color: transparent;
  user-select: none;
}
.switch-label:before,
.switch-label:after {
  content: "";
  display: block;
  position: absolute;
  cursor: pointer;
}
.switch-label:before {
  width: 100%;
  height: 100%;
  background-color: #dedede;
  border-radius: 9999em;
  transition: background-color 0.25s ease;
}
.switch-label:after {
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
  transition: left 0.25s ease;
}
.switch-input:checked + .switch-label:before {
  background-color: darken($dark, 5%);
}
.switch-input:checked + .switch-label:after {
  left: 24px;
}
.switch .icon {
  position: absolute;
  top: 0;
  left: 32px;
  height: 100%;
  font-size: 1.2em;
}
.switch-input:checked ~ .icon {
  left: 0;
}
</style>
