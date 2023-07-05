"use client";

import { useState, useEffect } from "react";

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
import type {
  DatasetsType,
  FakeVolumeTypes,
  LoanVolumeTypes,
  TrueVolumeTypes,
} from "@/app/types";

// Components
import { RingProgress, Text } from "@mantine/core";
import TrueVolumeLineChart from "@components/charts/trueVolumeLine";
import LoanVolumeChart from "@components/charts/loanVolume";
import FakeVolumeChart from "@components/charts/fakeVolume";
import TotalVolumeChart from "@components/charts/totalVolume";
import Leaderboard from "@components/leaderboard/leaderboard";

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
  leaderboard: {
    true_volume: TrueVolumeTypes[];
    fake_volume: FakeVolumeTypes[];
    loan_volume: LoanVolumeTypes[];
  };
}
const ExpandedView: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  realPercentDifference,
  totalVolume,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
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
  const springs4 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 450,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  const springs5 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 600,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  const [timespan, setTimespan] = useState(null);
  const [trendlineTimespan, setTrendlineTimespan] = useState(-90);

  function handleTrendChartTimeframe(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTrendlineTimespan(value);
  }

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
      <div className="chart__grid-cell chart__grid-cell--full">
        <div className="chart__chart-actions-lockup">
          <ChartDataToggles
            title="Daily True Volume"
            onClick={(arg1, arg2) =>
              handleDailyTrueVolumeTimeferame(arg1, arg2)
            }
            active={null}
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
      <animated.div
        style={{ ...springs2 }}
        className="chart__grid-cell chart__grid-cell--half"
      >
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
      </animated.div>
      <animated.div
        style={{ ...springs4 }}
        className="chart__grid-cell chart__grid-cell--half"
      >
        <div className="chart__container">
          <h3 className="typography__label--1">Total Volume</h3>
          <p className="typography__paragraph--1">
            NFT trading volume across all transaction types
          </p>

          <div className="chart__legend">
            <div className="chart__legend-item chart__legend-item--secondary">
              <p className="typography__label--3">Fake Volume (Inorganic)</p>
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
      </animated.div>
      <animated.div
        style={{ ...springs5 }}
        className="chart__grid-cell chart__grid-cell--half"
      >
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
      </animated.div>
      <Leaderboard
        true_volume={leaderboard.true_volume}
        fake_volume={leaderboard.fake_volume}
        loan_volume={leaderboard.loan_volume}
      />
    </div>
  );
};

export default ExpandedView;
