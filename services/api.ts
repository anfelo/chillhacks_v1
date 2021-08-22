import { db, storage } from "./firebase";

export async function getCollection(
  path: string
): Promise<{ status: number; body: any }> {
  const colRef = db.collection(path);
  const querySnapshot = await colRef.get();
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

export async function getCourses(): Promise<{ status: number; body: any }> {
  return getCollection("courses");
}

export async function getSubjects(): Promise<{ status: number; body: any }> {
  return getCollection("subjects");
}
