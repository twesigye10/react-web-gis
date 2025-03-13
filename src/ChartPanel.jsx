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
  Filler,
  BoxPlotChart
);

const ChartPanel = ({ data, surveytool }) => {
  console.log("Inside panel");
  // chart column
  const [chartCol, setChartCol] = useState("");
  const [chartColType, setChartColType] = useState("");
  const numericTypes = ["integer", "decimal"];
  const [currentData, setCurrentData] = useState({});
  const [numericData, setNumericData] = useState([]);
  // chart data
  const [chartData, setChartData] = useState({
    labels: Object.keys(currentData),
    datasets: [
      {
        label: "Values",
        data: Object.values(currentData),
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

  // numeric chart data
  const [numChartData, setNumChartData] = useState({
    labels: chartCol,
    datasets: [
      {
        label: chartCol,
        outlierColor: "#3388ff",
        itemRadius: 5,
        data: [numericData],
        borderWidth: 1,
      },
    ],
  });
  const [numOptions, setNumOptions] = useState({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Boxplot Example",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: Min: ${tooltipItem.raw.min}, Q1: ${tooltipItem.raw.q1}, Median: ${tooltipItem.raw.median}, Q3: ${tooltipItem.raw.q3}, Max: ${tooltipItem.raw.max}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Category",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  });

  useEffect(() => {
    const firstFeat = data[0].properties;
    const firstAttribute = Object.keys(firstFeat)[0];
    setChartCol(firstAttribute);

    const firstAttributeType = surveytool.filter((question) => {
      if (question.label) {
        return (
          question.label === firstAttribute || question.name === firstAttribute
        );
      } else {
        return question.name === firstAttribute;
      }
    })[0].type;
    setChartColType(firstAttributeType);

    // initial categorical chart data
    if (!numericTypes.includes(firstAttributeType)) {
      const filteredChartData = data
        .map((entry) => entry.properties[firstAttribute])
        .reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});

      setCurrentData(filteredChartData);
    }
    // numeric data
    if (numericTypes.includes(firstAttributeType)) {
      const currNumData = data.map(function (item) {
        return item[firstAttribute];
      });

      setNumericData(currNumData);
    }
  }, []);

  useEffect(() => {
    // Prepare the data for the chart
    setChartData({
      labels: Object.keys(currentData),
      datasets: [
        {
          label: "Values",
          data: Object.values(currentData),
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
  }, [chartCol]);

  // handle selection

  const currentAttributeOptions = Object.keys(data[0].properties).map(
    (entry) => (
      <option value={entry} key={entry}>
        {entry}
      </option>
    )
  );

  // attribute change
  function analysisAttributeChange(event) {
    const updatedAttribute = event.target.value;
    setChartCol(updatedAttribute);

    const updatedAttributeType = surveytool.filter((question) => {
      if (question.label) {
        return (
          question.label === updatedAttribute ||
          question.name === updatedAttribute
        );
      } else {
        return question.name === updatedAttribute;
      }
    })[0].type;
    setChartColType(updatedAttributeType);

    // updated cateorical chart data
    if (!numericTypes.includes(updatedAttributeType)) {
      const updatedChartData = data
        .map((entry) => entry.properties[updatedAttribute])
        .reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});

      setCurrentData(updatedChartData);
    }

    // numeric data
    if (numericTypes.includes(updatedAttributeType)) {
      const currNumData = data.map(function (item) {
        return item[updatedAttribute];
      });

      setNumericData(currNumData);
    }
  }

  return (
    <div>
      <h2>Chart Panel</h2>
      <label>
        Select Attribute:
        <select value={""} onChange={analysisAttributeChange}>
          {currentAttributeOptions}
        </select>
      </label>
      {!numericTypes.includes(chartColType) && (
        <Bar data={chartData} options={options} />
      )}
      {numericTypes.includes(chartColType) && (
        <BoxPlotChart data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartPanel;
