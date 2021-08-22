<template>
  <div>
    <AppNavbar :isDark="appTheme === 'dark-theme'" />
    <main :class="appTheme === 'dark-theme' ? 'has-background-dark' : ''">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppNavbar from "@/components/AppNavbar.vue";
import * as fromLocalStorage from "@/services/localStorage";
export default {
  components: {
    AppNavbar
  },
  mounted() {
    const theme = fromLocalStorage.loadEntry("theme");
    if (theme) {
      this.$store.commit("updateAppTheme", theme);
    }
  },
  computed: {
    ...mapState(["appTheme"])
  },
  watch: {
    appTheme: function(value) {
      fromLocalStorage.saveEntry({ key: "theme", value: value });
      if (document) {
        document.body.className = "";
        document.body.classList.add(value);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
