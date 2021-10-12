import * as fromApi from "@/services/api";

export const state = () => ({
  loading: false,
  currentSubject: {},
  currentCourse: {},
  currentLesson: {},
  isSubjectModalActive: false,
  isCourseModalActive: false,
  isLessonModalActive: false
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
  updateCurrentLesson(state, payload) {
    return (state.currentLesson = {
      ...state.currentLesson,
      ...payload
    });
  },
  resetCurrentSubject(state, payload) {
    state.currentSubject = {};
  },
  resetCurrentCourse(state, payload) {
    state.currentCourse = {};
  },
  resetCurrentLesson(state, payload) {
    state.currentLesson = {};
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
  updateCurrentLesson({ commit }: any, payload) {
    commit("updateCurrentLesson", payload);
  },
  editSubject({ commit }: any, payload) {
    commit("updateCurrentSubject", payload);
    commit("toggleSubjectModalActive", true);
  },
  editCourse({ commit }: any, payload) {
    commit("updateCurrentCourse", payload);
    commit("toggleCourseModalActive", true);
  },
  editLesson({ commit }: any, payload) {
    commit("updateCurrentLesson", payload);
    commit("toggleLessonModalActive", true);
  },
  async updateOrCreateSubject({ commit, dispatch, state }: any, payload: any) {
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
      dispatch("getSubjectsData", null, { root: true });
    } catch (error) {
      console.log(error);
    }
    commit("toggleLoading", false);
  },
  async updateOrCreateCourse({ commit, dispatch, state }: any, payload: any) {
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
      dispatch("getCoursesData", null, { root: true });
    } catch (error) {
      console.log(error);
    }
    commit("toggleLoading", false);
  },
  async updateOrCreateLesson({ commit, dispatch, state }: any, payload: any) {
    commit("toggleLoading", true);
    try {
      const lesson = await fromApi.updateOrCreateLessons({
        id: state.currentLesson.id,
        course_id: state.currentLesson.course_id,
        title: state.currentLesson.title,
        slug: state.currentLesson.slug,
        category: state.currentLesson.category,
        sorting_order: +state.currentLesson.sorting_order,
        content: state.currentLesson.content
      });
      commit("resetCurrentLesson");
      commit("toggleLessonModalActive", false);
      dispatch("getCoursesData", null, { root: true });
    } catch (error) {
      console.log(error);
    }
    commit("toggleLoading", false);
  }
};
