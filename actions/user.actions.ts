"use server";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";

export async function signUpAction(formData: SignUpParams) {
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
}

export async function getLoggedInUserAction() {
  const user = await getLoggedInUser();

  if (!user) redirect("/signup");

  return user;

  //   redirect("/account");
}
