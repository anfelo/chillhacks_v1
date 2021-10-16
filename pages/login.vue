<template>
  <aside class="section">
    <div class="login-form">
      <form @submit="submit">
        <div>
          <h3 class="title has-text-centered">Login</h3>
        </div>

        <div class="field">
          <label for="email" class="label">Email</label>
          <div class="control has-icons-left">
            <input
              id="email"
              :value="email"
              @focus="markEmailAsTouched"
              @input="e => handleAuthFormChange({ email: e.target.value })"
              :class="
                `input ${isEmailTouched && !isEmailValid ? 'is-danger' : ''}`
              "
              type="text"
              placeholder="Enter your email"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <p v-if="isEmailTouched && !isEmailValid" class="help is-danger">
            Invalid email format
          </p>
        </div>

        <div class="field">
          <label for="password" class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-if="!pwVisible"
              id="password"
              :value="password"
              @focus="markPwAsTouched"
              @input="e => handleAuthFormChange({ password: e.target.value })"
              :class="`input ${isPwTouched && !isPwValid ? 'is-danger' : ''}`"
              type="password"
              placeholder="Enter your password"
            />
            <input
              v-else
              id="password"
              :value="password"
              @focus="markPwAsTouched"
              @input="e => handleAuthFormChange({ password: e.target.value })"
              :class="`input ${isPwTouched && !isPwValid ? 'is-danger' : ''}`"
              type="text"
              placeholder="Enter your password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <span v-if="!pwVisible" class="icon is-small is-right">
              <i class="fas fa-eye-slash"></i>
            </span>
            <span v-else class="icon is-small is-right">
              <i class="fas fa-eye"></i>
            </span>
          </div>
          <p v-if="isPwTouched && !isPwValid" class="help is-danger">
            The password should contain at least 6 characters
          </p>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input
                :value="pwVisible"
                @change="togglePwVisible"
                type="checkbox"
              />
              Show password
            </label>
          </div>
        </div>

        <div class="control">
          <button
            :disabled="!isFormValid"
            :class="`button is-primary ${loading ? 'is-loading' : ''}`"
            @click="submit"
          >
            Login
          </button>
        </div>

        <p v-if="errorMessage" class="has-text-danger">
          Incorrect username or password
        </p>
      </form>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", {
      email: state => state.authForm.email,
      password: state => state.authForm.password,
      username: state => state.authForm.username,
      loading: state => state.loading,
      errorMessage: state => state.errorMessage,
      pwVisible: state => state.pwVisible,
      isEmailTouched: state => state.isEmailTouched,
      isPwTouched: state => state.isPwTouched,
      isUsernameTouched: state => state.isUsernameTouched,
      currentUser: state => state.currentUser
    }),
    ...mapGetters("auth", ["isEmailValid", "isPwValid", "isUsernameValid"]),
    isFormValid() {
      return this.isEmailValid && this.isPwValid;
    }
  },
  methods: {
    ...mapActions("auth", [
      "signInOrCreateUser",
      "updateAuthForm",
      "markEmailAsTouched",
      "markPwAsTouched",
      "markUsernameAsTouched",
      "togglePwVisible"
    ]),
    handleAuthFormChange(change) {
      this.updateAuthForm(change);
    },
    submit(event) {
      event.preventDefault();
      if (this.isFormValid) {
        this.signInOrCreateUser();
      }
    }
  },
  watch: {
    currentUser: function(value) {
      if (value && value.id) {
        this.$router.push({
          path: "/courses"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .login-form {
    width: 600px;
    margin: auto;
  }
}
</style>
