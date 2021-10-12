import * as authService from "@/services/auth";
import * as validators from "@/helpers/validators";

export const state = () => ({
  authForm: {
    email: "",
    username: "",
    password: ""
  },
  loading: false,
  pwVisible: false,
  isEmailTouched: false,
  isPwTouched: false,
  isUsernameTouched: false,
  errorMessage: "",
  currentUser: null,
  currentUserLoaded: false
});

export const getters = {
  isEmailValid(state: any) {
    return validators.isEmailValid(state.authForm.email);
  },
  isPwValid(state: any) {
    return state.authForm.password.trim().length >= 6;
  },
  isUsernameValid(state: any) {
    return state.authForm.username.trim().length >= 6;
  }
};

export const mutations = {
  toggleAuthLoading(state: any, payload: any) {
    return (state.loading = payload);
  },
  updateAuthForm(state: any, payload: any) {
    return (state.authForm = {
      ...state.authForm,
      ...payload
    });
  },
  updateErrorMessage(state: any, payload: any) {
    return (state.errorMessage = payload);
  },
  updateCurrentUser(state: any, payload: any) {
    return (state.currentUser = payload);
  },
  markEmailAsTouched(state: any) {
    return (state.isEmailTouched = true);
  },
  markPwAsTouched(state: any) {
    return (state.isPwTouched = true);
  },
  markUsernameAsTouched(state: any) {
    return (state.isUsernameTouched = true);
  },
  togglePwVisible(state: any) {
    return (state.pwVisible = !state.pwVisible);
  },
  resetAuthForm(state: any) {
    state.authForm = {
      email: "",
      password: "",
      username: ""
    };
    state.pwVisible = false;
    state.isEmailTouched = false;
    state.isPwTouched = false;
    state.isUsernameTouched = false;
    return;
  },
  toggleCurrentUserLoaded(state: any, payload: any) {
    return (state.currentUserLoaded = payload);
  }
};

export const actions = {
  updateAuthForm({ commit }: any, payload: any) {
    commit("updateAuthForm", payload);
  },
  markEmailAsTouched({ commit }: any) {
    commit("markEmailAsTouched");
  },
  markPwAsTouched({ commit }: any) {
    commit("markPwAsTouched");
  },
  markUsernameAsTouched({ commit }: any) {
    commit("markUsernameAsTouched");
  },
  togglePwVisible({ commit }: any) {
    commit("togglePwVisible");
  },
  signOut({ commit }) {
    authService.signOut();
    commit("updateCurrentUser", null);
  },
  async signInOrCreateUser({ commit, state }: any) {
    commit("toggleAuthLoading", true);
    const res = await authService.signInWithUsernameAndPassword(
      state.authForm.username,
      state.authForm.password
    );
    commit("toggleAuthLoading", false);

    if (res.status === 200) {
      commit("updateCurrentUser", res.body);
    }

    if (res.status === 400) {
      commit("updateErrorMessage", "error");
      return;
    }
    commit("resetAuthForm");
  },
  async getCurrentUser({ commit, state }: any) {
    commit("toggleCurrentUserLoaded", false);
    const res = await authService.getCurrentUser();
    commit("updateCurrentUser", res.body);
    commit("toggleCurrentUserLoaded", true);
  }
};
