<template>
  <div>
    <div class="container">
      <AppNavbar :isDark="appTheme === 'dark-theme'" />
    </div>
    <main :class="appTheme === 'dark-theme' ? 'has-background-dark' : ''">
      <Nuxt />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import * as fromLocalStorage from "@/services/localStorage";
export default {
  components: {
    AppNavbar,
    AppFooter
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
