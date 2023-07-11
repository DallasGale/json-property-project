"use client";

import { useEffect, useState } from "react";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import annotationPlugin from "chartjs-plugin-annotation";
import chartTrendline from "chartjs-plugin-trendline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  PointElement,
  Tooltip,
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
import TrendLineChart from "@components/charts/trendLineChart";
import TrueVolumeBarChart from "@components/charts/trueVolumeBar";
import DynamicVolumeNumber from "@components/dataViz/dynamicVolumeNumber/dynamicVolumeNumber";
import Leaderboard from "@components/leaderboard/leaderboard";
import ChartDataToggles from "@components/toggles/chart_data";
import HeroBarChart from "@components/charts/heroBarChart";
import ProgressRing from "@components/charts/progressRing";
import Traders from "../traders/traders";
import TimeframeAsString from "@/utils/timeframeAsString";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
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
    trueVolume: TrueVolumeTypes[];
    fakeVolume: FakeVolumeTypes[];
    loanVolume: LoanVolumeTypes[];
    royalty: RoyaltyTypes[];
  };
  traders: {
    onlyBought: any[];
    onlySold: any[];
    boughtAndSold: any[];
  };
}
const MarketOverview: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  realPercentDifference,
  totalVolume,
  loanVolume,
  fakeVolume,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  leaderboard,
  traders,
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

  const [timeframe, setTimeframe] = useState<number>(1);
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

  const [trueVolumeDisabled, setTrueVolumeDisabled] = useState(false);
  const [loanVolumeDisabled, setLoanVolumeDisabled] = useState(false);
  const [fakeVolumeDisabled, setFakeVolumeDisabled] = useState(false);

  const onClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "true-volume") {
            setTrueVolumeDisabled(!trueVolumeDisabled);
          }
          if (domEls[i].id === "loan-volume") {
            setLoanVolumeDisabled(!loanVolumeDisabled);
          }
          if (domEls[i].id === "fake-volume") {
            setFakeVolumeDisabled(!fakeVolumeDisabled);
          }
        }
      }
    }
  };

  return (
    <>
      {/* TWO COLUMN GRID */}
      <div className="chart__grid chart__grid--two-col">
        {/* COL. 1 */}
        <div className="chart__grid">
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
              <HeroBarChart
                legendOnClick={(e: string) => onClick(e)}
                labels={dailyTrueVolumeLabels}
                datasets={[
                  {
                    label: "True Volume",
                    data: trueVolumeDisabled ? [] : dailyTrueVolumeDataArray,
                    borderColor: "white",
                    backgroundColor: "rgba(64, 192, 87, 1)",
                  },
                  {
                    label: "Loans",
                    data: loanVolumeDisabled ? [] : dailyLoanVolumeDataArray,
                    borderColor: "black",
                    backgroundColor: "rgba(250, 176, 5, 1)",
                  },
                  {
                    label: "Fake Volume (Inorganic)",
                    data: fakeVolumeDisabled ? [] : dailyFakeVolumeDataArray,
                    borderColor: "white",
                    backgroundColor: "rgba(253, 126, 20, 1)",
                  },
                ]}
                legendLables={[
                  {
                    color: "accent-green",
                    name: "True Volume",
                    id: "true-volume",
                  },
                  {
                    color: "accent-yellow",
                    name: "Loan Volume",
                    id: "loan-volume",
                  },
                  {
                    color: "accent-orange",
                    name: "Fake Volume",
                    id: "fake-volume",
                  },
                ]}
              />
            </div>
          </animated.div>
        </div>

        {/* COL 2 */}
        <div className="chart__grid">
          <animated.div
            style={{ ...springs1 }}
            className="chart__grid chart__grid--one-col"
          >
            <div className="chart__chart-actions-lockup">
              <ChartDataToggles
                title={TimeframeAsString(timeframe)}
                onClick={(arg1, arg2) => handleTrendlineTimeferame(arg1, arg2)}
                active={timeframe}
              />
            </div>
          </animated.div>

          <div className="chart__grid chart__grid--two-col">
            <animated.div style={{ ...springs2 }} className="chart__container">
              <div className="chart__container-body">
                <div className="chart__info">
                  <ProgressRing
                    timeframe={timeframe}
                    true_volume={dailyTrueVolumeDataArray}
                    loan_volume={dailyLoanVolumeDataArray}
                    fake_volume={dailyFakeVolumeDataArray}
                  />
                  <div>
                    <DynamicVolumeNumber
                      timeframe={timeframe}
                      volumes={realPercentDifference}
                    />
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
            </animated.div>

            <animated.div style={{ ...springs3 }} className="chart__container">
              <div className="chart__container-body">
                <DynamicVolumeNumber
                  timeframe={timeframe}
                  volumes={realPercentDifference}
                />
                <h3 className="typography__label--1">Total Volume</h3>
                <p className="typography__paragraph--1">
                  NFT trading volume across all transaction types
                </p>

                <TrendLineChart
                  labels={trendlineVolumeLabels}
                  data={{
                    loan_volume_moving_average: loanVolumeMovingAverage,
                    fake_volume_moving_average: fakeVolumeMovingAverage,
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

      {/* Leaderboard Row */}
      <Leaderboard
        true_volume={leaderboard.trueVolume}
        fake_volume={leaderboard.fakeVolume}
        loan_volume={leaderboard.loanVolume}
        royalty={leaderboard.royalty}
      />

      {/* Traders row */}
      <Traders
        labels={labels}
        onlyBought={traders.onlyBought}
        onlySold={traders.onlySold}
        boughtAndSold={traders.boughtAndSold}
      />
    </>
  );
};

export default MarketOverview;
