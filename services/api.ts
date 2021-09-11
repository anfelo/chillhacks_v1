import axios from "axios";

const client = axios.create({
  baseURL: "http://www.chillhacks.com/api"
});

export async function getCourses(): Promise<{ status: number; body: any }> {
  try {
    const res = await client.get("/courses");
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
    const res = await client.get("/subjects");
    return {
      status: 200,
      body: res.data.results ? res.data.results : []
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function getCourse(
  id: string
): Promise<{ status: number; body: any }> {
  try {
    const courseRes = await client.get(`/courses/${id}`);
    const lessonsRes = await client.get(`/courses/${id}/lessons`);
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

export async function getLesson({
  courseID,
  lessonID
}): Promise<{ status: number; body: any }> {
  try {
    const res = await client.get(`/courses/${courseID}/lessons/${lessonID}`);
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
