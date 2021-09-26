export const state = () => ({
  isSubjectModalActive: false,
  isCourseModalActive: false,
  isLessonmodalActive: false
});

export const mutations = {
  toggleSubjectModalActive(state, payload) {
    state.isSubjectModalActive = payload;
  },
  toggleCourseModalActive(state, payload) {
    state.isCourseModalActive = payload;
  },
  toggleLessonModalActive(state, payload) {
    state.isLessonModalActive = payload;
  }
};

export const actions = {
  updateSubjectModalActive({ commit }: any, payload: any) {
    commit("toggleSubjectModalActive", payload);
  },
  updateCourseModalActive({ commit }: any, payload: any) {
    commit("toggleCourseModalActive", payload);
  },
  updateLessonModalActive({ commit }: any, payload: any) {
    commit("toggleLessonModalActive", payload);
  }
};
