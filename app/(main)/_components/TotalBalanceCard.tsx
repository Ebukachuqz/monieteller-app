import AnimateCashBalance from "@/components/shared/AnimateCashBalance";
import React from "react";
import BanksBalanceDoughnutChart from "./BanksBalanceDoughnutChart";

const TotalBalanceCard = ({
  accounts = [],
  totalBanks = 0,
  totalCurrentBalance = 0,
}) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <BanksBalanceDoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-1">
          <p className="total-balance-label">Total Current Balance</p>

          <div className="total-balance-amount flex-center gap-2">
            <AnimateCashBalance amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceCard;
