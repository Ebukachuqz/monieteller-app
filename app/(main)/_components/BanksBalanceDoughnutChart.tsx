"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      label: "Banks",
      data: [300, 50, 100],
      backgroundColor: ["#0747b6", "#2265d8", "2f91fa"],
    },
  ],
  labels: ["First Bank", "Zenith Bank", "Access Bank"],
};

const BanksBalanceDoughnutChart = ({ accounts }: DoughnutChartProps) => {
  return (
    <Doughnut
      data={data}
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
