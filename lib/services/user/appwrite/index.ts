import { addDocumentToAppwriteDb } from "@/lib/services";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
} = process.env;

export const addUserToDb = async (bankAccountDetails) => {
  const document = await addDocumentToAppwriteDb(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    bankAccountDetails
  );

  return document;
};
