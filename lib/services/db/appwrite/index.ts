import { createAdminClient } from "@/lib/server/appwrite";
import { ID, Models } from "node-appwrite";

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
  } catch (error) {
    console.error("Error creating document:", error);
    throw new Error("Failed to create document");
  }
}
