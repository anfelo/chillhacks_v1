import axios from "axios";
import {
  getCollection,
  getDocument,
  addOrUpdateDocument,
  getObjectUrl,
  uploadObject
} from "./firebase";

export async function getCourses(): Promise<{ status: number; body: any }> {
  try {
    return await getCollection("courses");
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}

export async function getLessons(
  courseID: string
): Promise<{ status: number; body: any }> {
  try {
    return await getCollection(`courses/${courseID}/lessons`);
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}

export async function getSubjects(): Promise<{ status: number; body: any }> {
  try {
    return await getCollection("subjects");
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function updateOrCreateSubject(
  subject: any
): Promise<{ status: number; body: any }> {
  try {
    const res = await addOrUpdateDocument("subjects", subject);
    return {
      status: 200,
      body: res
    };
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}

export async function getCourse(
  id: string
): Promise<{ status: number; body: any }> {
  try {
    const courseRes = await getDocument("courses", id);
    const lessonsRes = await getCollection(`courses/${id}/lessons`);
    return {
      status: 200,
      body: {
        ...courseRes.body,
        lessons: lessonsRes.body
      }
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function updateOrCreateCourses(
  course: any
): Promise<{ status: number; body: any }> {
  try {
    const res = await addOrUpdateDocument("courses", course);
    return {
      status: 200,
      body: res
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
    const res = await getDocument(`courses/${courseID}/lessons`, lessonID);
    if (res.body.content_filename) {
      const contentUrl = await getObjectUrl(
        `courses/${courseID}/${res.body.content_filename}`
      );
      const contentRes = await axios.get(contentUrl);
      const contentString = contentRes.data;
      res.body.content = contentString;
    }
    return {
      status: 200,
      body: res.body
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function updateOrCreateLessons(
  lesson: any
): Promise<{ status: number; body: any }> {
  try {
    const res = await addOrUpdateDocument(
      `courses/${lesson.course_id}/lessons`,
      lesson
    );
    const courseRes = await getDocument("courses", lesson.course_id);
    if (courseRes.status === 200) {
      const course = courseRes.body;
      await addOrUpdateDocument("courses", {
        id: course.id,
        lessons_count: course.lessons_count + 1
      });
    }
    return {
      status: 200,
      body: res
    };
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}

export async function uploadFile(
  path: string,
  file: File
): Promise<{ status: number; body: any }> {
  try {
    const res = await uploadObject(path, file);
    return {
      status: 200,
      body: res
    };
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}
