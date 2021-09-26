import axios from "axios";

const client = axios.create({
  baseURL: "http://www.chillhacks.com/auth"
});

export async function signInWithUsernameAndPassword(
  username: string,
  password: string
): Promise<{ status: number; body: any }> {
  try {
    const data = {
      username,
      password
    };
    const res = await client.post("/login", data);
    return {
      status: 200,
      body: res.data || {}
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function signOut(): Promise<{ status: number; body: any }> {
  try {
    const res = await client.get("/logout");
    return {
      status: 200,
      body: res.data || {}
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function getCurrentUser(): Promise<{ status: number; body: any }> {
  try {
    const res = await client.get("/currentuser");
    return {
      status: 200,
      body: res.data && res.data.user ? res.data.user : null
    };
  } catch (error) {
    return { status: 400, body: null };
  }
}
