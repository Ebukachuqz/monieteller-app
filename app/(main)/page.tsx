import HeaderBox from "@/components/shared/HeaderBox";
import React from "react";
import TotalBalanceCard from "./_components/TotalBalanceCard";
import DashboardRightSidebar from "./_components/DashboardRightSidebar";
import { getUserBanksDataAction, getUserDataAction } from "@/actions";

const Dashboard = async () => {
  const userDocument: any = await getUserDataAction();
  const userData = userDocument.documents[0];

  const banksDocument: any = await getUserBanksDataAction();
  const banks: any[] = banksDocument.documents;

  const totalBalance = banks.reduce((total, bank) => {
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
            totalBanks={banks.length}
            totalCurrentBalance={totalBalance}
            accounts={banks}
          />
        </header>
      </div>
      <DashboardRightSidebar banks={banks} user={userData} transactions={[]} />
    </section>
  );
};

export default Dashboard;
