import axios from "axios";
import { signOut } from "next-auth/react";

export const getMe = async (token:string) => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,{headers:{Authorization:`Bearer ${token}`}}
    );
    return data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401) {
        signOut();
        return;
      }
    }
  }
};
