"use server";
import {
  createAdminClient,
  createSessionClient,
  getLoggedInUser,
} from "@/lib/server/appwrite";
import { getAuthenticatedUser, getUserFromDb } from "@/lib/services";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction({ email, password }: signInProps) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("auth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(session);
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

export async function getLoggedInUserAction() {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  return user;
}

export async function signOutAction() {
  try {
    const { account } = await createSessionClient();
    cookies().delete("auth-session");
    return await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export async function getUserDataAction() {
  const user = await getAuthenticatedUser();
  // if (!user) redirect("/sign-in");

  const userData = getUserFromDb(user.$id);
  // console.log("User Data:", userData);

  return userData;
}