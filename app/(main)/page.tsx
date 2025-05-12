import HeaderBox from "@/components/shared/HeaderBox";
import React from "react";
import TotalBalanceCard from "./_components/TotalBalanceCard";
import DashboardRightSidebar from "./_components/DashboardRightSidebar";

const Dashboard = () => {
  const loggedIn = {
    firstName: "Ebuka",
    lastName: "Chuqz",
  };
  const banks = [
    {
      $id: "1",
      name: "Zenith Bank",
      balance: 1023400,
    },
    {
      $id: "2",
      name: "First Bank",
      balance: 105500,
    },
  ];
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Monitor your money with ease and confidence."
          />

          <TotalBalanceCard totalBanks={1} totalCurrentBalance={75534.5} />
        </header>
      </div>
      <DashboardRightSidebar banks={banks} user={loggedIn} transactions={[]} />
    </section>
  );
};

export default Dashboard;
