<template>
  <AppUser>
    <div class="course-container">
      <div
        :class="`sidenav-container ${isSidebarOpen ? 'opened' : 'collapsed'}`"
      >
        <AppSideNavbar
          @toggle="handleSidebarToggle"
          :isSidebarOpen="isSidebarOpen"
        />
      </div>
      <div class="overlay"></div>
      <main
        :class="
          `course-content ${
            appTheme === 'dark-theme' ? 'has-background-dark' : ''
          } ${!isSidebarOpen ? 'full-width' : ''}`
        "
      >
        <AppNavbar
          :isDark="appTheme === 'dark-theme'"
          :currentUser="currentUser"
          :layout="'course'"
        />
        <Nuxt />
      </main>
    </div>
  </AppUser>
</template>

<script>
import { mapState } from "vuex";
import AppSideNavbar from "@/components/AppSideNavbar.vue";
import AppUser from "@/components/AppUser.vue";
import * as fromLocalStorage from "@/services/localStorage";

export default {
  components: {
    AppSideNavbar,
    AppUser
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
    ...mapState(["appTheme"]),
    ...mapState("auth", ["currentUser"])
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

  .overlay {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 31;
  }
}

body.dark-theme {
  .sidenav-container {
    background-color: var(--card-bg);
    color: var(--text-color);
  }
}

.sidenav-container {
  position: fixed;
  width: 360px;
  height: 100%;
  overflow: auto;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  z-index: 32;
  transition: left 0.2s;

  &.collapsed {
    left: -360px;
  }

  &.opened {
    left: 0;

    & + .overlay {
      display: block;
    }
  }
}

.course-content {
  flex: 1;
  padding: 0 1rem;
  transition: all 0.2s;

  &.full-width {
    margin-left: 0;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .sidenav-container {
    .overlay {
      display: none;
    }

    &.opened {
      & + .overlay {
        display: none;
      }
    }
  }

  .course-content {
    margin-left: 360px;
  }
}
</style>
