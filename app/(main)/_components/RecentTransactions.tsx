import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";

const RecentTransactions = ({ bankAccounts = [], transactions }) => {
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transactions-history/?id={accountId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue="accountId" className="w-full">
        <TabsList className="recent-transactions-tablist">
          {bankAccounts.map((bankAccount) => (
            <TabsTrigger
              key={bankAccount?.accountId}
              value={bankAccount?.accountId}
              className="recent-transactions-tab"
            >
              <BankTabItem
                bankAccount={bankAccount}
                acountId={bankAccount?.accountId}
                key={bankAccount?.accountId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {bankAccounts.map((bankAccount) => (
          <TabsContent
            key={bankAccount?.accountId}
            value={bankAccount?.accountId}
            className="space-y-4"
          >
            <BankInfo
              account={bankAccount}
              accountId={bankAccount?.accountId}
              type="full"
            />
            <TransactionsTable transactions={transactions} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
