import * as fromApi from "@/services/api";

export const state = () => ({
  appTheme: "dark-theme"
});

export const mutations = {
  updateAppTheme: (state, payload) => {
    state.appTheme = payload;
  }
};

export const actions = {};
