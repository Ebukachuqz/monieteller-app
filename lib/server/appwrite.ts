"use server";
import { cookies } from "next/headers";
import { Account, Client, Databases, Users, Models, ID } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = await cookies().get("auth-session");
  if (!session || !session.value) {
    throw new Error("Session not found");
  }

  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

/**
 * Generic function to create a document in any collection
 */
export async function addDocumentToAppwriteDb<T extends object>(
  databaseId: string,
  collectionId: string,
  data: T
): Promise<T & Models.Document> {
  const { database } = await createAdminClient();
  try {
    const document = await database.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      { ...data }
    );
    return document as unknown as T & Models.Document;
  } catch (error: any) {
    console.error("Error creating document:", error);
    throw new Error(error?.message || "Failed to create document");
  }
}

/**
 * Generic function to fetch documents
 */
export async function getDocumentsFromAppwriteDb<T = Models.Document>(
  databaseId: string,
  collectionId: string,
  queries: string[] = []
): Promise<T[]> {
  const { database } = await createAdminClient();
  try {
    const documents = await database.listDocuments(
      databaseId,
      collectionId,
      queries
    );
    return documents as unknown as T[];
  } catch (err: any) {
    console.error(`Appwrite getDocuments error:`, err);
    throw new Error(err?.message || "Failed to fetch documents");
  }
}
