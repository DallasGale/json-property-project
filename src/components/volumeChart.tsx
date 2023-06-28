"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import chartTrendline from "chartjs-plugin-trendline";

import annotationPlugin from "chartjs-plugin-annotation";
import Data from "../../public/data/volume.json";
import { Bar } from "react-chartjs-2";

// window.ChartJS = {
//   plugins: { register: (...x) => ChartJS.plugins.register(...x) },
// };
// require("chartjs-plugin-trendline");
// delete window.ChartJS;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
  // chartTrendline
);

interface VolumeChartProps {
  jsonData: any;
}
const VolumeChart: React.FC<VolumeChartProps> = ({ jsonData }) => {
  // const reversed30D = jsonData.labels.reverse();
  console.log({ jsonData });
  const [timespan, setTimespan] = useState(-30);

  function handleClick(e: any) {
    setTimespan(e);
    console.log({ timespan });
  }
  const volumeDataAll = {
    labels: jsonData.labels.map((data: any) => data),
    datasets: [
      {
        label: jsonData.datasets[0].label,
        data: jsonData.datasets[0].data,
        borderColor: "white",
        backgroundColor: "#5C5F66",
      },
      {
        label: jsonData.datasets[1].label,
        data: jsonData.datasets[1].data,
        borderColor: "black",
        backgroundColor: "#FFD740",
      },
      {
        label: jsonData.datasets[2].label,
        data: jsonData.datasets[2].data,
        borderColor: "red",
        backgroundColor: "#FD7E14",
      },
    ],
  };

  const volumeData30D = {
    labels: jsonData.labels
      .slice(jsonData.labels.length - 30)
      .map((data: any) => data),
    datasets: [
      {
        label: jsonData.datasets[0].label,
        data: jsonData.datasets[0].data.slice(jsonData.labels.length - 30),
        borderColor: "white",
        backgroundColor: "#5C5F66",
      },
      {
        label: jsonData.datasets[1].label,
        data: jsonData.datasets[1].data.slice(jsonData.labels.length - 30),
        borderColor: "black",
        backgroundColor: "#FFD740",
      },
      {
        label: jsonData.datasets[2].label,
        data: jsonData.datasets[2].data.slice(jsonData.labels.length - 30),
        borderColor: "red",
        backgroundColor: "#FD7E14",
      },
    ],
  };
  const volumeData7D = {
    labels: jsonData.labels
      .slice(jsonData.labels.length - 7)
      .map((data: any) => data),
    datasets: [
      {
        label: jsonData.datasets[0].label,
        data: jsonData.datasets[0].data.slice(jsonData.labels.length - 7),
        borderColor: "white",
        backgroundColor: "#5C5F66",
      },
      {
        label: jsonData.datasets[1].label,
        data: jsonData.datasets[1].data.slice(jsonData.labels.length - 7),
        borderColor: "black",
        backgroundColor: "#FFD740",
      },
      {
        label: jsonData.datasets[2].label,
        data: jsonData.datasets[2].data.slice(jsonData.labels.length - 7),
        borderColor: "red",
        backgroundColor: "#FD7E14",
      },
    ],
  };

  const volumeData24H = {
    labels: jsonData.labels
      .slice(jsonData.labels.length - 2)
      .map((data: any) => data),
    datasets: [
      {
        label: jsonData.datasets[0].label,
        data: jsonData.datasets[0].data.slice(jsonData.labels.length - 2),
        borderColor: "white",
        backgroundColor: "#5C5F66",
      },
      {
        label: jsonData.datasets[1].label,
        data: jsonData.datasets[1].data.slice(jsonData.labels.length - 2),
        borderColor: "black",
        backgroundColor: "#FFD740",
      },
      {
        label: jsonData.datasets[2].label,
        data: jsonData.datasets[2].data.slice(jsonData.labels.length - 2),
        borderColor: "red",
        backgroundColor: "#FD7E14",
      },
    ],
  };

  return (
    <section className="chart__wrapper">
      <h1 className="typography__display--1">True Volume</h1>

      <section className="chart__grid">
        <div className="chart__grid-cell chart__grid-cell--main u-bgGrey u-radius8 u-padding12">
          <div className="button-group">
            <button
              className="button typography__label--1"
              onClick={() => handleClick(-1)}
            >
              24HR
            </button>
            <button
              className="button typography__label--1"
              onClick={(e) => handleClick(-7)}
            >
              7D
            </button>
            <button
              className="button typography__label--1"
              onClick={(e) => handleClick(-30)}
            >
              30D
            </button>
            <button
              className="button typography__label--1"
              onClick={(e) => handleClick(null)}
            >
              ALL
            </button>
          </div>

          {timespan == -30 && (
            <Bar
              data={volumeData30D}
              options={{
                interaction: {
                  mode: "x",
                },
                maintainAspectRatio: false,
                plugins: {
                  annotation: {
                    annotations: {
                      box1: {
                        type: "label",
                        xMin: 2,
                        xMax: 10,
                        yMin: 500,
                        yMax: 10000,
                        backgroundColor: jsonData.datasets[0].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box2: {
                        type: "label",
                        xMin: 11,
                        xMax: 20,
                        yMin: 20000,
                        yMax: 40000,
                        backgroundColor: jsonData.datasets[1].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box3: {
                        type: "label",
                        xMin: 51,
                        xMax: 100,
                        yMin: 30000,
                        yMax: 80000,
                        backgroundColor: jsonData.datasets[2].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                    },
                  },
                  title: {
                    display: false,
                    text: "Chart.js Bar Chart - Stacked",
                  },
                  legend: {
                    position: "top",
                    align: "start",
                    display: true,
                    fullSize: true,
                    labels: {
                      color: "#fff",
                      usePointStyle: true,
                      pointStyle: "rectRounded",
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          )}
          {timespan == -7 && (
            <Bar
              data={volumeData7D}
              options={{
                interaction: {
                  mode: "x",
                },
                maintainAspectRatio: false,
                plugins: {
                  annotation: {
                    annotations: {
                      box1: {
                        type: "label",
                        xMin: 2,
                        xMax: 10,
                        yMin: 500,
                        yMax: 10000,
                        backgroundColor: jsonData.datasets[0].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box2: {
                        type: "label",
                        xMin: 11,
                        xMax: 20,
                        yMin: 20000,
                        yMax: 40000,
                        backgroundColor: jsonData.datasets[1].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box3: {
                        type: "label",
                        xMin: 51,
                        xMax: 100,
                        yMin: 30000,
                        yMax: 80000,
                        backgroundColor: jsonData.datasets[2].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                    },
                  },
                  title: {
                    display: false,
                    text: "Chart.js Bar Chart - Stacked",
                  },
                  legend: {
                    position: "top",
                    align: "start",
                    display: true,
                    fullSize: true,
                    labels: {
                      color: "#fff",
                      usePointStyle: true,
                      pointStyle: "rectRounded",
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          )}
          {timespan == -1 && (
            <Bar
              data={volumeData24H}
              options={{
                interaction: {
                  mode: "x",
                },
                maintainAspectRatio: false,
                plugins: {
                  annotation: {
                    annotations: {
                      box1: {
                        type: "label",
                        xMin: 2,
                        xMax: 10,
                        yMin: 500,
                        yMax: 10000,
                        backgroundColor: jsonData.datasets[0].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box2: {
                        type: "label",
                        xMin: 11,
                        xMax: 20,
                        yMin: 20000,
                        yMax: 40000,
                        backgroundColor: jsonData.datasets[1].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box3: {
                        type: "label",
                        xMin: 51,
                        xMax: 100,
                        yMin: 30000,
                        yMax: 80000,
                        backgroundColor: jsonData.datasets[2].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                    },
                  },
                  title: {
                    display: false,
                    text: "Chart.js Bar Chart - Stacked",
                  },
                  legend: {
                    position: "top",
                    align: "start",
                    display: true,
                    fullSize: true,
                    labels: {
                      color: "#fff",
                      usePointStyle: true,
                      pointStyle: "rectRounded",
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          )}
          {timespan == null && (
            <Bar
              data={volumeDataAll}
              options={{
                interaction: {
                  mode: "x",
                },
                maintainAspectRatio: false,
                plugins: {
                  annotation: {
                    annotations: {
                      box1: {
                        type: "label",
                        xMin: 2,
                        xMax: 10,
                        yMin: 500,
                        yMax: 10000,
                        backgroundColor: jsonData.datasets[0].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box2: {
                        type: "label",
                        xMin: 11,
                        xMax: 20,
                        yMin: 20000,
                        yMax: 40000,
                        backgroundColor: jsonData.datasets[1].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                      box3: {
                        type: "label",
                        xMin: 51,
                        xMax: 100,
                        yMin: 30000,
                        yMax: 80000,
                        backgroundColor: jsonData.datasets[2].backgroundColor,
                        borderColor: "#000",
                        borderRadius: 6,
                        borderWidth: 1,
                        content: ["annotated"],
                      },
                    },
                  },
                  title: {
                    display: false,
                    text: "Chart.js Bar Chart - Stacked",
                  },
                  legend: {
                    position: "top",
                    align: "start",
                    display: true,
                    fullSize: true,
                    labels: {
                      color: "#fff",
                      usePointStyle: true,
                      pointStyle: "rectRounded",
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          )}
        </div>
        <div className="chart__grid-cell u-bgGrey u-radius8 u-padding12">
          <div className="chart__chart">
            <h2 className="typography__display--2">24H True Volume</h2>
          </div>
        </div>

        <div className="chart__grid-cell u-bgGrey u-radius8 u-padding12">
          <div className="chart__chart">
            <h2 className="typography__display--2">24H Breakdown</h2>
          </div>
        </div>
      </section>
    </section>
  );
};

export default VolumeChart;
