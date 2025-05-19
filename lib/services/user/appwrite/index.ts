import {
  addDocumentToAppwriteDb,
  getDocumentsFromAppwriteDb,
} from "@/lib/server/appwrite";
import { Query } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION_ID: USERS_COLLECTION_ID,
} = process.env;

export const addUserToDb = async (userDetails) => {
  const document = await addDocumentToAppwriteDb(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    userDetails
  );

  return document;
};

export const getUserFromDb = async (userId: string) => {
  const user = await getDocumentsFromAppwriteDb(
    DATABASE_ID!,
    USERS_COLLECTION_ID!,
    [Query.equal("userId", userId)]
  );
  return user;
};
