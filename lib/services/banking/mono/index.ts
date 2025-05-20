import { parseStringify } from "@/lib/utils";
import axios from "axios";

export async function exchangeToken(code: string): Promise<string> {
  console.log("Exchanging token with Mono:", code);

  const options = {
    method: "POST",
    url: "https://api.withmono.com/v2/accounts/auth",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "mono-sec-key": process.env.MONO_SECRET_KEY,
    },
    data: { code },
  };

  try {
    const response = await axios.request(options);
    console.log("Mono response:", response.data);

    const accountId = response.data?.data?.id;
    if (!accountId) {
      throw new Error("No account ID returned from Mono");
    }

    console.log("Mono account ID:", accountId);
    return accountId;
  } catch (error: any) {
    console.error("Error exchanging token:", error?.response?.data || error);
    throw {
      message:
        error?.response?.data?.message || "Failed to get account ID from Mono",
    };
  }
}

export async function getBankAccountInfo(
  accountId: string
): Promise<MonoBankAccountResponseData> {
  console.log("Getting bank account info for account ID:", accountId);

  const url = `https://api.withmono.com/v2/accounts/${accountId}`;
  const headers = {
    accept: "application/json",
    // "x-real-time": true,
    "mono-sec-key": process.env.MONO_SECRET_KEY,
  };

  try {
    const response = await axios.get(url, { headers });
    const result = response.data;

    if (!result?.data?.account || !result?.data?.meta) {
      throw new Error("Incomplete account data from Mono");
    }

    console.log("Mono account data:", parseStringify(result));

    const accountData = {
      accountId: result.data.account.id,
      institutionBankCode:
        result.data.account.institution?.bank_code || "Unknown Bank",
      institutionName: result.data.account.institution?.name || "Unknown Bank",
      accountName: result.data.account.name,
      accountNumber: result.data.account.account_number,
      currency: result.data.account.currency,
      accountType: result.data.account.type,
      dataStatus: result.data.meta.data_status,
      bvn: result.data.account.bvn,
      institutionType: result.data.account.institution?.type || "Unknown Type",
      balance: result.data.account.balance,
    };

    console.log("Formatted account data:", accountData);
    return accountData;
  } catch (error: any) {
    console.error(
      "Error getting account data:",
      error?.response?.data || error
    );
    throw {
      message:
        error?.response?.data?.message ||
        "Failed to fetch account data from Mono",
    };
  }
}

export async function getBankAccountTransactions(accountId: string) {
  try {
    const response = await axios.get(
      `https://api.withmono.com/v2/accounts/${accountId}/transactions`,
      {
        headers: {
          accept: "application/json",
          "mono-sec-key": process.env.MONO_SECRET_KEY!,
        },
      }
    );

    const { status, data, message } = response.data;

    if (status !== "successful") {
      throw new Error(message || "Failed to fetch transactions");
    }

    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something went wrong"
    );
  }
}
