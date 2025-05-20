import HeaderBox from "@/components/shared/HeaderBox";
import React from "react";
import TotalBalanceCard from "./_components/TotalBalanceCard";
import DashboardRightSidebar from "./_components/DashboardRightSidebar";
import {
  getBankAccountTransactionsAction,
  getUserBanksDataAction,
  getUserDataAction,
} from "@/actions";
import RecentTransactions from "./_components/RecentTransactions";

const Dashboard = async () => {
  const userDocument: any = await getUserDataAction();
  const userData = userDocument.documents[0];

  const banksDocument: any = await getUserBanksDataAction();
  const bankAccounts: any[] = banksDocument.documents;
  // console.log("Bank Accounts:", bankAccounts[0]);

  const transactions = await getBankAccountTransactionsAction(
    bankAccounts[0].accountId
  );
  // console.log("Transactions:", transactions);

  const totalBalance = bankAccounts.reduce((total, bank) => {
    const bankBalance = parseFloat(bank.balance || 0);
    return total + bankBalance;
  }, 0);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={userData?.firstName || "Guest"}
            subtext="Monitor your money with ease and confidence."
          />

          <TotalBalanceCard
            totalBanks={bankAccounts.length}
            totalCurrentBalance={totalBalance}
            accounts={bankAccounts}
          />
        </header>

        <RecentTransactions
          bankAccounts={bankAccounts}
          transactions={transactions.data || []}
        />
      </div>
      <DashboardRightSidebar
        banks={bankAccounts}
        user={userData}
        transactions={[]}
      />
    </section>
  );
};

export default Dashboard;
