"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CryptoIcon from "@assets/icons/crypto.svg";

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
import { numFormatter } from "@/utils/numFormatter";

// Types
import type {
  FakeVolumeTypes,
  TrueVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
} from "@/app/types";

// Components
import TrendLineChart from "@components/charts/trendLineChart";
import TrueVolumeBarChart from "@components/charts/trueVolumeBar";
import Leaderboard from "@components/leaderboard/leaderboard";
import ChartDataToggles from "@components/toggles/chart_data";
import HeroBarChart from "@components/charts/heroBarChart";
import ProgressRing from "@components/charts/progressRing";
import Traders, { TradersTimeframeTypes } from "../traders/traders";
import TimeframeAsString from "@/utils/timeframeAsString";
import TwoColumnGrid from "@/grids/twoColumnGrid";
import DecimalFormatter from "@/utils/decimalFormatter";
import PercentChangeColors from "@/utils/percentChangeColors";

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

export type PercentChangeTimeframeTypes = {
  oneDay: number;
  sevenDay: number;
  thirtyDay: number;
  ninetyDay: number;
};
interface VolumeChartProps {
  labels: string[];
  trueVolume: any[];
  loanVolume: any[];
  totalVolume: any[];
  fakeVolume: any[];
  realPercentDifference: number[];
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: {
    trueVolume: {
      oneDay: TrueVolumeTypes[];
      sevenDay: TrueVolumeTypes[];
      thirtyDay: TrueVolumeTypes[];
      ninetyDay: TrueVolumeTypes[];
      all: TrueVolumeTypes[];
    };
    fakeVolume: {
      oneDay: FakeVolumeTypes[];
      sevenDay: FakeVolumeTypes[];
      thirtyDay: FakeVolumeTypes[];
      ninetyDay: FakeVolumeTypes[];
      all: FakeVolumeTypes[];
    };
    loanVolume: {
      oneDay: LoanVolumeTypes[];
      sevenDay: LoanVolumeTypes[];
      thirtyDay: LoanVolumeTypes[];
      ninetyDay: LoanVolumeTypes[];
      all: LoanVolumeTypes[];
    };
    royalty: {
      oneDay: RoyaltyTypes[];
      sevenDay: RoyaltyTypes[];
      thirtyDay: RoyaltyTypes[];
      ninetyDay: RoyaltyTypes[];
      all: RoyaltyTypes[];
    };
  };
  traders: {
    onlyBought: number[];
    onlyBoughtMovingAverage: number[];
    onlySold: number[];
    onlySoldMovingAverage: number[];
    boughtAndSold: number[];
    boughtAndSoldMovingAverage: number[];
    activeWallets: TradersTimeframeTypes;
    newWallets: TradersTimeframeTypes;
    trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalPercentChangeTimeframeData: PercentChangeTimeframeTypes;
    truePercentChangeTimeframeData: PercentChangeTimeframeTypes;
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

  const [dailyTimeframe, setDailyTimeframe] = useState(1);
  useEffect(() => {
    if (dailyTimeframe === 0) {
      setDailyFakeVolumeDataArray(fakeVolume);
      setDailyLoanVolumeDataArray(loanVolume);
      setDailyTrueVolumeDataArray(trueVolume);
      setDailyTrueVolumeLabels(labels);
    }
    if (dailyTimeframe === 1) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 1));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 1));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 1));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
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
    if (dailyTimeframe === 30) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }

    if (dailyTimeframe === 90) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 90));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 90));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 90));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
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

  const [loanVolumeTrendDisabled, setLoanVolumeTrendDisabled] = useState(false);
  const [fakeVolumeTrendDisabled, setFakeVolumeTrendDisabled] = useState(false);

  const trendlineLegendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");

      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "loan-volume-trend") {
            setLoanVolumeTrendDisabled(!loanVolumeTrendDisabled);
          }
          if (domEls[i].id === "fake-volume-trend") {
            setFakeVolumeTrendDisabled(!fakeVolumeTrendDisabled);
          }
        }
      }
    }
  };

  const [totalVolumeTimeframeSummaryData, setTotalVolumeTimeframeSummaryData] =
    useState(traders.totalVolumeTimeframeSummaryData.oneDay);
  const [trueVolumeTimeframeSummaryData, setTrueVolumeTimeframeSummaryData] =
    useState(traders.trueVolumeTimeframeSummaryData.oneDay);

  const [totalPercentChangeTimeframe, setTotalPercentChangeTimeframe] =
    useState(traders.totalPercentChangeTimeframeData.oneDay);

  const [truePercentChangeTimeframe, setTruePercentChangeTimeframe] = useState(
    traders.truePercentChangeTimeframeData.oneDay
  );

  useEffect(() => {
    if (timeframe === 0) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.all
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.all
      );
    }
    if (timeframe === 1) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.oneDay
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.oneDay
      );
      setTotalPercentChangeTimeframe(
        traders.totalPercentChangeTimeframeData.oneDay
      );
      setTruePercentChangeTimeframe(
        traders.truePercentChangeTimeframeData.oneDay
      );
    }
    if (timeframe === 7) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.sevenDay
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.sevenDay
      );
      setTotalPercentChangeTimeframe(
        traders.totalPercentChangeTimeframeData.sevenDay
      );
      setTruePercentChangeTimeframe(
        traders.truePercentChangeTimeframeData.sevenDay
      );
    }
    if (timeframe === 30) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.thirtyDay
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.thirtyDay
      );
      setTotalPercentChangeTimeframe(
        traders.totalPercentChangeTimeframeData.thirtyDay
      );
      setTruePercentChangeTimeframe(
        traders.truePercentChangeTimeframeData.thirtyDay
      );
    }
    if (timeframe === 90) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.ninetyDay
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.ninetyDay
      );
      setTotalPercentChangeTimeframe(
        traders.totalPercentChangeTimeframeData.ninetyDay
      );
      setTruePercentChangeTimeframe(
        traders.truePercentChangeTimeframeData.ninetyDay
      );
    }
  }, [timeframe]);

  return (
    <>
      {/* TWO COLUMN GRID */}
      <TwoColumnGrid
        column1={{
          header: (
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
          ),
          content: (
            <>
              <animated.div
                style={{ ...springs1 }}
                className="grid__col-content"
              >
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
                  legendLabels={[
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
              </animated.div>
            </>
          ),
        }}
        column2={{
          header: (
            <animated.div
              style={{ ...springs1 }}
              className="grid grid--one-col"
            >
              <div className="chart__chart-actions-lockup">
                <ChartDataToggles
                  title={TimeframeAsString(timeframe)}
                  onClick={(arg1, arg2) =>
                    handleTrendlineTimeferame(arg1, arg2)
                  }
                  active={timeframe}
                />
              </div>
            </animated.div>
          ),
          content: (
            <>
              <div className="grid grid__two-col">
                <animated.div
                  style={{ ...springs2 }}
                  className="grid__col-content"
                >
                  <div className="grid__col-container-body">
                    <div className="chart__info">
                      <ProgressRing
                        timeframe={timeframe}
                        true_volume={dailyTrueVolumeDataArray}
                        loan_volume={dailyLoanVolumeDataArray}
                        fake_volume={dailyFakeVolumeDataArray}
                      />
                      <div>
                        <div className="chart__value-percent-lockup">
                          <p className="typography__label--2">
                            <Image src={CryptoIcon} alt="Crypto Icon" />
                            {numFormatter(trueVolumeTimeframeSummaryData)}
                          </p>
                          {/* Percent Change */}
                          {timeframe !== 0 && (
                            <p
                              className="typography__display--4"
                              style={{
                                color: PercentChangeColors(
                                  truePercentChangeTimeframe[0]
                                ),
                              }}
                            >
                              {truePercentChangeTimeframe[0] > 0 && "+"}
                              {DecimalFormatter(truePercentChangeTimeframe[0])}%
                            </p>
                          )}
                        </div>

                        <h3 className="typography__subtitle--2">True Volume</h3>
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
                    <div className="chart__container-footer">
                      <p className="typography__label--3 typography__color--dark-bg-3">
                        90 Day Trend
                      </p>
                    </div>
                  </div>
                </animated.div>

                <animated.div
                  style={{ ...springs3 }}
                  className="grid__col-content"
                >
                  <div className="grid__col-container-body">
                    <div>
                      <div className="chart__value-percent-lockup">
                        <p className="typography__label--2">
                          <Image src={CryptoIcon} alt="Crypto Icon" />
                          {numFormatter(totalVolumeTimeframeSummaryData)}
                        </p>
                        {/* Percent Change */}
                        {timeframe !== 0 && (
                          <p
                            className="typography__display--4"
                            style={{
                              color: PercentChangeColors(
                                totalPercentChangeTimeframe[0]
                              ),
                            }}
                          >
                            {totalPercentChangeTimeframe[0] > 0 && "+"}
                            {DecimalFormatter(totalPercentChangeTimeframe[0])}%
                          </p>
                        )}
                      </div>
                      <h3 className="typography__subtitle--2">Total Volume</h3>
                      <p className="typography__paragraph--1">
                        NFT trading volume across all transaction types
                      </p>
                    </div>

                    <TrendLineChart
                      legendOnClick={(e: string) => trendlineLegendOnClick(e)}
                      labels={trendlineVolumeLabels}
                      legendLabels={[
                        {
                          color: "accent-yellow",
                          name: "Loan Volume Trend",
                          id: "loan-volume-trend",
                        },
                        {
                          color: "accent-orange",
                          name: "Fake Volume Trend",
                          id: "fake-volume-trend",
                        },
                      ]}
                      datasets={[
                        {
                          label: "Loan Volume Trend",
                          data: loanVolumeTrendDisabled
                            ? []
                            : loanVolumeMovingAverage.slice(
                                loanVolumeMovingAverage.length - 90
                              ),
                          borderColor: loanVolumeDisabled
                            ? "rgba(250, 176, 5, 0)"
                            : "rgba(250, 176, 5, 1)",
                          backgroundColor: loanVolumeDisabled
                            ? "rgba(250, 176, 5, 0)"
                            : "rgba(250, 176, 5, 1)",
                          pointRadius: 0,
                          borderWidth: 3,
                        },
                        {
                          label: "Fake Volume Trend",
                          data: fakeVolumeTrendDisabled
                            ? []
                            : fakeVolumeMovingAverage.slice(
                                fakeVolumeMovingAverage.length - 90
                              ),
                          borderColor: fakeVolumeDisabled
                            ? "rgba(253, 126, 20, 0)"
                            : "rgba(253, 126, 20, 1)",
                          backgroundColor: fakeVolumeDisabled
                            ? "rgba(253, 126, 20, 0)"
                            : "rgba(253, 126, 20, 1)",
                          pointRadius: 0,
                          borderWidth: 3,
                        },
                      ]}
                    />
                    <div className="chart__container-footer">
                      <p className="typography__label--3  typography__color--dark-bg-3">
                        90 Day Trend
                      </p>
                    </div>
                  </div>
                </animated.div>
              </div>
            </>
          ),
        }}
      />

      {/* Leaderboard Row */}
      <Leaderboard
        showTimeframeToggles={true}
        leaderboardData={{
          trueVolume: {
            oneDay: leaderboard.trueVolume.oneDay,
            sevenDay: leaderboard.trueVolume.sevenDay,
            thirtyDay: leaderboard.trueVolume.thirtyDay,
            ninetyDay: leaderboard.trueVolume.ninetyDay,
            all: leaderboard.trueVolume.all,
          },
          fakeVolume: {
            oneDay: leaderboard.fakeVolume.oneDay,
            sevenDay: leaderboard.fakeVolume.sevenDay,
            thirtyDay: leaderboard.fakeVolume.thirtyDay,
            ninetyDay: leaderboard.fakeVolume.ninetyDay,
            all: leaderboard.fakeVolume.all,
          },
          loanVolume: {
            oneDay: leaderboard.loanVolume.oneDay,
            sevenDay: leaderboard.loanVolume.sevenDay,
            thirtyDay: leaderboard.loanVolume.thirtyDay,
            ninetyDay: leaderboard.loanVolume.ninetyDay,
            all: leaderboard.loanVolume.all,
          },
          royalty: {
            oneDay: leaderboard.royalty.oneDay,
            sevenDay: leaderboard.royalty.sevenDay,
            thirtyDay: leaderboard.royalty.thirtyDay,
            ninetyDay: leaderboard.royalty.ninetyDay,
            all: leaderboard.royalty.all,
          },
        }}
      />

      {/* Traders row */}
      <Traders
        labels={labels}
        realPercentDifference={[32.4]} // to be updated
        onlyBought={traders.onlyBought}
        onlyBoughtMovingAverage={traders.onlyBoughtMovingAverage}
        onlySold={traders.onlySold}
        onlySoldMovingAverage={traders.onlySoldMovingAverage}
        boughtAndSold={traders.boughtAndSold}
        boughtAndSoldMovingAverage={traders.boughtAndSoldMovingAverage}
        activeWallets={traders.activeWallets}
        newWallets={traders.newWallets}
      />
    </>
  );
};

export default MarketOverview;
