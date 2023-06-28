"use client";

import { useState } from "react";
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
  fakeBlurVolume: DatasetType[]
  fakeOtherVolume: DatasetType[]
}
const VolumeChart: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeBlurVolume,
  fakeOtherVolume,
  totalVolume,
}) => {
  console.log({trueVolume})
  const [timespan, setTimespan] = useState(null);

  function handleClick(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimespan(value);
  }

  // const dailyTrueVolume30 = {
  //   labels: labels.slice(labels.length - 30).map((data: any) => data),
  //   datasets: [
  //     {
  //       label: "True Volume",
  //       data: trueVolume,
  //       borderColor: "white",
  //       backgroundColor: "#5C5F66",
  //     },
  //     {
  //       label: "Loans",
  //       data: loanVolume,
  //       borderColor: "black",
  //       backgroundColor: "#FFD740",
  //     },
  //     // {
  //     //   label: "Fake (Blur)",
  //     //   data: labels.datasets[2].data,
  //     //   borderColor: "red",
  //     //   backgroundColor: "#FD7E14",
  //     // },
  //     // {
  //     //   label: "Fake (Other)",
  //     //   data: labels.datasets[2].data,
  //     //   borderColor: "red",
  //     //   backgroundColor: "#FD7E14",
  //     // },
  //   ],
  // };

  // const volumeData30D = {
  //   labels: labels
  //     .slice(labels.length - 30)
  //     .map((data: any) => data),
  //   datasets: [
  //     {
  //       label: "True Volume"
  //       data: labels.datasets[0].data.slice(labels.labels.length - 30),
  //       borderColor: "white",
  //       backgroundColor: "#5C5F66",
  //     },
  //     {
  //       label: labels.datasets[1].label,
  //       data: labels.datasets[1].data.slice(labels.labels.length - 30),
  //       borderColor: "black",
  //       backgroundColor: "#FFD740",
  //     },
  //     {
  //       label: labels.datasets[2].label,
  //       data: labels.datasets[2].data.slice(labels.labels.length - 30),
  //       borderColor: "red",
  //       backgroundColor: "#FD7E14",
  //     },
  //   ],
  // };

  // const trueVolumeData = {
  //   labels: labels.slice(labels.length - 90).map((data: any) => data),
  //   datasets: [
  //     {
  //       label: "True Volume",
  //       data: trueVolume,
  //       borderColor: "white",
  //       backgroundColor: "#5C5F66",
  //       barThickness: 2,
  //     },
  //   ],
  // };

  const customTooltip = (tooltipItems?: any) => {
    let sum = 0;
    

    // tooltipItems.forEach(function (tooltipItem: any) {
    //   sum += tooltipItem.parsed.y;
    // });
     tooltipItems.forEach(function (tooltipItem: any) {
      sum += tooltipItem.parsed.y;
    });
    return "Total Volume" + totalVolume;
  };

  return (
    <section className="chart__wrapper">
      <section className="chart__grid">
        <div className="chart__grid-cell chart__grid-cell--main">
          <h2 className="typography__display--1">Daily True Volume</h2>

          <div className="u-bgGrey u-radius8 u-padding12 u-heightFull">
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

            {timespan == -30 && (
              <Bar
                data={{
                  labels: labels
                    .slice(labels.length - 30)
                    .map((data: any) => data),
                  datasets: [
                    {
                      label: "True Volume",
                      data: trueVolume.slice(trueVolume.length - 30),
                      borderColor: "white",
                      backgroundColor: "#5C5F66",
                    },
                    {
                      label: "Loans",
                      data: loanVolume.slice(loanVolume.length - 30),
                      borderColor: "black",
                      backgroundColor: "#FFD740",
                    },
                    {
                      label: "Total Volume",
                      data: totalVolume.slice(totalVolume.length - 30),
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
                data={{
                  labels: labels
                    .slice(labels.length - 7)
                    .map((data: any) => data),
                  datasets: [
                    {
                      label: "True Volume",
                      data: trueVolume.slice(trueVolume.length - 7),
                      borderColor: "white",
                      backgroundColor: "#5C5F66",
                    },
                    {
                      label: "Loans",
                      data: loanVolume.slice(loanVolume.length - 7),
                      borderColor: "black",
                      backgroundColor: "#FFD740",
                    },
                    {
                      label: "Total Volume",
                      data: totalVolume.slice(totalVolume.length - 7),
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
                data={{
                  labels: labels
                    .slice(labels.length - 1)
                    .map((data: any) => data),
                  datasets: [
                    {
                      label: "True Volume",
                      data: trueVolume.slice(trueVolume.length - 1),
                      borderColor: "white",
                      backgroundColor: "#5C5F66",
                    },
                    {
                      label: "Loans",
                      data: loanVolume.slice(loanVolume.length - 1),
                      borderColor: "black",
                      backgroundColor: "#FFD740",
                    },
                    {
                      label: "Total Volume",
                      data: totalVolume.slice(totalVolume.length - 1),
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
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
              />
            )}
            {timespan == null && (
              <>
                <Bar
                  data={{
                    labels: labels.map((data: any) => data),
                    datasets: [
                      {
                        label: "True Volume",
                        data: trueVolume,
                        borderColor: "white",
                        backgroundColor: "#5C5F66",
                      },
                      {
                        label: "Loans",
                        data: loanVolume,
                        borderColor: "black",
                        backgroundColor: "#FFD740",
                      },
                      {
                        label: "Total Volume",
                        data: totalVolume,
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
                        display: true,
                        fullSize: true,
                        labels: {
                          filter: (item) => item.text !== "Total Volume",
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
              </>
            )}
          </div>
        </div>
        <div className="chart__grid-cell">
          <h2 className="typography__display--1">Last 24 hours</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              height: "100%",
            }}
          >
            <div className="u-bgGrey u-radius8 u-padding12 u-heightFull u-posRelative">
              <div className="chart__container">
                <div>
                  <p className="typography__label--2">3.6k</p>
                  <h3 className="typography__label--1">True Volume</h3>
                  <p className="typography__paragraph--1">
                    NFT trading volume across all transaction types
                  </p>
                </div>
                <div style={{ position: "relative", bottom: "90px" }}>
                  <Bar
                    data={{
                      labels: labels.slice(labels.length - 90).map((data: any) => data),
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
                            footer: customTooltip,
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
              </div>
              <div className="chart__subtitle">
                <p className="typography__label--3">90 Day Trend</p>
              </div>
            </div>

            <div className="u-bgGrey u-radius8 u-padding12 u-posRelative u-heightFull">
              <div className="chart__container">
                <div>
                  <h3 className="typography__label--1">Total Volume</h3>
                  <p className="typography__paragraph--1">
                    Excludes fake/artificial volume such as loans, points
                    farming and wash trading.
                  </p>

                <div className="chart__legend">
                  <div className="chart__legend-item chart__legend-item--primary">
                    <p className="typography__label--3">Loans</p>
                  </div>
                  <div className="chart__legend-item chart__legend-item--secondary">
                    <p className="typography__label--3">Fake Volume (Blur)</p>
                  </div>
                  <div className="chart__legend-item chart__legend-item--tertiary">
                  <p className="typography__label--3">Fake Volume (Other Marketplaces)</p>
                  </div>

                </div>
                </div>

                <div style={{ position: "relative", bottom: "90px" }}>
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
                          pointRadius: 0,
                          tension: 1.1,
                          borderWidth: 2,
                        },
                        {
                          label: "Fake Volume (Blur)",
                          data: fakeBlurVolume.slice(fakeBlurVolume.length - 90),
                          borderColor: "rgba(253, 126, 20, 1)",
                          pointRadius: 0,
                          tension: 1.1,
                          borderWidth: 2,
                        },
                        {
                          label: "Fake Volume (Other)",
                          data: fakeOtherVolume.slice(fakeOtherVolume.length - 90),
                          borderColor: "rgba(250, 82, 82, 1)",
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
                            footer: customTooltip,
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
              </div>
              <div className="chart__subtitle">
                <p className="typography__label--3">90 Day Trend</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default VolumeChart;
