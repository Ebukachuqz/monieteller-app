"use server";

import {
  addBankAccountToDb,
  exchangeToken,
  getAuthenticatedUser,
  getBankAccountInfo,
} from "@/lib/services";

export async function exchangeTokenAction(code: string) {
  try {
    console.log("🔁 Starting server action: exchangeTokenAction");

    if (!code) {
      throw new Error("Missing authorization code");
    }

    const user = await getAuthenticatedUser();
    const userId = user.$id;
    console.log("Authenticated User:", user);
    console.log("Authenticated User ID:", userId);

    const accountId = await exchangeToken(code);
    console.log("Mono Account ID:", accountId);

    const bankAccountData = await getBankAccountInfo(accountId);
    console.log("Bank Account Data:", bankAccountData);

    const bankAccountDoc = await addBankAccountToDb({
      ...bankAccountData,
      userId: userId,
    });
    console.log("Bank Account Document saved:", bankAccountDoc);

    return {
      success: true,
      message: "Mono linking success",
      data: bankAccountDoc,
    };
  } catch (error: any) {
    const errorMessage = error?.message || "Failed to link Mono account";
    throw new Error("exchangeTokenAction failed:", errorMessage);
  }
}
