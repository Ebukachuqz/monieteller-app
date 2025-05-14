"use server";
import {
  createAdminClient,
  createSessionClient,
  getLoggedInUser,
} from "@/lib/server/appwrite";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

export async function signUpAction(formData: SignUpParams) {
  try {
    const { account } = await createAdminClient();
    const { email, password, firstName, lastName } = formData;
    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("auth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return newUser;
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

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
