import axios from "axios";
import { db, storage } from "./firebase";
import {
  collection,
  doc,
  orderBy,
  query,
  getDocs,
  getDoc
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

async function getCollection(
  path: string,
  sortBy?: { key: string; direction: "desc" | "asc" }
): Promise<{ status: number; body: any }> {
  const colRef = collection(db, path);
  let queryRef;
  if (sortBy) {
    queryRef = query(colRef, orderBy(sortBy.key, sortBy.direction));
  }
  const querySnapshot = queryRef
    ? await getDocs(queryRef)
    : await getDocs(colRef);
  const colData: any[] = [];

  querySnapshot.forEach(doc => {
    const data: any = doc.data();
    colData.push({
      id: doc.id,
      ...data
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
  const docRef = doc(db, path, id);
  const docSnap = await getDoc(docRef);
  const data: any = docSnap.data();

  if (data) {
    return {
      status: 200,
      body: {
        id: docSnap.id,
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
    const storageRef = ref(storage, `courses/${course}/${res.body.slug}.md`);
    const contentUrl = await getDownloadURL(storageRef);
    const contentRes = await axios.get(contentUrl);
    const contentString = contentRes.data;
    res.body.content = contentString;
  }
  return res;
}
