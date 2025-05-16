"use server";

import { cookies } from "next/headers";
import { addUserToDb, createNewUser, createUserSession } from "@/lib/services";

export async function signUpAction(formData: SignUpParams) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      address1,
      state,
      country,
      dateOfBirth,
    } = formData;

    const newUserAccount = await createNewUser(
      email,
      password,
      firstName!,
      lastName!
    );

    const newUser = await addUserToDb({
      userId: newUserAccount.$id,
      email,
      firstName,
      lastName,
      address1,
      state,
      country,
      dateOfBirth,
    });

    const session = await createUserSession(email, password);

    cookies().set("auth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return newUser;
  } catch (error) {
    console.log("Error signing up:", error);
  }
}
