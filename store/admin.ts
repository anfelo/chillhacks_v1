import * as fromApi from "@/services/api";

export const state = () => ({
  loading: false,
  currentSubject: {},
  currentCourse: {},
  currentLesson: null,
  isSubjectModalActive: false,
  isCourseModalActive: false,
  isLessonmodalActive: false
});

export const mutations = {
  toggleLoading(state, payload) {
    state.loading = payload;
  },
  toggleSubjectModalActive(state, payload) {
    state.isSubjectModalActive = payload;
  },
  toggleCourseModalActive(state, payload) {
    state.isCourseModalActive = payload;
  },
  toggleLessonModalActive(state, payload) {
    state.isLessonModalActive = payload;
  },
  updateCurrentSubject(state, payload) {
    return (state.currentSubject = {
      ...state.currentSubject,
      ...payload
    });
  },
  updateCurrentCourse(state, payload) {
    return (state.currentCourse = {
      ...state.currentCourse,
      ...payload
    });
  },
  resetCurrentSubject(state, payload) {
    state.currentSubject = {};
  },
  resetCurrentCourse(state, payload) {
    state.currentCourse = {};
  }
};

export const actions = {
  updateSubjectModalActive({ commit }: any, payload: any) {
    if (!payload) {
      commit("resetCurrentSubject");
    }
    commit("toggleSubjectModalActive", payload);
  },
  updateCourseModalActive({ commit }: any, payload: any) {
    if (!payload) {
      commit("resetCurrentCourse");
    }
    commit("toggleCourseModalActive", payload);
  },
  updateLessonModalActive({ commit }: any, payload: any) {
    commit("toggleLessonModalActive", payload);
  },
  updateCurrentSubject({ commit }: any, payload) {
    commit("updateCurrentSubject", payload);
  },
  updateCurrentCourse({ commit }: any, payload) {
    commit("updateCurrentCourse", payload);
  },
  editSubject({ commit }: any, payload) {
    commit("updateCurrentSubject", payload);
    commit("toggleSubjectModalActive", true);
  },
  editCourse({ commit }: any, payload) {
    commit("updateCurrentCourse", payload);
    commit("toggleCourseModalActive", true);
  },
  async updateOrCreateSubject({ commit, state }: any, payload: any) {
    commit("toggleLoading", true);
    try {
      const subject = await fromApi.updateOrCreateSubject({
        id: state.currentSubject.id,
        title: state.currentSubject.title,
        slug: state.currentSubject.slug,
        img_url: state.currentSubject.img_url
      });
      commit("resetCurrentSubject");
      commit("toggleSubjectModalActive", false);
    } catch (error) {
      console.log(error);
    }
    commit("toggleLoading", false);
  },
  async updateOrCreateCourse({ commit, state }: any, payload: any) {
    commit("toggleLoading", true);
    try {
      const course = await fromApi.updateOrCreateCourses({
        id: state.currentCourse.id,
        subject_id: state.currentCourse.subject_id,
        title: state.currentCourse.title,
        slug: state.currentCourse.slug,
        img_url: state.currentCourse.img_url,
        description: state.currentCourse.description
      });
      commit("resetCurrentCourse");
      commit("toggleCourseModalActive", false);
    } catch (error) {
      console.log(error);
    }
    commit("toggleLoading", false);
  }
};
