"use client";

import { useEffect, useState } from "react";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import { kFormatter } from "@utils/kFormatter";
import annotationPlugin from "chartjs-plugin-annotation";
import chartTrendline from "chartjs-plugin-trendline";
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

// Types
import type { DatasetsType } from "@/app/types";

// Components
import { RingProgress, Text } from "@mantine/core";
import TotalVolumeAllLineChart from "@components/charts/totalVolumeAllLine";
import TrueVolumeBarChart from "@components/charts/trueVolumeBar";

import Leaderboards from "@components/leaderboards/leaderboards";
import ChartDataToggles from "@components/toggles/chart_data";
import DailyTrueVolumeChart from "@components/charts/dailyTrueVolume";
import { time } from "console";

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
  toggleView: boolean;
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
const CompactView: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  realPercentDifference,
  totalVolume,
  loanVolume,
  fakeVolume,
  loanVolumeMovingAverage,
  trueVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
  toggleView,
  leaderboard,
}) => {
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 0,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs2 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 150,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs3 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 300,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  // Trendline
  const trendlineVolumeLabels = labels
    .slice(labels.length - 30)
    .map((data: any) => data);

  const trendlineTrueVolumeArray = trueVolume.slice(trueVolume.length - 30);

  // Timeframe toggle
  const [timeframe, setTimeframe] = useState(1);
  const renderTrueTotalPercentage = () => {
    let out = "0";

    if (timeframe === 0) {
      const trueV: any = trueVolume;
      const totalV: any = totalVolume;

      const totatalledTrueVolume = trueV.reduce((a: any, b: any) => a + b, 0);
      const totatalledTotalVolume = totalV.reduce((a: any, b: any) => a + b, 0);
      out = (totatalledTrueVolume / totatalledTotalVolume).toFixed(2);
    } else if (timeframe === 1) {
      const trueV: any = trueVolume[trueVolume.length - timeframe];
      const totalV: any = totalVolume[totalVolume.length - timeframe];
      out = (trueV / totalV).toFixed(2);
    } else {
      const trueV: any = trueVolume.slice(trueVolume.length - timeframe);
      const totalV: any = totalVolume.slice(totalVolume.length - timeframe);

      const totatalledTrueVolume = trueV.reduce((a: any, b: any) => a + b, 0);
      const totatalledTotalVolume = totalV.reduce((a: any, b: any) => a + b, 0);
      out = (totatalledTrueVolume / totatalledTotalVolume).toFixed(2);
    }
    return out;
  };

  const renderTimeframeAsString = () => {
    if (timeframe === 0) return "All Time";
    else if (timeframe === 1) return "Last 24 Hours";
    else if (timeframe === 7) return "Last 7 Days";
    else if (timeframe === 30) return "Last 30 Days";
    else return;
  };

  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

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
  // useEffect(() => {
  //   if (timespan === -30) {
  //     setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
  //     setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
  //     setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
  //     setDailyTrueVolumeLabels(
  //       labels.slice(labels.length - 30).map((data: any) => data)
  //     );
  //   }
  //   if (timespan === -7) {
  //     setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
  //     setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
  //     setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 7));
  //     setDailyTrueVolumeLabels(
  //       labels.slice(labels.length - 7).map((data: any) => data)
  //     );
  //   }

  //   if (timespan === null) {
  //     setDailyFakeVolumeDataArray(fakeVolume);
  //     setDailyLoanVolumeDataArray(loanVolume);
  //     setDailyTrueVolumeDataArray(trueVolume);
  //     setDailyTrueVolumeLabels(labels);
  //   }
  // }, [timespan]);

  return (
    <div className="chart__grid chart__grid--gap">
      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__chart-actions-lockup">
          <ChartDataToggles
            title="Daily True Volume"
            onClick={(arg1, arg2) => handleTrendlineTimeferame(arg1, arg2)}
          />
          <animated.div style={{ ...springs1 }} className="chart__container">
            <DailyTrueVolumeChart
              labels={dailyTrueVolumeLabels}
              data={{
                true_volume: dailyTrueVolumeDataArray,
                loan_volume: dailyLoanVolumeDataArray,
                fake_volume: dailyFakeVolumeDataArray,
              }}
            />
          </animated.div>
        </div>
      </div>

      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__grid chart__grid--gap">
          <div className="chart__chart-actions-lockup">
            <ChartDataToggles
              title={`${renderTimeframeAsString()}`}
              onClick={(arg1, arg2) => handleTrendlineTimeferame(arg1, arg2)}
            />
          </div>
          <animated.div
            style={{ ...springs2 }}
            className=" chart__grid-cell--half"
          >
            <div className="chart__container">
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
                          value: parseFloat(renderTrueTotalPercentage()),
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
                          {renderTrueTotalPercentage()}%
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
                trend_timespan={-30}
              />
              <p className="typography__label--1 typography__color--white">
                90 Day Trend
              </p>
            </div>
          </animated.div>
          <animated.div
            style={{ ...springs3 }}
            className="chart__grid-cell--half"
          >
            <div className="chart__container">
              <h3 className="typography__label--1">Total Volume</h3>
              <p className="typography__paragraph--1">
                NFT trading volume across all transaction types
              </p>
              <div className="chart__legend">
                <div className="chart__legend-item chart__legend-item--true-volume">
                  <p className="typography__label--3">Real Volume Trend</p>
                </div>
                <div className="chart__legend-item chart__legend-item--loan-volume">
                  <p className="typography__label--3">Loan Volume Trend</p>
                </div>
                <div className="chart__legend-item chart__legend-item--fake-volume">
                  <p className="typography__label--3">Fake Volume Trend</p>
                </div>
                <div className="chart__legend-item chart__legend-item--total-volume">
                  <p className="typography__label--3">Total Volume Trend</p>
                </div>
              </div>
              <TotalVolumeAllLineChart
                labels={trendlineVolumeLabels}
                data={{
                  true_volume_moving_average: trueVolumeMovingAverage,
                  loan_volume_moving_average: loanVolumeMovingAverage,
                  fake_volume_moving_average: fakeVolumeMovingAverage,
                  total_volume_moving_average: totalVolumeMovingAverage,
                }}
              />
              <p className="typography__label--1 typography__color--white">
                90 Day Trend
              </p>
            </div>
          </animated.div>
        </div>
      </div>

      <Leaderboards
        collection_names={leaderboard.names.slice(0, 5)}
        true_volume={leaderboard.true_volumes.slice(0, 5)}
        true_volume_percentage={leaderboard.true_volume_percentage.slice(0, 5)}
        loan_volume={leaderboard.loan_volume.slice(0, 5)}
        revenue={leaderboard.revenue.slice(0, 5)}
        fake_volume={leaderboard.fake_volume.slice(0, 5)}
        fake_volume_percentage={leaderboard.fake_volume_percentage.slice(0, 5)}
      />
    </div>
  );
};

export default CompactView;
