<template>
  <AppUser>
    <div class="container">
      <AppNavbar
        :isDark="appTheme === 'dark-theme'"
        :currentUser="currentUser"
      />
    </div>
    <main :class="appTheme === 'dark-theme' ? 'has-background-dark' : ''">
      <Nuxt />
    </main>
    <AppFooter />
  </AppUser>
</template>

<script>
import { mapState } from "vuex";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppUser from "@/components/AppUser.vue";
import * as fromLocalStorage from "@/services/localStorage";
export default {
  components: {
    AppNavbar,
    AppFooter,
    AppUser
  },
  mounted() {
    const theme = fromLocalStorage.loadEntry("theme");
    if (theme) {
      this.$store.commit("updateAppTheme", theme);
    }
  },
  computed: {
    ...mapState(["appTheme"]),
    ...mapState("auth", ["currentUser"])
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
