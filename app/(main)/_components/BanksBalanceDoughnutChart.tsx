"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  accounts: {
    institutionName: string;
    balance: number;
  }[];
};

const BanksBalanceDoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const chartData = {
    labels: accounts.map((acc) => acc.institutionName),
    datasets: [
      {
        label: "Bank Balances",
        data: accounts.map((acc) => acc.balance),
        backgroundColor: [
          "#0747b6",
          "#2265d8",
          "#2f91fa",
          "#53a5f2",
          "#81bdf6",
          "#a6d3fa",
        ].slice(0, accounts.length), // Ensure enough colors
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={chartData}
      options={{
        cutout: "60%",
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default BanksBalanceDoughnutChart;
