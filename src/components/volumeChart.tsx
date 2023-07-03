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
import chartTrendline from "chartjs-plugin-trendline";
import { kFormatter } from "../utils/kFormatter";
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar, Line } from "react-chartjs-2";
import { RingProgress, Text } from "@mantine/core";
import Leaderboards from "./leaderboards/leaderboards";

import type { DatasetsType } from "@/app/types";
import DailyTrueVolumeChart from "./charts/dailyTrueVolume";
import TrueVolumeLineChart from "./charts/trueVolumeLine";
import ChartDataToggles from "./toggles/chart_data";
import LoanVolumeChart from "./charts/loanVolume";
import FakeVolumeChart from "./charts/fakeVolume";
import TotalVolumeChart from "./charts/totalVolume";
import TrueVolumeBarChart from "./charts/trueVolumeBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  chartTrendline
);
interface VolumeChartProps {
  labels: string[];
  trueVolume: any[];
  loanVolume: any[];
  totalVolume: any[];
  fakeVolume: any[];
  realPercentDifference: number[];
  leaderboardDatasets: DatasetsType[];
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: {
    names: string[];
    true_volumes: number[];
    true_volume_percentage: number[];
    loan_volume: number[];
    revenue: number[];
    fake_volume: number[];
    fake_volume_percentage: number[];
  };
}
const VolumeChart: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  realPercentDifference,
  totalVolume,
  leaderboardDatasets,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
  trueVolumeMovingAverage,
  leaderboard,
}) => {
  const [timespan, setTimespan] = useState(-30);
  const [trendlineTimespan, setTrendlineTimespan] = useState(-30);

  function handleDailyTrueVolumeTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimespan(value);
  }

  function handleTrendChartTimeframe(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTrendlineTimespan(value);
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

  // Daily True
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

  // Trendline
  const [trendlineVolumeLabels, setTrendlineVolumeLabels] = useState(
    labels.slice(labels.length - 30).map((data: any) => data)
  );
  const [trendlineTrueVolumeArray, setTrendlineTrueVolumeArray] = useState(
    trueVolume.slice(trueVolume.length - 30)
  );
  const [trendlineTotalVolumeArray, setTrendlineTotalVolumeArray] = useState(
    totalVolume.slice(totalVolume.length - 30)
  );
  const [trendlineLoanVolumeDataArray, setTrendlineLoanVolumeDataArray] =
    useState(loanVolume.slice(loanVolume.length - 30));
  const [trendlineFakeVolumeDataArray, setTrendlineFakeVolumeDataArray] =
    useState(fakeVolume.slice(fakeVolume.length - 30));

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

    if (timespan === null) {
      setDailyFakeVolumeDataArray(fakeVolume);
      setDailyLoanVolumeDataArray(loanVolume);
      setDailyTrueVolumeDataArray(trueVolume);
      setDailyTrueVolumeLabels(labels);
    }
  }, [timespan]);

  useEffect(() => {
    if (trendlineTimespan === -30) {
      setTrendlineLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setTrendlineTrueVolumeArray(trueVolume.slice(trueVolume.length - 30));
      setTrendlineTotalVolumeArray(totalVolume.slice(totalVolume.length - 30));
      setTrendlineFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setTrendlineVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (trendlineTimespan === -7) {
      setTrendlineLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
      setTrendlineTrueVolumeArray(trueVolume.slice(trueVolume.length - 7));
      setTrendlineTotalVolumeArray(totalVolume.slice(totalVolume.length - 7));
      setTrendlineFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
      setTrendlineVolumeLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }

    if (trendlineTimespan === null) {
      setTrendlineLoanVolumeDataArray(loanVolume);
      setTrendlineFakeVolumeDataArray(fakeVolume);
      setTrendlineTotalVolumeArray(totalVolume);
      setTrendlineTrueVolumeArray(trueVolume);
      setTrendlineVolumeLabels(labels);
    }
  }, [trendlineTimespan]);

  const renderTrueTotalPercentage = () => {
    const trueV: any = trueVolume[trueVolume.length - 1];
    const totalV: any = totalVolume[totalVolume.length - 1];
    return (trueV / totalV).toFixed(0);
  };

  const renderTimespanStringAsString = () => {
    if (trendlineTimespan === -30) return "Last 30 Days";
    if (trendlineTimespan === -7) return "Last 7 Days";
    if (trendlineTimespan === null) return "All";
  };

  const toggleView = () => {};
  return (
    <>
      <section className="chart__wrapper">
        {/* Market Overview */}

        {/* MarketExpanded */}
        <div className="chart__grid">
          <div className="chart__title">
            <h2 className="typography__display--1">Daily True Volume</h2>
          </div>
          <div className="chart__grid-cell chart__grid-cell--full">
            <div className="chart__container">
              <ChartDataToggles
                onClick={(arg1, arg2) =>
                  handleDailyTrueVolumeTimeferame(arg1, arg2)
                }
              />

              <DailyTrueVolumeChart
                labels={dailyTrueVolumeLabels}
                data={{
                  true_volume: dailyTrueVolumeDataArray,
                  loan_volume: dailyLoanVolumeDataArray,
                  fake_volume: dailyFakeVolumeDataArray,
                }}
              />
            </div>
          </div>
        </div>

        <div className="chart__grid">
          <div className="chart__title">
            <h2 className="typography__display--1">
              {renderTimespanStringAsString()}
            </h2>
            <ChartDataToggles
              onClick={(arg1, arg2) => handleTrendChartTimeframe(arg1, arg2)}
            />
          </div>
        </div>

        <div className="chart__grid">
          <div className="chart__grid-cell chart__grid-cell--half">
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
                  </p>
                </div>
                <div>
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

              <TrueVolumeBarChart
                labels={trendlineVolumeLabels}
                data={{ true_volume: trendlineTrueVolumeArray }}
                trend_timespan={trendlineTimespan}
              />
            </div>
          </div>

          <div className="chart__grid-cell chart__grid-cell--half">
            <div className="chart__container">
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>

              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--true-volume">
                  <p className="typography__label--3">Real Volume</p>
                </div>
                <div className="chart__legend-item chart__legend-item--trend">
                  <p className="typography__label--3">Trend</p>
                </div>
              </div>

              <TrueVolumeLineChart
                labels={trendlineVolumeLabels}
                data={{
                  true_volume: trendlineTrueVolumeArray,
                  true_volume_moving_average: loanVolumeMovingAverage,
                }}
                trend_timespan={trendlineTimespan}
              />
            </div>
          </div>

          <div className="chart__grid-cell chart__grid-cell--half">
            <div className="chart__container">
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>

              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--primary">
                  <p className="typography__label--3">Loan Volume</p>
                </div>
                <div className="chart__legend-item chart__legend-item--trend">
                  <p className="typography__label--3">Trend</p>
                </div>
              </div>

              <LoanVolumeChart
                labels={trendlineVolumeLabels}
                data={{
                  loan_volume: trendlineLoanVolumeDataArray,
                  loan_volume_moving_average: loanVolumeMovingAverage,
                }}
                trend_timespan={trendlineTimespan}
              />
            </div>
          </div>

          <div className="chart__grid-cell chart__grid-cell--half">
            <div className="chart__container">
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>

              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--secondary">
                  <p className="typography__label--3">
                    Fake Volume (Inorganic)
                  </p>
                </div>
                <div className="chart__legend-item chart__legend-item--trend">
                  <p className="typography__label--3">Trend</p>
                </div>
              </div>

              <FakeVolumeChart
                labels={trendlineVolumeLabels}
                data={{
                  fake_volume: trendlineFakeVolumeDataArray,
                  fake_volume_moving_average: fakeVolumeMovingAverage,
                }}
                trend_timespan={trendlineTimespan}
              />
            </div>
          </div>

          <div className="chart__grid-cell chart__grid-cell--half">
            <div className="chart__container">
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>

              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--tertiary">
                  <p className="typography__label--3">Total Volume</p>
                </div>
                <div className="chart__legend-item chart__legend-item--trend">
                  <p className="typography__label--3">Trend</p>
                </div>
              </div>

              <TotalVolumeChart
                labels={trendlineVolumeLabels}
                data={{
                  total_volume: trendlineTotalVolumeArray,
                  total_volume_moving_average: totalVolumeMovingAverage,
                }}
                trend_timespan={trendlineTimespan}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Row 2 */}
      <Leaderboards
        collection_names={leaderboard.names.slice(0, 5)}
        true_volume={leaderboard.true_volumes.slice(0, 5)}
        true_volume_percentage={leaderboard.true_volume_percentage.slice(0, 5)}
        loan_volume={leaderboard.loan_volume.slice(0, 5)}
        revenue={leaderboard.revenue.slice(0, 5)}
        fake_volume={leaderboard.fake_volume.slice(0, 5)}
        fake_volume_percentage={leaderboard.fake_volume_percentage.slice(0, 5)}
        // loans={leaderboardDatasets.filter(
        //   ({ label }) => label === "total_day_volume_loan"
        // )}
      />
    </>
  );
};

export default VolumeChart;
