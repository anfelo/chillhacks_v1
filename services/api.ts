import { db, storage } from "./firebase";

async function getCollection(
  path: string,
  sortBy?: { key: string; direction: "desc" | "asc" }
): Promise<{ status: number; body: any }> {
  const colRef = db.collection(path);
  let queryRef;
  if (sortBy) {
    queryRef = colRef.orderBy(sortBy.key, sortBy.direction);
  }
  const querySnapshot = queryRef ? await queryRef.get() : await colRef.get();
  const colData: any[] = [];

  querySnapshot.forEach(doc => {
    colData.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return {
    status: 200,
    body: [...colData]
  };
}

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
  return getCollection("courses");
}

export async function getSubjects(): Promise<{ status: number; body: any }> {
  return getCollection("subjects");
}

export async function getCourse(
  id: string
): Promise<{ status: number; body: any }> {
  const courseRes = await getDocument("courses", id);
  if (courseRes.status === 400) return courseRes;
  const lessonsRes = await getCollection(`courses/${id}/lessons`, {
    key: "order",
    direction: "asc"
  });
  return {
    ...courseRes,
    body: {
      ...courseRes.body,
      lessons: lessonsRes.body
    }
  };
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
