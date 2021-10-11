import axios from "axios";
import * as fromLocalStorage from "@/services/localStorage";

const client = axios.create({
  baseURL: "https://chillhacks.com/api"
});

const getClient = () => {
  const token = fromLocalStorage.loadEntry("token");
  if (token) {
    return axios.create({
      baseURL: "https://chillhacks.com/api",
      headers: {
        Authorization: token
      }
    });
  } else {
    return client;
  }
};

export async function getCourses(): Promise<{ status: number; body: any }> {
  try {
    const res = await getClient().get("/courses");
    return {
      status: 200,
      body: res.data.results ? res.data.results : []
    };
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}

export async function getSubjects(): Promise<{ status: number; body: any }> {
  try {
    const res = await getClient().get("/subjects");
    return {
      status: 200,
      body: res.data.results ? res.data.results : []
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function updateOrCreateSubject(
  subject: any
): Promise<{ status: number; body: any }> {
  try {
    let res;
    if (subject.id) {
      res = await getClient().put(`/subjects/${subject.id}`, subject);
    } else {
      res = await getClient().post(`/subjects`, subject);
    }
    return {
      status: 200,
      body: res.data ? res.data : {}
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function getCourse(
  id: string
): Promise<{ status: number; body: any }> {
  try {
    const courseRes = await getClient().get(`/courses/${id}`);
    const lessonsRes = await getClient().get(`/courses/${id}/lessons`);
    if (courseRes.data) {
      return {
        status: 200,
        body: {
          ...courseRes.data,
          lessons: lessonsRes.data.results
        }
      };
    }
    return { status: 400, body: {} };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function updateOrCreateCourses(
  course: any
): Promise<{ status: number; body: any }> {
  try {
    let res;
    if (course.id) {
      res = await getClient().put(`/courses/${course.id}`, course);
    } else {
      res = await getClient().post(`/courses`, course);
    }
    return {
      status: 200,
      body: res.data ? res.data : {}
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function getLesson({
  courseID,
  lessonID
}): Promise<{ status: number; body: any }> {
  try {
    const res = await getClient().get(
      `/courses/${courseID}/lessons/${lessonID}`
    );
    return {
      status: 200,
      body: {
        ...res.data
      }
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}
