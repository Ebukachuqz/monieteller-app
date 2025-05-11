import HeaderBox from "@/components/shared/HeaderBox";
import React from "react";
import TotalBalanceCard from "./_components/TotalBalanceCard";

const Dashboard = () => {
  const loggedIn = {
    firstName: "Ebuka",
    lastName: "Chuqz",
  };
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
    </section>
  );
};

export default Dashboard;
