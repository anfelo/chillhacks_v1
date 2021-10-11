<template>
  <nav
    :class="`navbar ${isDark ? 'is-dark' : ''}`"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <nuxt-link v-if="layout === 'default'" class="navbar-item" to="/">
        <span>chillhacks</span>
      </nuxt-link>

      <span
        role="button"
        :class="`navbar-burger burger ${isNavbarOpen ? 'is-active' : ''}`"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavbar"
        @click="handleBurgerClick"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </span>
    </div>

    <div
      id="mainNavbar"
      :class="`navbar-menu ${isNavbarOpen ? 'is-active' : ''}`"
    >
      <div class="navbar-end">
        <nuxt-link class="navbar-item" to="/courses">
          Courses
        </nuxt-link>
        <nuxt-link v-if="!currentUser" class="navbar-item" to="/login">
          Login
        </nuxt-link>
        <div
          v-if="currentUser"
          class="navbar-item navbar-avatar has-dropdown is-hoverable"
        >
          <AppAvatarDropdown />
          <div class="navbar-dropdown">
            <div class="navbar-item">Hello {{ currentUser.username }} 👋</div>
            <hr class="navbar-divider" />
            <nuxt-link v-if="isAdmin()" class="navbar-item" to="/admin">
              Admin
            </nuxt-link>
            <a class="navbar-item" @click="handleLogout()">Logout</a>
          </div>
        </div>
        <div class="navbar-toggle">
          <AppToggleSwitch
            :checked="isDark"
            :isThemeToggle="true"
            @change="handleThemeChange"
          />
        </div>
        <div class="navbar-item has-dropdown is-hoverable"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import AppToggleSwitch from "@/components/AppToggleSwitch.vue";
import AppAvatarDropdown from "@/components/AppAvatarDropdown.vue";
export default {
  props: {
    isDark: Boolean,
    layout: {
      type: String,
      default: "default"
    },
    currentUser: Object
  },
  components: {
    AppToggleSwitch,
    AppAvatarDropdown
  },
  data() {
    return {
      isNavbarOpen: false
    };
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    handleBurgerClick() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    handleThemeChange(event) {
      const newValue = event ? "dark-theme" : "light-theme";
      this.$store.commit("updateAppTheme", newValue);
    },
    isAdmin() {
      return this.currentUser && this.currentUser.role === "admin";
    },
    handleLogout() {
      this.signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/theme.scss";
.navbar-item {
  text-decoration: none;
  padding: 1em 0.5em 0;
  display: block;
  &.has-dropdown {
    padding: 0;
    display: flex;
    justify-content: center;
  }
  .navbar-link {
    padding-top: 1em;
    padding-bottom: 0;
  }
}
.navbar-dropdown {
  .navbar-item {
    padding: 0.375rem 1rem;
  }
}
.navbar-toggle {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1em 0.5em 0;
}
.navbar-menu {
  .navbar-end {
    > .navbar-item.nuxt-link-exact-active::after {
      position: absolute;
      content: "";
      width: calc(100% - 1em);
      height: 2px;
      background-color: $link;
      display: block;
      bottom: -1px;
    }
  }
}
.navbar-brand .navbar-item {
  display: flex;
  min-width: 120px;
}
.navbar-brand .navbar-item span {
  margin-left: 5px;
  font-family: menlo, inconsolata, monospace;
  font-weight: bold;
}
.navbar-icon {
  width: 25px;
  margin: auto;
  cursor: pointer;
}
@media (max-width: 768px) {
  .navbar-item {
    text-align: center;
  }
  .navbar-item.nuxt-link-exact-active::after {
    display: none;
  }
}
</style>
