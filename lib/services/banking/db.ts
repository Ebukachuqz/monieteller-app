import { addDocumentToAppwriteDb } from "@/lib/services";

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
