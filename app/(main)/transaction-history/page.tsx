import {
  getBankAccountTransactionsAction,
  getUserBanksDataAction,
  getUserDataAction,
} from "@/actions";
import HeaderBox from "@/components/shared/HeaderBox";
import { formatAmount } from "@/lib/utils";
import React from "react";
import TransactionsTable from "../_components/TransactionsTable";

const TransactionHistoryPage = async () => {
  const userDocument: any = await getUserDataAction();
  const userData = userDocument.documents[0];

  const banksDocument: any = await getUserBanksDataAction();
  const bankAccounts: any[] = banksDocument.documents;

  const transactions = await getBankAccountTransactionsAction(
    bankAccounts[0].accountId
  );

  const totalBalance = bankAccounts.reduce((total, bank) => {
    const bankBalance = parseFloat(bank.balance || 0);
    return total + bankBalance;
  }, 0);
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="My Transactions"
          subtext="Review your bank details and transactions"
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-semibold text-white">
              {bankAccounts[0].institutionName}
            </h2>
            <p className="text-14 text-blue-25">
              {bankAccounts[0].institutionType}
            </p>
            <p className="text-16 font-semibold tracing-[1.1px] text-white">
              {bankAccounts[0].accountNumber}
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(bankAccounts[0].balance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable transactions={transactions.data || []} />
        </section>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
