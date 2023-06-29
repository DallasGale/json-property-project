"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
// import chartTrendline from "chartjs-plugin-trendline";
import { kFormatter } from "../utils/kFormatter";
import annotationPlugin from "chartjs-plugin-annotation";
import Data from "../../public/data/volume.json";
import { Bar, Line } from "react-chartjs-2";

// window.ChartJS = {
//   plugins: { register: (...x) => ChartJS.plugins.register(...x) },
// };
// require("chartjs-plugin-trendline");
// delete window.ChartJS;

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
  // chartTrendline
);

export interface Datasets {
  datasets: DatasetType[];
}

export type DatasetType = {
  label: string;
  data: number[];
};

interface VolumeChartProps {
  labels: string[];
  trueVolume: DatasetType[];
  loanVolume: DatasetType[];
  totalVolume: DatasetType[];
  fakeBlurVolume: DatasetType[];
  fakeOtherVolume: DatasetType[];
}
const VolumeChart: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeBlurVolume,
  fakeOtherVolume,
  totalVolume,
}) => {
  const [timespan, setTimespan] = useState(-30);

  function handleClick(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimespan(value);
  }

  // const customTooltip = (tooltipItems?: any) => {
  //   let sum = 0;

  //   // tooltipItems.forEach(function (tooltipItem: any) {
  //   //   sum += tooltipItem.parsed.y;
  //   // });
  //   tooltipItems.forEach(function (tooltipItem: any) {
  //     sum += tooltipItem.parsed.y;
  //   });
  //   return "Total Volume" + totalVolume;
  // };

  const [dailyTrueVolumeLabels, setDailyTrueVolumeLabels] = useState(
    labels.slice(labels.length - 30).map((data: any) => data)
  );
  const [dailyTrueVolumeDataArray, setDailyTrueVolumeDataArray] = useState(
    trueVolume.slice(trueVolume.length - 30)
  );

  useEffect(() => {
    if (timespan === -30) {
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (timespan === -7) {
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 7));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (timespan === -1) {
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 1));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }
    if (timespan === null) {
      setDailyTrueVolumeDataArray(trueVolume);
      setDailyTrueVolumeLabels(labels);
    }
  }, [timespan, labels, trueVolume]);
  return (
    <section className="chart__wrapper">
      <div className="chart__grid">
        <div className="chart__grid-cell">
          <h2 className="typography__display--1">Daily True Volume</h2>

          <div className="chart__container">
            <div className="button-group">
              <button
                className="button typography__label--1"
                onClick={(e) => handleClick(e, -1)}
              >
                24HR
              </button>
              <button
                className="button typography__label--1"
                onClick={(e) => handleClick(e, -7)}
              >
                7D
              </button>
              <button
                className="button typography__label--1"
                onClick={(e) => handleClick(e, -30)}
              >
                30D
              </button>
              <button
                className="button typography__label--1"
                onClick={(e) => handleClick(e, null)}
              >
                ALL
              </button>
            </div>

            <div className="chart__bar-wrapper">
              <Bar
                data={{
                  labels: dailyTrueVolumeLabels,
                  datasets: [
                    {
                      label: "True Volume",
                      data: dailyTrueVolumeDataArray,
                      borderColor: "white",
                      backgroundColor: "#5C5F66",
                    },
                    {
                      label: "Loans",
                      data: dailyTrueVolumeDataArray,
                      borderColor: "black",
                      backgroundColor: "#FFD740",
                    },
                    {
                      label: "Total Volume",
                      data: dailyTrueVolumeDataArray,
                      borderColor: "black",
                      backgroundColor: "#1c1d22",
                      // hidden: true,
                    },
                  ],
                }}
                options={{
                  interaction: {
                    mode: "x",
                  },
                  maintainAspectRatio: false,
                  plugins: {
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
                      // ticks: {
                      //   callback: function (x) {
                      //     console.log({ x });
                      //     return ".";
                      //   },
                      // },
                    },
                    y: {
                      stacked: true,
                      ticks: {
                        callback: function (value: any) {
                          return kFormatter(value);
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="chart__grid-cell">
          <h2 className="typography__display--1">Last 24 hours</h2>

          <div className="chart__grid">
            <div className="chart__container chart__container--half">
              {/* <div className="chart__inner"> */}
              <div className="chart__info">
                <div className="chart__progress-ring">
                  <p className="typography__label--2">28%</p>
                </div>
                <div>
                  <p className="typography__label--2">3.6k</p>
                  <h3 className="typography__label--1">True Volume</h3>
                  <p className="typography__paragraph--1">
                    Excludes fake/artificial volume such as loans, points
                    farming and wash trading.
                  </p>
                </div>
              </div>
              <div className="chart__bar-wrapper">
                <Bar
                  data={{
                    labels: labels
                      .slice(labels.length - 90)
                      .map((data: any) => data),
                    datasets: [
                      {
                        label: "True Volume",
                        data: trueVolume,
                        borderColor: "white",
                        backgroundColor: "#5C5F66",
                        barThickness: 2,
                      },
                    ],
                  }}
                  options={{
                    interaction: {
                      mode: "x",
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          // footer: customTooltip,
                        },
                      },
                      annotation: {
                        annotations: {},
                      },
                      title: {
                        display: false,
                        text: "Chart.js Bar Chart - Stacked",
                      },
                      legend: {
                        position: "top",
                        align: "start",
                        display: false,
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
                        display: false,
                        stacked: true,
                      },
                      y: {
                        display: false,
                        stacked: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="chart__subtitle">
                <p className="typography__label--3">90 Day Trend</p>
              </div>
            </div>
            {/* </div> */}

            <div className="chart__container chart__container--half">
              {/* <div className="chart__inner"> */}
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>

              {/* fake_percent_difference */}
              {/* real_percent_difference */}
              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--primary">
                  <p className="typography__label--3">Loans</p>
                </div>
                <div className="chart__legend-item chart__legend-item--secondary">
                  <p className="typography__label--3">Fake Volume (Blur)</p>
                </div>
                <div className="chart__legend-item chart__legend-item--tertiary">
                  <p className="typography__label--3">
                    Fake Volume (Other Marketplaces)
                  </p>
                </div>
              </div>

              <div className="chart__bar-wrapper">
                <Line
                  data={{
                    labels: labels
                      .slice(labels.length - 90)
                      .map((data: any) => data),
                    datasets: [
                      {
                        label: "Loans",
                        data: loanVolume.slice(loanVolume.length - 90),
                        borderColor: "rgba(250, 176, 5, 1)",
                        backgroundColor: "rgba(250, 176, 5, 1)",
                        pointRadius: 0,
                        tension: 1.1,
                        borderWidth: 2,
                      },
                      {
                        label: "Fake Volume (Blur)",
                        data: fakeBlurVolume.slice(fakeBlurVolume.length - 90),
                        borderColor: "rgba(253, 126, 20, 1)",
                        backgroundColor: "rgba(253, 126, 20, 1)",
                        pointRadius: 0,
                        tension: 1.1,
                        borderWidth: 2,
                      },
                      {
                        label: "Fake Volume (Other)",
                        data: fakeOtherVolume.slice(
                          fakeOtherVolume.length - 90
                        ),
                        borderColor: "rgba(250, 82, 82, 1)",
                        backgroundColor: "rgba(250, 82, 82, 1)",
                        pointRadius: 0,
                        tension: 1.1,
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    interaction: {
                      mode: "x",
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          // footer: customTooltip,
                        },
                      },

                      annotation: {
                        annotations: {},
                      },
                      title: {
                        display: false,
                        text: "Chart.js Bar Chart - Stacked",
                      },
                      legend: {
                        position: "top",
                        align: "start",
                        display: false,
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
                        display: false,
                        stacked: true,
                      },
                      y: {
                        display: false,
                        stacked: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="chart__subtitle">
                <p className="typography__label--3">90 Day Trend</p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolumeChart;
