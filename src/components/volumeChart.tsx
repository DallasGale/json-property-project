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
import { RingProgress, Text } from "@mantine/core";

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
  fakeVolume: DatasetType[];
  realPercentDifference: number[];
  // fakeBlurVolume: DatasetType[];
  // fakeOtherVolume: DatasetType[];
}
const VolumeChart: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  realPercentDifference,
  // fakeBlurVolume,
  // fakeOtherVolume,
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
  const [dailyLoanVolumeDataArray, setDailyLoanVolumeDataArray] = useState(
    loanVolume.slice(loanVolume.length - 30)
  );
  const [dailyFakeVolumeDataArray, setDailyFakeVolumeDataArray] = useState(
    fakeVolume.slice(fakeVolume.length - 30)
  );

  useEffect(() => {
    if (timespan === -30) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (timespan === -7) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 7));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (timespan === -1) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 1));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 1));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 1));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }
    if (timespan === null) {
      setDailyFakeVolumeDataArray(fakeVolume);
      setDailyLoanVolumeDataArray(loanVolume);
      setDailyTrueVolumeDataArray(trueVolume);
      setDailyTrueVolumeLabels(labels);
    }
  }, [timespan]);

  const renderTrueTotalPercentage = () => {
    const trueV: any = trueVolume[trueVolume.length - 1];
    const totalV: any = totalVolume[totalVolume.length - 1];
    return (trueV / totalV).toFixed(0);
  };
  return (
    <>
      <section className="chart__wrapper">
        <div className="chart__grid">
          <div className="chart__grid-cell">
            {/* <h2 className="typography__display--1">Daily True Volume</h2> */}

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
                        data: dailyLoanVolumeDataArray,
                        borderColor: "black",
                        backgroundColor: "#FFD740",
                      },
                      {
                        label: "Fake Volume (Inorganic)",
                        data: dailyFakeVolumeDataArray,
                        borderColor: "white",
                        backgroundColor: "rgba(250, 82, 82, 1)",
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
            {/* <h2 className="typography__display--1">Last 24 hours</h2> */}

            <div className="chart__container chart__container">
              <div className="chart__info">
                <div className="chart__progress-ring">
                  <p className="typography__label--2">
                    <RingProgress
                      size={110}
                      thickness={10}
                      classNames={{
                        root: "progress-ring__root",
                      }}
                      sections={[
                        {
                          value: parseInt(renderTrueTotalPercentage()),
                          color: "rgba(250, 82, 82, 1)",
                        },
                      ]}
                      label={
                        <Text
                          color="white"
                          weight={700}
                          align="center"
                          size="xl"
                        >
                          {parseInt(renderTrueTotalPercentage())}%
                        </Text>
                      }
                    />

                    {/* </RingProgress> */}
                  </p>
                </div>
                <div>
                  {/*  */}
                  <p className="typography__label--2">{`${kFormatter(
                    realPercentDifference[realPercentDifference.length - 1]
                  )}k`}</p>
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
                        data: trueVolume.slice(trueVolume.length - 90),
                        borderColor: "white",
                        backgroundColor: "#5C5F66",
                        barThickness: 5,
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
          </div>
        </div>

        <div className="chart__grid">
          <div className="chart__container">
            <div className="chart__grid-cell chart__grid-cell--full">
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>

              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--real-volume">
                  <p className="typography__label--3">Real Volume</p>
                </div>
                <div className="chart__legend-item chart__legend-item--primary">
                  <p className="typography__label--3">Loan Volume</p>
                </div>
                <div className="chart__legend-item chart__legend-item--secondary">
                  <p className="typography__label--3">
                    Fake Volume (Inorganic)
                  </p>
                </div>
                <div className="chart__legend-item chart__legend-item--tertiary">
                  <p className="typography__label--3">Total Volume</p>
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
                        label: "Real Volume",
                        data: trueVolume.slice(trueVolume.length - 90),
                        borderColor: "rgba(255, 255, 255, 1)",
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        pointRadius: 5,
                        tension: 0.3,
                        borderWidth: 1,
                      },
                      {
                        label: "Loan Volume",
                        data: loanVolume.slice(loanVolume.length - 90),
                        borderColor: "rgba(250, 176, 5, 1)",
                        backgroundColor: "rgba(250, 176, 5, 1)",
                        pointRadius: 5,
                        tension: 0.3,
                        borderWidth: 1,
                      },

                      {
                        label: "Fake Volume (Inorganic)",
                        data: fakeVolume.slice(fakeVolume.length - 90),
                        borderColor: "rgba(253, 126, 20, 1)",
                        backgroundColor: "rgba(253, 126, 20, 1)",
                        pointRadius: 5,
                        tension: 0.3,
                        borderWidth: 1,
                      },
                      {
                        label: "Total Volume",
                        data: totalVolume.slice(totalVolume.length - 90),
                        borderColor: "rgba(250, 82, 82, 1)",
                        backgroundColor: "rgba(250, 82, 82, 1)",
                        pointRadius: 5,
                        tension: 0.3,
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      line: {
                        capBezierPoints: true,
                        borderJoinStyle: "round",
                        borderWidth: 10,
                      },
                      point: {
                        pointStyle: "circle",
                      },
                    },
                    interaction: {
                      mode: "x",
                    },
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {},
                      },

                      annotation: {
                        annotations: {},
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
          </div>
        </div>
      </section>

      {/* Row 2 */}
      <section className="chart__wrapper">
        <div className="chart__grid">
          <div className="chart__grid-cell--full">
            <h2 className="typography__display--1">Leaderboards</h2>

            <div className="chart__grid">
              <div className="chart__container chart__container--quarter">
                <table>
                  <thead>True Volume</thead>
                  <tbody>
                    <tr>
                      <td>The Captainz</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="chart__container chart__container--quarter"></div>
              <div className="chart__container chart__container--quarter"></div>
              <div className="chart__container chart__container--quarter"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolumeChart;
