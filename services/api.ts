import { db, storage } from "./firebase";

export async function getBio(): Promise<{ status: number; body: any }> {
  const bioRef = db.collection("bio").doc("anfelo");
  const bioDoc = await bioRef.get();
  const data = bioDoc.data();
  if (data && data.avatar) {
    const storageRef = storage.refFromURL(data.avatar);
    const imgUrl = await storageRef.getDownloadURL();
    data.avatarUrl = imgUrl;
  }
  if (data !== null) {
    return {
      status: 200,
      body: data
    };
  } else {
    return { status: 400, body: {} };
  }
}

export async function getProjects(): Promise<{ status: number; body: any }> {
  const projectsRef = db.collection("projects");
  const querySnapshot = await projectsRef.get();
  const projectsData: any[] = [];

  querySnapshot.forEach(doc => {
    projectsData.push(doc.data());
  });

  return {
    status: 200,
    body: [...projectsData]
  };
}

export async function getBlogPosts(): Promise<{
  status: number;
  body: any;
}> {
  const articlesRef = db.collection("articles");
  const querySnapshot = await articlesRef.get();
  const articlesData: any[] = [];

  querySnapshot.forEach(doc => {
    const docData = doc.data();
    articlesData.push({
      ...docData,
      publishedOn: docData.publishedOn.toDate()
    });
  });

  return {
    status: 200,
    body: articlesData
  };
}

export async function getBlogPost(
  slug: string
): Promise<{ status: number; body: any }> {
  const bioRef = db.collection("articles").doc(slug);
  const bioDoc = await bioRef.get();
  const data = bioDoc.data();

  if (data && data.slug) {
    const storageRef = storage.ref(`articles/${data.slug}.md`);
    const contentUrl = await storageRef.getDownloadURL();
    const contentRes = await fetch(contentUrl);
    const contentString = await streamToString(contentRes.body);
    data.content = contentString;
  }

  if (data) {
    return {
      status: 200,
      body: {
        ...data,
        publishedOn: data.publishedOn.toDate()
      }
    };
  } else {
    return { status: 400, body: {} };
  }
}

export async function getSnippets(): Promise<{
  status: number;
  body: any;
}> {
  const snippetsRef = db.collection("snippets");
  const querySnapshot = await snippetsRef.get();
  const snippetsData: any[] = [];

  querySnapshot.forEach(doc => {
    const docData = doc.data();
    snippetsData.push({
      ...docData
    });
  });

  return {
    status: 200,
    body: snippetsData
  };
}

export async function getSnippet(
  slug: string
): Promise<{ status: number; body: any }> {
  const storageRef = storage.ref(`snippets/${slug}.md`);
  const contentUrl = await storageRef.getDownloadURL();
  const contentRes = await fetch(contentUrl);
  let contentString = "";
  if (contentRes.ok) {
    contentString = await streamToString(contentRes.body);
  }

  if (contentString) {
    return {
      status: 200,
      body: {
        content: contentString
      }
    };
  } else {
    return { status: 400, body: {} };
  }
}

function streamToString(stream): Promise<string> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("error", err => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
