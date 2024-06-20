"use server";

import { getUser } from "@/util/api";
interface UserDataType {
  id: number | null;
  email?: string;
  nickname?: string;
  profileImageUrl?: null | null;
  createdAt?: string;
  updatedAt?: string;
}

const fetchCurrentUserData = async () => {
  try {
    const userData: UserDataType = await getUser();
    return userData;
  } catch {
    return { id: null };
  }
};

export default fetchCurrentUserData;
