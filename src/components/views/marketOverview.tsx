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
import { VolumeFormatter } from "@utils/volumeFormatter";

// Components
import TrendLineChart from "@components/charts/trendLineChart";
import TrueVolumeBarChart from "@components/charts/trueVolumeBar";
import Leaderboard from "@components/leaderboard/leaderboard";
import ChartDataToggles from "@components/toggles/chart_data";
import HeroBarChart from "@components/charts/heroBarChart";
import ProgressRing from "@components/charts/progressRing";
import TimeframeAsString from "@utils/timeframeAsString";
import TwoColumnGrid from "@/grids/twoColumnGrid";
import DecimalFormatter from "@utils/decimalFormatter";
import ChartHeader from "../charts/chartHeader";
import DateRange from "../dateRange/dateRange";

// Types
import type { IMarketOverviewProps } from "@/app/types";
import Overview from "../overview/overview";
import { legendLabels } from "@constants/legendLabels";
import TradersOverview from "../overview/traders/traders";
import RevenueOverview from "../overview/revenue/revenue";

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

const MarketOverview: React.FC<IMarketOverviewProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  leaderboard,
  activeWalletsOnlyBought,
  activeWalletsOnlySold,
  activeWalletsBoughtAndSold,
  traders,
  revenue,
}) => {
  // Animations
  const springs1 = useSpring({
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
  const springs2 = useSpring({
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

  // Trendline
  const trendlineVolumeLabels = labels
    .slice(labels.length - 90)
    .map((data: any) => data);

  const trendlineTrueVolumeArray = trueVolume.slice(trueVolume.length - 90);

  const [trueTotalTimeframe, setTrueTotalTimeframe] = useState<number>(1);
  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTrueTotalTimeframe(value);
  }

  // ------------------------------------------------------
  // Overview - Daily True Volume
  // ------------------------------------------------------
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

  const [dailyTimeframeClicked, setDailyTimeframeClicked] = useState(false);
  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setDailyTimeframeClicked(true);
    setDailyTimeframe(value);
    setTimeout(() => {
      setDailyTimeframeClicked(false);
    }, 500);
  }

  const [trueVolumeDisabled, setTrueVolumeDisabled] = useState(false);
  const [loanVolumeDisabled, setLoanVolumeDisabled] = useState(false);
  const [fakeVolumeDisabled, setFakeVolumeDisabled] = useState(false);

  const handleDailyHeroChartTimeframeOnClick = (e: string) => {
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

  // Total Volume Summary DataPoints
  const [loanVolumeTotalSummararyData, setLoanVolumeTotalSummararyData] =
    useState(traders.loanVolumeTimeframeSummaryData.oneDay);
  const [fakeVolumeTotalSummararyData, setFakeVolumeTotalSummararyData] =
    useState(traders.fakeVolumeTimeframeSummaryData.oneDay);
  const [trueVolumeTotalSummararyData, setTrueVolumeTotalSummararyData] =
    useState(traders.trueVolumeTimeframeSummaryData.oneDay);
  const [loanVolumeDoughnutSummararyData, setLoanVolumeDoughnutSummararyData] =
    useState(traders.loanVolumeTimeframeSummaryData.oneDay);

  useEffect(() => {
    if (trueTotalTimeframe === 0) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.all
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.all
      );
      setTrueVolumeTotalSummararyData(
        traders.trueVolumeTimeframeSummaryData.all
      );
      setFakeVolumeTotalSummararyData(
        traders.fakeVolumeTimeframeSummaryData.all
      );
      setLoanVolumeTotalSummararyData(
        traders.loanVolumeTimeframeSummaryData.all
      );
    }
    if (trueTotalTimeframe === 1) {
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
      setTrueVolumeTotalSummararyData(
        traders.trueVolumeTimeframeSummaryData.oneDay
      );
      setFakeVolumeTotalSummararyData(
        traders.fakeVolumeTimeframeSummaryData.oneDay
      );
      setLoanVolumeTotalSummararyData(
        traders.loanVolumeTimeframeSummaryData.oneDay
      );
    }
    if (trueTotalTimeframe === 7) {
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

      setTrueVolumeTotalSummararyData(
        traders.trueVolumeTimeframeSummaryData.sevenDay
      );
      setFakeVolumeTotalSummararyData(
        traders.fakeVolumeTimeframeSummaryData.sevenDay
      );
      setLoanVolumeTotalSummararyData(
        traders.loanVolumeTimeframeSummaryData.sevenDay
      );
    }
    if (trueTotalTimeframe === 30) {
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

      setTrueVolumeTotalSummararyData(
        traders.trueVolumeTimeframeSummaryData.thirtyDay
      );
      setFakeVolumeTotalSummararyData(
        traders.fakeVolumeTimeframeSummaryData.thirtyDay
      );
      setLoanVolumeTotalSummararyData(
        traders.loanVolumeTimeframeSummaryData.thirtyDay
      );
    }
    if (trueTotalTimeframe === 90) {
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

      setTrueVolumeTotalSummararyData(
        traders.trueVolumeTimeframeSummaryData.ninetyDay
      );
      setFakeVolumeTotalSummararyData(
        traders.fakeVolumeTimeframeSummaryData.ninetyDay
      );
      setLoanVolumeTotalSummararyData(
        traders.loanVolumeTimeframeSummaryData.ninetyDay
      );
    }
  }, [trueTotalTimeframe]);

  return (
    <>
      {/* TODO:replace below with  <Overview ... /> */}
      {/* TWO COLUMN GRID */}
      <TwoColumnGrid
        column1={{
          header: (
            <animated.div
              style={{ ...springs2 }}
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
                  timeframeClicked={dailyTimeframeClicked}
                  timeframe={dailyTimeframe}
                  legendOnClick={(e: string) =>
                    handleDailyHeroChartTimeframeOnClick(e)
                  }
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
                      backgroundColor: "rgba(250, 82, 82, 1)",
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
                      color: "accent-red",
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
              style={{ ...springs2 }}
              className="grid grid--one-col"
            >
              <div className="chart__chart-actions-lockup">
                <ChartDataToggles
                  title={TimeframeAsString(trueTotalTimeframe)}
                  onClick={(arg1, arg2) =>
                    handleTrendlineTimeferame(arg1, arg2)
                  }
                  active={trueTotalTimeframe}
                />
              </div>
            </animated.div>
          ),
          content: (
            <>
              <div className="grid grid__two-col">
                <animated.div
                  style={{ ...springs1 }}
                  className="grid__col-content grid__col-content--chart"
                >
                  <div className="grid__col-container-body">
                    <div className="chart__info">
                      <ProgressRing
                        trueVolume={trueVolumeTotalSummararyData}
                        loanVolume={loanVolumeTotalSummararyData}
                        fakeVolume={fakeVolumeTotalSummararyData}
                        percentage={`${DecimalFormatter(
                          (trueVolumeTotalSummararyData[0] /
                            totalVolumeTimeframeSummaryData[0]) *
                            100
                        )}`}
                      />
                      <ChartHeader
                        value={`${VolumeFormatter(
                          trueVolumeTimeframeSummaryData
                        )}`}
                        withCryptoIcon={true}
                        valueDiff={truePercentChangeTimeframe[0]}
                        title="True Volume"
                        description="Excludes fake volume like loans, points farming and wash trading."
                      />
                    </div>
                    <div className="chart__seperator" />
                    <div>
                      <TrueVolumeBarChart
                        labels={trendlineVolumeLabels}
                        data={{ true_volume: trendlineTrueVolumeArray }}
                        trend_timespan={-90}
                      />
                      <div className="chart__container-footer">
                        <p className="typography__label--medium typography__transform--uppercase">
                          90 Day Trend
                        </p>
                        <DateRange />
                      </div>
                    </div>
                  </div>
                </animated.div>

                <animated.div
                  style={{ ...springs1 }}
                  className="grid__col-content grid__col-content--chart"
                >
                  <div className="grid__col-container-body">
                    <ChartHeader
                      value={`${VolumeFormatter(
                        totalVolumeTimeframeSummaryData
                      )}`}
                      withCryptoIcon={true}
                      valueDiff={totalPercentChangeTimeframe[0]}
                      title="Total Volume"
                      description=""
                    />

                    <div className="chart__seperator" />
                    <TrendLineChart
                      legendItemVolume={[
                        {
                          id: "loan-volume-trend",
                          value: loanVolumeTotalSummararyData[0],
                        },
                        {
                          id: "fake-volume-trend",
                          value: fakeVolumeTotalSummararyData[0],
                        },
                      ]}
                      legendOnClick={(e: string) => trendlineLegendOnClick(e)}
                      labels={trendlineVolumeLabels}
                      legendFormat="vertical"
                      legendLabels={[
                        {
                          color: "accent-yellow",
                          name: "Loan Volume Trend",
                          id: "loan-volume-trend",
                        },
                        {
                          color: "accent-red",
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
                            ? "rgba(250, 82, 82, 0)"
                            : "rgba(250, 82, 82, 1)",
                          backgroundColor: fakeVolumeDisabled
                            ? "rgba(250, 82, 82, 0)"
                            : "rgba(250, 82, 82, 1)",
                          pointRadius: 0,
                          borderWidth: 3,
                        },
                      ]}
                    />
                    <div className="chart__container-footer">
                      <p className="typography__label--medium typography__transform--uppercase">
                        90 Day Trend
                      </p>
                      <DateRange />
                    </div>
                  </div>
                </animated.div>
              </div>
            </>
          ),
        }}
      />
      {/* -------------------------------- */}
      {/* Leaderboard Row */}
      {/* -------------------------------- */}
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

      {/* -------------------------------- */}
      {/* Traders row */}
      {/* -------------------------------- */}
      <TradersOverview
        traders={traders}
        labels={labels}
        activeWalletsOnlyBought={activeWalletsOnlyBought}
        activeWalletsOnlySold={activeWalletsOnlySold}
        activeWalletsBoughtAndSold={activeWalletsBoughtAndSold}
      />

      {/* -------------------------------- */}
      {/* Revenue row */}
      {/* -------------------------------- */}
      <RevenueOverview
        revenue={revenue}
        labels={labels}
        activeWalletsOnlyBought={activeWalletsOnlyBought}
        activeWalletsOnlySold={activeWalletsOnlySold}
        activeWalletsBoughtAndSold={activeWalletsBoughtAndSold}
      />
    </>
  );
};

export default MarketOverview;
