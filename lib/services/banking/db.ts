import {
  addDocumentToAppwriteDb,
  getDocumentsFromAppwriteDb,
} from "@/lib/server/appwrite";
import { Query } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_BANKS_COLLECTION_ID: BANKS_COLLECTION_ID,
} = process.env;

export const addBankAccountToDb = async (
  bankAccountDetails: MonoBankAccountData
) => {
  const document = await addDocumentToAppwriteDb(
    DATABASE_ID!,
    BANKS_COLLECTION_ID!,
    bankAccountDetails
  );

  return document;
};

export const getUserBanksData = async (userId: string) => {
  const documents = await getDocumentsFromAppwriteDb(
    DATABASE_ID!,
    BANKS_COLLECTION_ID!,
    [Query.equal("userId", userId)]
  );
  return documents;
};
