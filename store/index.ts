import * as fromApi from "@/services/api";

export const state = () => ({
  appTheme: "dark-theme",
  courses: [],
  subjects: [],
  lessons: [],
  currentCourse: {},
  currentLesson: {}
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
  updateLessons: (state, payload) => {
    state.lessons = payload;
  },
  updateCurrentCourse: (state, payload) => {
    state.currentCourse = payload;
  },
  updateCurrentLesson: (state, payload) => {
    state.currentLesson = payload;
  }
};

export const actions = {
  async getSubjectsData({ commit }) {
    try {
      const res = await fromApi.getSubjects();
      if (res.status === 200) {
        commit("updateSubjects", res.body);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getCoursesData({ commit }) {
    try {
      const res = await fromApi.getCourses();
      if (res.status === 200) {
        commit("updateCourses", res.body);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getLessonsData({ commit, state }) {
    try {
      let lessons: any[] = [];
      for (let index = 0; index < state.courses.length; index++) {
        const course = state.courses[index];
        const lessonsRes = await fromApi.getLessons(course.id);
        lessons.push(...lessonsRes.body);
      }
      commit("updateLessons", lessons);
    } catch (error) {
      console.log(error);
    }
  },
  async getCourseData({ state, commit, dispatch }, payload) {
    if (state.currentCourse.slug === payload) return;
    if (!state.courses || !state.courses.length) {
      await dispatch("getCoursesData");
    }
    try {
      const course = state.courses.find(course => course.slug === payload);
      if (course) {
        const res = await fromApi.getCourse(course.id);
        if (res.status === 200) {
          commit("updateCurrentCourse", res.body);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getLessonData({ state, commit, dispatch }, payload) {
    if (state.currentLesson.slug === payload.lesson) return;
    if (state.currentCourse.slug !== payload.course) {
      await dispatch("getCourseData", payload.course);
    }
    try {
      const courseID = state.currentCourse.id;
      const lessonID = state.currentCourse.lessons.find(
        lesson => lesson.slug === payload.lesson
      ).id;
      const res = await fromApi.getLesson({ courseID, lessonID });
      if (res.status === 200) {
        commit("updateCurrentLesson", res.body);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
