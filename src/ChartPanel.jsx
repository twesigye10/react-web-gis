import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartPanel = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: Object.keys(data),
    datasets: [
      {
        label: "Values",
        data: Object.values(data),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(54, 162, 235,0.5)",
        fill: true,
      },
    ],
  });
  const [options, setOptions] = useState({
    responsive: true,
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  });
  useEffect(() => {
    // Prepare the data for the chart
    setChartData({
      labels: Object.keys(data),
      datasets: [
        {
          label: "Values",
          data: Object.values(data),
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(54, 162, 235,0.5)",
          fill: true,
        },
      ],
    });

    setOptions({
      responsive: true,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    });
  }, [data]);

  return (
    <div>
      <h2>Chart Panel</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartPanel;
