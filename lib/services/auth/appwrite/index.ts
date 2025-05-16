import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";

export async function createNewUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const { account } = await createAdminClient();
  const newUser = await account.create(
    ID.unique(),
    email,
    password,
    `${firstName} ${lastName}`
  );

  return newUser;
}

export async function createUserSession(email: string, password: string) {
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  return session;
}

export async function getAuthenticatedUser() {
  const { account } = await createSessionClient();
  return await account.get();
}
