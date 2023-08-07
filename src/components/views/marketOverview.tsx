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
import Traders from "../traders/traders";
import TimeframeAsString from "@utils/timeframeAsString";
import TwoColumnGrid from "@/grids/twoColumnGrid";
import DecimalFormatter from "@utils/decimalFormatter";
import ChartHeader from "../charts/chartHeader";
import DateRange from "../dateRange/dateRange";

// Types
import type { IMarketOverviewProps } from "@/app/types";
import Overview from "../overview/overview";
import { legendLabels } from "../traders/wallets/legendLabels";

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
  traders,
  activeWalletsOnlyBought,
  activeWalletsOnlySold,
  activeWalletsBoughtAndSold,
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

  const [timeframe, setTimeframe] = useState<number>(1);
  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
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

  const [timeframeClicked, setTimeframeClicked] = useState(false);
  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    setTimeframeClicked(true);
    e.preventDefault();
    setDailyTimeframe(value);
    setTimeout(() => {
      setTimeframeClicked(false);
    }, 500);
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

  // Doughnut
  const [trueVolumeDoughnutSummararyData, setTrueVolumeDoughnutSummararyData] =
    useState(traders.trueVolumeTimeframeSummaryData.oneDay);
  const [fakeVolumeDoughnutSummararyData, setFakeVolumeDoughnutSummararyData] =
    useState(traders.fakeVolumeTimeframeSummaryData.oneDay);
  const [loanVolumeDoughnutSummararyData, setLoanVolumeDoughnutSummararyData] =
    useState(traders.loanVolumeTimeframeSummaryData.oneDay);

  useEffect(() => {
    if (timeframe === 0) {
      setTrueVolumeTimeframeSummaryData(
        traders.trueVolumeTimeframeSummaryData.all
      );
      setTotalVolumeTimeframeSummaryData(
        traders.totalVolumeTimeframeSummaryData.all
      );
      setTrueVolumeDoughnutSummararyData(
        traders.trueVolumeTimeframeSummaryData.all
      );
      setFakeVolumeDoughnutSummararyData(
        traders.fakeVolumeTimeframeSummaryData.all
      );
      setLoanVolumeDoughnutSummararyData(
        traders.loanVolumeTimeframeSummaryData.all
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
      setTrueVolumeDoughnutSummararyData(
        traders.trueVolumeTimeframeSummaryData.oneDay
      );
      setFakeVolumeDoughnutSummararyData(
        traders.fakeVolumeTimeframeSummaryData.oneDay
      );
      setLoanVolumeDoughnutSummararyData(
        traders.loanVolumeTimeframeSummaryData.oneDay
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

      setTrueVolumeDoughnutSummararyData(
        traders.trueVolumeTimeframeSummaryData.sevenDay
      );
      setFakeVolumeDoughnutSummararyData(
        traders.fakeVolumeTimeframeSummaryData.sevenDay
      );
      setLoanVolumeDoughnutSummararyData(
        traders.loanVolumeTimeframeSummaryData.sevenDay
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

      setTrueVolumeDoughnutSummararyData(
        traders.trueVolumeTimeframeSummaryData.thirtyDay
      );
      setFakeVolumeDoughnutSummararyData(
        traders.fakeVolumeTimeframeSummaryData.thirtyDay
      );
      setLoanVolumeDoughnutSummararyData(
        traders.loanVolumeTimeframeSummaryData.thirtyDay
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

      setTrueVolumeDoughnutSummararyData(
        traders.trueVolumeTimeframeSummaryData.ninetyDay
      );
      setFakeVolumeDoughnutSummararyData(
        traders.fakeVolumeTimeframeSummaryData.ninetyDay
      );
      setLoanVolumeDoughnutSummararyData(
        traders.loanVolumeTimeframeSummaryData.ninetyDay
      );
    }
  }, [timeframe]);
  // ------------------------------------------------------

  // ------------------------------------------------------
  // Overview - Traders
  // ------------------------------------------------------
  const [onlyBoughtDisabled, setOnlyBoughtDisabled] = useState(false);
  const [onlySoldDisabled, setOnlySoldDisabled] = useState(false);
  const [boughtAndSoldDisabled, setBoughtAndSoldDisabled] = useState(false);

  const traderHeroChartLegendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "only-bought") {
            setOnlyBoughtDisabled(!onlyBoughtDisabled);
          }
          if (domEls[i].id === "only-sold") {
            setOnlySoldDisabled(!onlySoldDisabled);
          }
          if (domEls[i].id === "bought-and-sold") {
            setBoughtAndSoldDisabled(!boughtAndSoldDisabled);
          }
        }
      }
    }
  };

  const [tradersLabels, setTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [onlyBoughtDataArray, setOnlyBoughtDataArray] = useState(
    activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
  );

  const [onlySoldDataArray, setOnlySoldDataArray] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );
  const [boughtAndSoldDataArray, setBoughtAndSoldDataArray] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );
  const [tradersTimeframe, setTradersTimeframe] = useState(90);

  useEffect(() => {
    if (tradersTimeframe === 0) {
      setOnlyBoughtDataArray(activeWalletsOnlyBought);
      setOnlySoldDataArray(activeWalletsOnlySold);
      setBoughtAndSoldDataArray(activeWalletsBoughtAndSold);
      setTradersLabels(labels);
    }
    if (tradersTimeframe === 1) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 1)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 1)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 1)
      );
      setTradersLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 7) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 7)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 7)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 7)
      );
      setTradersLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 30) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 30)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 30)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 39)
      );
      setTradersLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 90) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 90)
      );
      setTradersLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
  }, [tradersTimeframe]);

  function handleHeroChartTimeframe(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframeClicked(true);
    setTimeout(() => {
      setTimeframeClicked(false);
    }, 500);
    setTradersTimeframe(value);
  }

  // ------------------------------------------------------
  // Traders
  // ------------------------------------------------------
  const [tradersTrendlineTimeframe, seTtradersTrendlineTimeframe] =
    useState<number>(7);
  const [
    tradersTrendlineTimeframeClicked,
    seTtradersTrendlineTimeframeClicked,
  ] = useState(false);
  function handleTrendlineTimeframeOnClick(e: React.MouseEvent, value: any) {
    e.preventDefault();
    seTtradersTrendlineTimeframe(value);
  }
  // Traders -  TrendLine 1
  const [newWalletsDisabled, setNewWalletsDisabled] = useState(false);
  const [totalCreatedDisabled, setTotalCreatedDisabled] = useState(false);

  const trendline1OnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.activeWallets[0].id) {
            setOnlyBoughtDisabled(!onlyBoughtDisabled);
          }
          if (domEls[i].id === legendLabels.activeWallets[1].id) {
            setOnlySoldDisabled(!onlySoldDisabled);
          }
          if (domEls[i].id === legendLabels.activeWallets[2].id) {
            setBoughtAndSoldDisabled(!boughtAndSoldDisabled);
          }
        }
      }
    }
  };
  // ------------------------------------------------------

  // Traders - TrendLine 2
  const [newWalletsDailyStats, setNewWalletsDailyStatsDataArray] = useState(
    traders.newWallets?.dailyStats.new.slice(
      traders.newWallets?.dailyStats.new.length - 90
    )
  );
  const [
    newWalletsDailyStatsTotalCreatedDataArray,
    setNewWalletsDailyStatsTotalCreatedDataArray,
  ] = useState(
    traders.newWallets?.dailyStats.totalCreated.slice(
      traders.newWallets?.dailyStats.totalCreated.length - 90
    )
  );

  const trendline2OnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.newWallets[0].id) {
            setNewWalletsDisabled(!newWalletsDisabled);
          }
          if (domEls[i].id === legendLabels.newWallets[1].id) {
            setTotalCreatedDisabled(!totalCreatedDisabled);
          }
        }
      }
    }
  };

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
                  timeframeClicked={timeframeClicked}
                  timeframe={dailyTimeframe}
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
                  style={{ ...springs1 }}
                  className="grid__col-content grid__col-content--chart"
                >
                  <div className="grid__col-container-body">
                    <div className="chart__info">
                      <ProgressRing
                        trueVolume={trueVolumeDoughnutSummararyData}
                        loanVolume={loanVolumeDoughnutSummararyData}
                        fakeVolume={fakeVolumeDoughnutSummararyData}
                        percentage={`${DecimalFormatter(
                          (trueVolumeDoughnutSummararyData[0] /
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

      {/* <Traders
        labels={labels}
        activeWalletsOnlyBought={traders.activeWalletOnlyBought}
        activeWalletsOnlySold={traders.activeWalletOnlySold}
        activeWalletsBoughtAndSold={traders.activeWalletBoughtAndSold}
        activeWallets={traders.activeWallets}
        newWallets={traders.newWallets}
      /> */}

      {/* Traders row */}
      <Overview
        title="Traders"
        heroChartTimeframe={tradersTimeframe}
        heroChartLabels={tradersLabels}
        trendline1Labels={tradersLabels}
        trendline2Labels={tradersLabels}
        trendline1LegendLabels={legendLabels.activeWallets}
        trendline2LegendLabels={legendLabels.newWallets}
        trendLine1LegendOnClick={(e: string) => trendline1OnClick(e)}
        trendLine2LegendOnClick={(e: string) => trendline2OnClick(e)}
        heroChartLegendOnClick={(e: string) => traderHeroChartLegendOnClick(e)}
        heroChartTimeframeOnClick={(arg1, arg2) =>
          handleHeroChartTimeframe(arg1, arg2)
        }
        trendlineTimeframe={tradersTrendlineTimeframe}
        trendlineTimeframeOnClick={(arg1, arg2) =>
          handleTrendlineTimeframeOnClick(arg1, arg2)
        }
        heroChartDatasets={[
          {
            label: "Only Bought",
            data: onlyBoughtDisabled ? [] : onlyBoughtDataArray,
            borderColor: "white",
            backgroundColor: "rgba(64, 192, 87, 1)",
          },
          {
            label: "Only Sold",
            data: onlySoldDisabled ? [] : onlySoldDataArray,
            borderColor: "black",
            backgroundColor: "rgba(250, 82, 82, 1)",
          },
          {
            label: "Bought and Sold",
            data: boughtAndSoldDisabled ? [] : boughtAndSoldDataArray,
            borderColor: "white",
            backgroundColor: "rgba(95, 61, 196, 1)",
          },
        ]}
        trendline1Datasets={[
          {
            label: legendLabels.activeWallets[0].name,
            data: onlyBoughtDisabled ? [] : onlyBoughtDataArray || [],
            borderColor: legendLabels.activeWallets[0].rgba,
            backgroundColor: legendLabels.activeWallets[0].rgba,
            pointRadius: 0,
            borderWidth: 3,
          },
          {
            label: legendLabels.activeWallets[1].name,
            data: onlySoldDisabled ? [] : onlySoldDataArray || [],
            borderColor: legendLabels.activeWallets[1].rgba,
            backgroundColor: legendLabels.activeWallets[1].rgba,
            pointRadius: 0,
            borderWidth: 3,
          },
          {
            label: legendLabels.activeWallets[2].name,
            data: boughtAndSoldDisabled ? [] : boughtAndSoldDataArray || [],
            borderColor: legendLabels.activeWallets[2].rgba,
            backgroundColor: legendLabels.activeWallets[2].rgba,
            pointRadius: 0,
            borderWidth: 3,
          },
        ]}
        trendline2Datasets={[
          {
            label: legendLabels.newWallets[0].name,
            data: totalCreatedDisabled
              ? []
              : newWalletsDailyStatsTotalCreatedDataArray || [],
            borderColor: legendLabels.newWallets[0].rgba,
            backgroundColor: legendLabels.newWallets[0].rgba,
            pointRadius: 0,
            borderWidth: 3,
          },
          {
            label: legendLabels.newWallets[1].name,
            data: newWalletsDisabled ? [] : newWalletsDailyStats || [],
            borderColor: legendLabels.newWallets[1].rgba,
            backgroundColor: legendLabels.newWallets[1].rgba,
            pointRadius: 0,
            borderWidth: 3,
          },
        ]}
      />
    </>
  );
};

export default MarketOverview;
