import * as fromApi from "@/services/api";

export const state = () => ({
  appTheme: "dark-theme",
  courses: [],
  subjects: [],
  currentCourse: {}
});

export const mutations = {
  updateAppTheme: (state, payload) => {
    state.appTheme = payload;
  },
  updateSubjects: (state, payload) => {
    state.subjects = payload;
  },
  updateCourses: (state, payload) => {
    state.courses = payload;
  },
  updateCurrentCourse: (state, payload) => {
    state.currentCourse = payload;
  }
};

export const actions = {
  async getSubjectsData({ state, commit }) {
    if (state.subjects.length) return;
    try {
      const res = await fromApi.getSubjects();
      if (res.status === 200) {
        commit("updateSubjects", res.body);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getCoursesData({ state, commit }) {
    if (state.courses.length) return;
    try {
      const res = await fromApi.getCourses();
      if (res.status === 200) {
        commit("updateCourses", res.body);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getCourseData({ state, commit }, payload) {
    if (state.currentCourse.slug === payload) return;
    try {
      const res = await fromApi.getCourse(payload);
      if (res.status === 200) {
        commit("updateCurrentCourse", res.body);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
