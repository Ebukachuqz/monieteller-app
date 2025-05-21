import { getUserBanksDataAction, getUserDataAction } from "@/actions";
import HeaderBox from "@/components/shared/HeaderBox";
import React from "react";
import BankCard from "../_components/BankCard";

const MyBanksPage = async () => {
  const userDocument: any = await getUserDataAction();
  const userData = userDocument.documents[0];

  const banksDocument: any = await getUserBanksDataAction();
  const bankAccounts: any[] = banksDocument.documents;
  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Banks"
          subtext="Manage your bank accounts and transactions"
        />

        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>
          <div className="flex flex-wrap gap-6">
            {bankAccounts?.length > 0 &&
              bankAccounts.map((account) => (
                <BankCard
                  key={account?.$id}
                  account={account}
                  userName={`${account.accountName}`}
                  showBalance={false}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanksPage;
