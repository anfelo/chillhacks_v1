import axios from "axios";
import * as fromLocalStorage from "@/services/localStorage";

const client = axios.create({
  baseURL: "https://chillhacks.com/auth"
});

const getClient = () => {
  const token = fromLocalStorage.loadEntry("token");
  if (token) {
    return axios.create({
      baseURL: "https://chillhacks.com/auth",
      headers: {
        Authorization: token
      }
    });
  } else {
    return client;
  }
};

export async function signInWithUsernameAndPassword(
  username: string,
  password: string
): Promise<{ status: number; body: any }> {
  try {
    const data = {
      username,
      password
    };
    const res = await getClient().post("/login", data);
    if (res.data && res.data.token) {
      fromLocalStorage.saveEntry({ key: "token", value: res.data.token });
    }
    return {
      status: 200,
      body: res.data.user || {}
    };
  } catch (error) {
    return { status: 400, body: {} };
  }
}

export async function signOut(): Promise<{ status: number; body: any }> {
  try {
    const res = await getClient().get("/logout");
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
    const res = await getClient().get("/currentuser");
    return {
      status: 200,
      body: res.data && res.data.user ? res.data.user : null
    };
  } catch (error) {
    return { status: 400, body: null };
  }
}
