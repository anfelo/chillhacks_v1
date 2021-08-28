<template>
  <div class="course-container">
    <div :class="`sidenav-container ${isSidebarOpen ? 'opened' : 'collapsed'}`">
      <AppSideNavbar
        @toggle="handleSidebarToggle"
        :isSidebarOpen="isSidebarOpen"
      />
    </div>
    <main
      :class="
        `course-content ${
          appTheme === 'dark-theme' ? 'has-background-dark' : ''
        } ${!isSidebarOpen ? 'full-width' : ''}`
      "
    >
      <AppNavbar :isDark="appTheme === 'dark-theme'" :layout="'course'" />
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppSideNavbar from "@/components/AppSideNavbar.vue";
import * as fromLocalStorage from "@/services/localStorage";

export default {
  components: {
    AppSideNavbar
  },
  mounted() {
    const theme = fromLocalStorage.loadEntry("theme");
    if (theme) {
      this.$store.commit("updateAppTheme", theme);
    }
  },
  data() {
    return {
      isSidebarOpen: true
    };
  },
  computed: {
    ...mapState(["appTheme"])
  },
  methods: {
    handleSidebarToggle() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
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

<style lang="scss" scoped>
.course-container {
  display: flex;
}

.sidenav-container {
  position: fixed;
  width: 360px;
  height: 100vh;
  overflow: auto;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  z-index: 31;
  transition: left 0.2s;

  &.collapsed {
    left: -360px;
  }

  &.opened {
    left: 0;
  }
}

.course-content {
  flex: 1;
  margin-left: 360px;
  padding: 0 1rem;
  transition: all 0.2s;

  &.full-width {
    margin-left: 0;
  }
}
</style>
