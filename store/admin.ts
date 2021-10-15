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
    if (!payload) {
      commit("resetCurrentLesson");
    }
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
      let subjectData: any = {
        title: state.currentSubject.title,
        slug: state.currentSubject.slug,
        img_url: state.currentSubject.img_url
      };
      if (state.currentSubject.id) {
        subjectData.id = state.currentSubject.id;
      }
      await fromApi.updateOrCreateSubject(subjectData);
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
      let courseData: any = {
        subject_id: state.currentCourse.subject_id,
        title: state.currentCourse.title,
        slug: state.currentCourse.slug,
        img_url: state.currentCourse.img_url,
        description: state.currentCourse.description,
        lessons_count: 0
      };
      if (state.currentCourse.id) {
        courseData.id = state.currentCourse.id;
      }
      await fromApi.updateOrCreateCourses(courseData);
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
      let lessonData: any = {
        course_id: state.currentLesson.course_id,
        title: state.currentLesson.title,
        slug: state.currentLesson.slug,
        category: state.currentLesson.category,
        sorting_order: +state.currentLesson.sorting_order,
        duration: "5m read",
        content_filename: state.currentLesson.content_file.name
      };
      if (state.currentLesson.id) {
        lessonData.id = state.currentLesson.id;
      }
      await fromApi.updateOrCreateLessons(lessonData);
      if (
        state.currentLesson.content_file &&
        state.currentLesson.content_file.name
      ) {
        await fromApi.uploadFile(
          `courses/${state.currentLesson.course_id}/${state.currentLesson.content_file.name}`,
          state.currentLesson.content_file
        );
      }
      commit("resetCurrentLesson");
      commit("toggleLessonModalActive", false);
      dispatch("getLessonsData", null, { root: true });
    } catch (error) {
      console.log(error);
    }
    commit("toggleLoading", false);
  }
};
