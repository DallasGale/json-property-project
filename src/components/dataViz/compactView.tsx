"use client";

import { useEffect, useState } from "react";

// Utils
import Image from "next/image";
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
  TrueVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
} from "@/app/types";

// Components
import { RingProgress, Text } from "@mantine/core";
import TotalVolumeAllLineChart from "@components/charts/totalVolumeAllLine";
import TrueVolumeBarChart from "@components/charts/trueVolumeBar";

import Leaderboard from "@components/leaderboard/leaderboard";
import ChartDataToggles from "@components/toggles/chart_data";
import DailyTrueVolumeChart from "@components/charts/dailyTrueVolume";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";

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
    true_volume: TrueVolumeTypes[];
    fake_volume: FakeVolumeTypes[];
    loan_volume: LoanVolumeTypes[];
    royalty: RoyaltyTypes[];
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
    .slice(labels.length - 90)
    .map((data: any) => data);

  const trendlineTrueVolumeArray = trueVolume.slice(trueVolume.length - 90);

  // Timeframe toggle
  const renderTrueTotalPercentage = () => {
    let out = "0";

    if (timeframe === 0) {
      const trueV: any = trueVolume;
      const totalV: any = totalVolume;

      const totatalledTrueVolume = trueV.reduce((a: any, b: any) => a + b, 0);
      const totatalledTotalVolume = totalV.reduce((a: any, b: any) => a + b, 0);
      out = ((totatalledTrueVolume / totatalledTotalVolume) * 100).toFixed(0);
    } else if (timeframe === 1) {
      const trueV: any = trueVolume[trueVolume.length - timeframe];
      const totalV: any = totalVolume[totalVolume.length - timeframe];
      out = ((trueV / totalV) * 100).toFixed(0);
    } else {
      const trueV: any = trueVolume.slice(trueVolume.length - timeframe);
      const totalV: any = totalVolume.slice(totalVolume.length - timeframe);

      const totatalledTrueVolume = trueV.reduce((a: any, b: any) => a + b, 0);
      const totatalledTotalVolume = totalV.reduce((a: any, b: any) => a + b, 0);
      out = ((totatalledTrueVolume / totatalledTotalVolume) * 100).toFixed(0);
    }
    return out;
  };

  const renderTimeframeAsString = () => {
    if (timeframe === 0) return "All Time";
    else if (timeframe === 1) return "Last 24 Hours";
    else if (timeframe === 7) return "Last 7 Days";
    else if (timeframe === 30) return "Last 30 Days";
    else if (timeframe === 90) return "Last 90 Days";
    else return;
  };

  const [timeframe, setTimeframe] = useState(1);
  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

  // Daily True
  const [dailyTrueVolumeLabels, setDailyTrueVolumeLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [dailyTrueVolumeDataArray, setDailyTrueVolumeDataArray] = useState(
    trueVolume.slice(trueVolume.length - 90)
  );
  const [dailyLoanVolumeDataArray, setDailyLoanVolumeDataArray] = useState(
    loanVolume.slice(loanVolume.length - 90)
  );
  const [dailyFakeVolumeDataArray, setDailyFakeVolumeDataArray] = useState(
    fakeVolume.slice(fakeVolume.length - 90)
  );

  const [dailyTimeframe, setDailyTimeframe] = useState(90);
  useEffect(() => {
    if (dailyTimeframe === 90) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 90));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 90));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 90));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
    if (dailyTimeframe === 30) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (dailyTimeframe === 7) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 7));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }

    if (dailyTimeframe === 1) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 1));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 1));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 1));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }

    if (dailyTimeframe === 0) {
      setDailyFakeVolumeDataArray(fakeVolume);
      setDailyLoanVolumeDataArray(loanVolume);
      setDailyTrueVolumeDataArray(trueVolume);
      setDailyTrueVolumeLabels(labels);
    }
  }, [dailyTimeframe]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setDailyTimeframe(value);
  }

  return (
    <>
      <div className="chart__grid chart__grid--two-col">
        {/* Col 1 */}
        <div className="chart__grid--row">
          <animated.div
            style={{ ...springs1 }}
            className="chart__grid chart__grid--one-col"
          >
            <div className="chart__chart-actions-lockup">
              <ChartDataToggles
                title="Daily True Volume"
                onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
                active={dailyTimeframe}
              />
            </div>
          </animated.div>
          <animated.div
            style={{ ...springs1 }}
            className="chart__grid chart__grid--one-col"
          >
            <div className="chart__container">
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
        </div>

        {/* Col 2 */}
        <div className="chart__grid--row">
          <animated.div
            style={{ ...springs1 }}
            className="chart__grid chart__grid--one-col"
          >
            <div className="chart__chart-actions-lockup">
              <ChartDataToggles
                title={`${renderTimeframeAsString()}`}
                onClick={(arg1, arg2) => handleTrendlineTimeferame(arg1, arg2)}
                active={timeframe}
              />
            </div>
          </animated.div>

          <div className="chart__grid chart__grid--two-col">
            <animated.div style={{ ...springs2 }} className="chart__container">
              <div className="chart__container-body">
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
                    <p className="typography__label--2">
                      <Image src={CryptoIcon} alt="Crypto Icon" />
                      {`${kFormatter(
                        realPercentDifference[realPercentDifference.length - 1]
                      )}k`}
                    </p>
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
                  trend_timespan={-90}
                />
              </div>

              <div className="chart__container-footer">
                <p className="typography__label--3 typography__color--dark-bg-3">
                  90 Day Trend
                </p>
              </div>
              {/* </div> */}
            </animated.div>

            <animated.div style={{ ...springs3 }} className="chart__container">
              <div className="chart__container-body">
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
              <div className="chart__container-footer">
                <p className="typography__label--3  typography__color--dark-bg-3">
                  90 Day Trend
                </p>
              </div>
            </animated.div>
          </div>
        </div>
      </div>

      <Leaderboard
        true_volume={leaderboard.true_volume}
        fake_volume={leaderboard.fake_volume}
        loan_volume={leaderboard.loan_volume}
        royalty={leaderboard.royalty}
      />
    </>
  );
};

export default CompactView;
