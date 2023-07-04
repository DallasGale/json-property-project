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

import ChartDataToggles from "@components/toggles/chart_data";
import DailyTrueVolumeChart from "@components/charts/dailyTrueVolume";

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

  const renderTrueTotalPercentage = () => {
    const trueV: any = trueVolume[trueVolume.length - 1];
    const totalV: any = totalVolume[totalVolume.length - 1];
    return (trueV / totalV).toFixed(0);
  };

  const [timespan, setTimespan] = useState(-30);
  function handleDailyTrueVolumeTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimespan(value);
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
  return (
    <div className="chart__grid chart__grid--gap">
      <animated.div
        style={{ ...springs1 }}
        className="chart__grid-cell chart__grid-cell--half"
      >
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
      </animated.div>

      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__grid chart__grid--gap">
          <animated.div
            style={{ ...springs2 }}
            className="chart__grid-cell chart__grid-cell--half"
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
                trend_timespan={-30}
              />
            </div>
          </animated.div>
          <animated.div
            style={{ ...springs3 }}
            className="chart__grid-cell chart__grid-cell--half"
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
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default CompactView;
