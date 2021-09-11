import { db, storage } from "./firebase";
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.baseUrl,
});

async function getDocument(
  path: string,
  id: string
): Promise<{ status: number; body: any }> {
  const docRef = db.collection(path).doc(id);
  const doc = await docRef.get();
  const data = doc.data();

  if (data) {
    return {
      status: 200,
      body: {
        id: doc.id,
        ...data
      }
    };
  } else {
    return { status: 400, body: {} };
  }
}

export async function getCourses(): Promise<{ status: number; body: any }> {
  try {
    const res = await client.get('/api/courses')
    return {
      status: 200,
      body: res.data
    };
  } catch (error) {
    console.log(error);
    return { status: 400, body: {} };
  }
}

export async function getSubjects(): Promise<{ status: number; body: any }> {
  try {
    const res = await client.get('/api/subjects');
    return {
      status: 200,
      body: res.data
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function getCourse(
  id: string
): Promise<{ status: number; body: any }> {
  try {
    const courseRes = await axios(`http://chillhacks.com/api/courses/${id}`);
    const lessonsRes = await axios(`http://chillhacks.com/api/courses/${id}/lessons`);
    if (courseRes.data) {
      return {
        status: 200,
        body: {
          ...courseRes.data,
          lessons: lessonsRes.data
        }
      };
    }
    return { status: 400, body: {} };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function getLesson({
  course,
  lesson
}): Promise<{ status: number; body: any }> {
  const res = await getDocument(`courses/${course}/lessons`, lesson);
  if (res.body.slug) {
    const storageRef = storage.ref(`courses/${course}/${res.body.slug}.md`);
    const contentUrl = await storageRef.getDownloadURL();
    const contentRes = await fetch(contentUrl);
    const contentString = await streamToString(contentRes.body);
    res.body.content = contentString;
  }
  return res;
}

function streamToString(stream): Promise<string> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("error", err => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
