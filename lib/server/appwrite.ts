"use server";
import { cookies } from "next/headers";
import { Account, Client, Databases, Users, Models } from "node-appwrite";

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
export async function createDocument<T extends object>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: T
): Promise<T & Models.Document> {
  const { database } = await createAdminClient();

  const document = await database.createDocument(
    databaseId,
    collectionId,
    documentId,
    data
  );

  return document as unknown as T & Models.Document;
}

/**
 * Generic function to get documents from any collection filtered by a user ID
 */
// export async function getUserDocuments<T>(
//   databaseId: string,
//   collectionId: string,
//   userId: string,
//   queries: string[] = []
// ): Promise<T[]> {
//   const { database } = await createAdminClient();

//   const response = await database.listDocuments(databaseId, collectionId, [
//     Query.equal("userId", userId),
//     ...queries.map((query) => Query.parse(query)),
//   ]);

//   return response.documents as unknown as T[];
// }

/**
 * Generic function to get a single document by ID
 */
export async function getDocument<T>(
  databaseId: string,
  collectionId: string,
  documentId: string
): Promise<T & Models.Document> {
  const { database } = await createAdminClient();

  const document = await database.getDocument(
    databaseId,
    collectionId,
    documentId
  );

  return document as unknown as T & Models.Document;
}

/**
 * Generic function to update a document
 */
export async function updateDocument<T extends object>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Partial<T>
): Promise<T & Models.Document> {
  const { database } = await createAdminClient();

  const document = await database.updateDocument(
    databaseId,
    collectionId,
    documentId,
    data
  );

  return document as unknown as T & Models.Document;
}

/**
 * Generic function to delete a document
 */
export async function deleteDocument(
  databaseId: string,
  collectionId: string,
  documentId: string
): Promise<boolean> {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(databaseId, collectionId, documentId);

    return true;
  } catch (error) {
    console.error("Failed to delete document:", error);
    return false;
  }
}
