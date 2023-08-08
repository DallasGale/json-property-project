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

  const [dailyTimeframeClicked, setDailyTimeframeClicked] = useState(false);
  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    setDailyTimeframeClicked(true);
    e.preventDefault();
    setDailyTimeframe(value);
    setTimeout(() => {
      setDailyTimeframeClicked(false);
    }, 500);
  }

  const [trueVolumeDisabled, setTrueVolumeDisabled] = useState(false);
  const [loanVolumeDisabled, setLoanVolumeDisabled] = useState(false);
  const [fakeVolumeDisabled, setFakeVolumeDisabled] = useState(false);

  const [dailyHeroChartTimeframeClicked, setDailyHeroChartTimeframeClicked] =
    useState(false);

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
  // START Overview - Traders Hero
  // ------------------------------------------------------
  // ------------------------------------------------------
  const [
    tradersHeroChartOnlyBoughtDisabled,
    setTradersHeroChartOnlyBoughtDisabled,
  ] = useState(false);
  const [
    tradersHeroChartOnlySoldDisabled,
    setTradersHeroChartOnlySoldDisabled,
  ] = useState(false);
  const [
    tradersHeroChartBoughtAndSoldDisabled,
    setTradersHeroChartBoughtAndSoldDisabled,
  ] = useState(false);

  const [tradersHeroChartOnlyBought, setTradersHeroChartOnlyBought] = useState(
    activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
  );
  const [tradersHeroChartOnlySold, setTradersHeroChartOnlySold] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );
  const [tradersHeroChartBoughtAndSold, setTradersHeroChartBoughtAndSold] =
    useState(activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90));

  const [tradersHeroChartLabels, setHeroChartTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [tradersHeroChartTimeframe, setTradersHeroChartTimeframe] =
    useState(90);

  function handleTradersHeroChartTimeframeOnClick(
    e: React.MouseEvent,
    value: any
  ) {
    e.preventDefault();
    setDailyHeroChartTimeframeClicked(true);
    setTimeout(() => {
      setDailyHeroChartTimeframeClicked(false);
    }, 500);
    setTradersHeroChartTimeframe(value);
  }

  // TODO: Refactor this into a re-useable hook or util...
  useEffect(() => {
    if (tradersHeroChartTimeframe === 0) {
      setTradersHeroChartOnlyBought(activeWalletsOnlyBought);
      setTradersHeroChartOnlySold(activeWalletsOnlySold);
      setTradersHeroChartBoughtAndSold(activeWalletsBoughtAndSold);
      setHeroChartTradersLabels(labels);
    }
    if (tradersHeroChartTimeframe === 1) {
      setTradersHeroChartOnlyBought(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 1)
      );
      setTradersHeroChartOnlySold(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 1)
      );
      setTradersHeroChartBoughtAndSold(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 1)
      );
      setHeroChartTradersLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }
    if (tradersHeroChartTimeframe === 7) {
      setTradersHeroChartOnlyBought(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 7)
      );
      setTradersHeroChartOnlySold(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 7)
      );
      setTradersHeroChartBoughtAndSold(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 7)
      );
      setHeroChartTradersLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (tradersHeroChartTimeframe === 30) {
      setTradersHeroChartOnlyBought(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 30)
      );
      setTradersHeroChartOnlySold(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 30)
      );
      setTradersHeroChartBoughtAndSold(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 30)
      );
      setHeroChartTradersLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }

    if (tradersHeroChartTimeframe === 90) {
      setTradersHeroChartOnlyBought(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
      );
      setTradersHeroChartOnlySold(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
      );
      setTradersHeroChartBoughtAndSold(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 90)
      );
      setHeroChartTradersLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
  }, [tradersHeroChartTimeframe]);

  const traderHeroChartLegendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "only-bought") {
            setTradersHeroChartOnlyBoughtDisabled(
              !tradersHeroChartOnlyBoughtDisabled
            );
          }
          if (domEls[i].id === "only-sold") {
            setTradersHeroChartOnlySoldDisabled(
              !tradersHeroChartOnlySoldDisabled
            );
          }
          if (domEls[i].id === "bought-and-sold") {
            setTradersHeroChartBoughtAndSoldDisabled(
              !tradersHeroChartBoughtAndSoldDisabled
            );
          }
        }
      }
    }
  };

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Traders Wallets - Global
  // ------------------------------------------------------
  // ------------------------------------------------------
  const [tradersWalletsTimeframe, setTradersWalletsTimeframe] =
    useState<number>(7);

  const handleTradersWalletsTimeframeOnClick = (
    e: React.MouseEvent,
    value: any
  ) => {
    e.preventDefault();
    setTradersWalletsTimeframe(value);
  };

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Traders Wallets - Active
  // ------------------------------------------------------
  // ------------------------------------------------------

  // > Data
  const [totalActiveWallets, setTotalActiveWallets] = useState<number>(1);

  const [activeWalletTradersLabels, setActiveWalletTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: string) => data)
  );
  const [
    tradersActiveWalletsOnlyBoughtDataArray,
    setTradersActiveWalletsOnlyBoughtDataArray,
  ] = useState(
    activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
  );
  const [
    tradersActiveWalletsOnlySoldDataArray,
    setTradersActiveWalletsOnlySoldDataArray,
  ] = useState(activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90));
  const [
    tradersActiveWalletsBoughtAndSoldDataArray,
    setTradersActiveWalletsBoughtAndSoldDataArray,
  ] = useState(activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90));

  // > Disabled state
  const [
    tradersActiveWalletsOnlyBoughtDisabled,
    setTradersActiveWalletsOnlyBoughtDisabled,
  ] = useState(false);
  const [
    tradersActiveWalletsOnlySoldDisabled,
    setTradersActiveWalletsOnlySoldDisabled,
  ] = useState(false);
  const [
    tradersActiveWalletsAndSoldDisabled,
    setTradersActiveWalletsBoughtAndSoldDisabled,
  ] = useState(false);

  // > Click Handlers
  const handleTradersActiveWalletsOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.activeWallets[0].id) {
            setTradersActiveWalletsOnlyBoughtDisabled(
              !tradersActiveWalletsOnlyBoughtDisabled
            );
          }
          if (domEls[i].id === legendLabels.activeWallets[1].id) {
            setTradersActiveWalletsOnlySoldDisabled(
              !tradersActiveWalletsOnlySoldDisabled
            );
          }
          if (domEls[i].id === legendLabels.activeWallets[2].id) {
            setTradersActiveWalletsBoughtAndSoldDisabled(
              !tradersActiveWalletsAndSoldDisabled
            );
          }
        }
      }
    }
  };

  // > State Updates
  useEffect(() => {
    if (traders.activeWallets) {
      if (tradersWalletsTimeframe === 0) {
        setTradersActiveWalletsOnlyBoughtDataArray(activeWalletsOnlyBought);
        setTradersActiveWalletsOnlySoldDataArray(activeWalletsOnlySold);
        setTradersActiveWalletsBoughtAndSoldDataArray(
          activeWalletsBoughtAndSold
        );
        setActiveWalletTradersLabels(labels);
        setTotalActiveWallets(traders.activeWallets.all[0]);
      }
      if (tradersWalletsTimeframe === 1) {
        setTradersActiveWalletsOnlyBoughtDataArray(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 1)
        );
        setTradersActiveWalletsOnlySoldDataArray(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 1)
        );
        setTradersActiveWalletsBoughtAndSoldDataArray(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 1
          )
        );
        setActiveWalletTradersLabels(
          labels.slice(labels.length - 1).map((data: string) => data)
        );
        setTotalActiveWallets(traders.activeWallets.oneDay[0]);
      }
      if (tradersWalletsTimeframe === 7) {
        setTradersActiveWalletsOnlyBoughtDataArray(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 7)
        );
        setTradersActiveWalletsOnlySoldDataArray(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 7)
        );
        setTradersActiveWalletsBoughtAndSoldDataArray(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 7
          )
        );
        setActiveWalletTradersLabels(
          labels.slice(labels.length - 7).map((data: string) => data)
        );
        setTotalActiveWallets(traders.activeWallets.sevenDay[0]);
      }
      if (tradersWalletsTimeframe === 30) {
        setTradersActiveWalletsOnlyBoughtDataArray(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 30)
        );
        setTradersActiveWalletsOnlySoldDataArray(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 30)
        );
        setTradersActiveWalletsBoughtAndSoldDataArray(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 39
          )
        );
        setActiveWalletTradersLabels(
          labels.slice(labels.length - 30).map((data: string) => data)
        );
        setTotalActiveWallets(traders.activeWallets.thirtyDay[0]);
      }
      if (tradersWalletsTimeframe === 90) {
        setTradersActiveWalletsOnlyBoughtDataArray(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
        );
        setTradersActiveWalletsOnlySoldDataArray(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
        );
        setTradersActiveWalletsBoughtAndSoldDataArray(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 90
          )
        );
        setActiveWalletTradersLabels(
          labels.slice(labels.length - 90).map((data: string) => data)
        );
        setTotalActiveWallets(traders.activeWallets.ninetyDay[0]);
      }
    }
  }, [tradersWalletsTimeframe]);

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Traders Wallets - New
  // ------------------------------------------------------
  // ------------------------------------------------------
  const [totalNewWallets, setTotalNewWallets] = useState<number>(1);
  const [newWalletTradersLabels, setNewWalletTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [tradersNewWalletsDailyStats, setTradersNewWalletsDailyStatsDataArray] =
    useState(
      traders.newWallets?.dailyStats.new.slice(
        traders.newWallets?.dailyStats.new.length - 90
      )
    );
  const [
    tradersNewWalletsDailyStatsTotalCreated,
    setTradersNewWalletsDailyStatsTotalCreatedDataArray,
  ] = useState(
    traders.newWallets?.dailyStats.totalCreated.slice(
      traders.newWallets?.dailyStats.totalCreated.length - 90
    )
  );

  // > Disabled state
  const [tradersNewWalletsDisabled, setTradersNewWalletsDisabled] =
    useState(false);
  const [tradersTotalCreatedDisabled, setTradersTotalCreatedDisabled] =
    useState(false);

  // > Click handler
  const handleTradersNewWalletsOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.newWallets[0].id) {
            setTradersNewWalletsDisabled(!tradersNewWalletsDisabled);
          }
          if (domEls[i].id === legendLabels.newWallets[1].id) {
            setTradersTotalCreatedDisabled(!tradersTotalCreatedDisabled);
          }
        }
      }
    }
  };

  // > State update
  useEffect(() => {
    if (traders.newWallets) {
      if (tradersWalletsTimeframe === 0) {
        setTotalNewWallets(traders.newWallets.all[0]);
        setTradersNewWalletsDailyStatsDataArray(
          traders.newWallets?.dailyStats.new
        );
        setTradersNewWalletsDailyStatsTotalCreatedDataArray(
          traders.newWallets?.dailyStats.totalCreated
        );
        setNewWalletTradersLabels(labels);
      }
      if (tradersWalletsTimeframe === 1) {
        setTotalNewWallets(traders.newWallets.oneDay[0]);
        setTradersNewWalletsDailyStatsDataArray(
          traders.newWallets?.dailyStats.new.slice(
            traders.newWallets?.dailyStats.new.length - 1
          )
        );

        setTradersNewWalletsDailyStatsTotalCreatedDataArray(
          traders.newWallets?.dailyStats.totalCreated.slice(
            traders.newWallets?.dailyStats.totalCreated.length - 1
          )
        );
        setNewWalletTradersLabels(
          labels.slice(labels.length - 1).map((data: string) => data)
        );
      }
      if (tradersWalletsTimeframe === 7) {
        setTotalNewWallets(traders.newWallets.sevenDay[0]);
        setTradersNewWalletsDailyStatsDataArray(
          traders.newWallets?.dailyStats.new.slice(
            traders.newWallets?.dailyStats.new.length - 7
          )
        );
        setTradersNewWalletsDailyStatsTotalCreatedDataArray(
          traders.newWallets?.dailyStats.totalCreated.slice(
            traders.newWallets?.dailyStats.totalCreated.length - 7
          )
        );
        setNewWalletTradersLabels(
          labels.slice(labels.length - 7).map((data: string) => data)
        );
      }
      if (tradersWalletsTimeframe === 30) {
        setTotalNewWallets(traders.newWallets.thirtyDay[0]);
        setTradersNewWalletsDailyStatsDataArray(
          traders.newWallets?.dailyStats.new.slice(
            traders.newWallets?.dailyStats.new.length - 30
          )
        );
        setTradersNewWalletsDailyStatsTotalCreatedDataArray(
          traders.newWallets?.dailyStats.totalCreated.slice(
            traders.newWallets?.dailyStats.totalCreated.length - 30
          )
        );
        setNewWalletTradersLabels(
          labels.slice(labels.length - 30).map((data: string) => data)
        );
      }
      if (tradersWalletsTimeframe === 90) {
        setTotalNewWallets(traders.newWallets.ninetyDay[0]);
        setTradersNewWalletsDailyStatsDataArray(
          traders.newWallets?.dailyStats.new.slice(
            traders.newWallets?.dailyStats.new.length - 90
          )
        );
        setTradersNewWalletsDailyStatsTotalCreatedDataArray(
          traders.newWallets?.dailyStats.totalCreated.slice(
            traders.newWallets?.dailyStats.totalCreated.length - 90
          )
        );
        setNewWalletTradersLabels(
          labels.slice(labels.length - 90).map((data: string) => data)
        );
      }
    }
  }, [tradersWalletsTimeframe]);

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Revenue - Hero
  // ------------------------------------------------------
  // ------------------------------------------------------

  const [revenueHeroChartLabels, setRevenueHeroChartLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [revenueHeroChartTimeframe, setRevenueHeroChartTimeframe] =
    useState(90);

  const [
    revenueHeroChartTimeframeClicked,
    setRevenueDailyHeroChartTimeframeClicked,
  ] = useState(false);

  const [revenueWalletsTimeframe, setRevenueWalletsTimeframe] =
    useState<number>(7);

  // > Click Handler
  const handleRevenueHeroChartTimeframeOnClick = (
    e: React.MouseEvent,
    value: any
  ) => {
    e.preventDefault();
    setRevenueDailyHeroChartTimeframeClicked(true);
    setTimeout(() => {
      setRevenueDailyHeroChartTimeframeClicked(false);
    }, 500);
    setRevenueHeroChartTimeframe(value);
  };

  const revenueHeroChartLegendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.revenue[0].id) {
            setTradersHeroChartOnlyBoughtDisabled(
              !tradersHeroChartOnlyBoughtDisabled
            );
          }
          if (domEls[i].id === legendLabels.revenue[1].id) {
            setTradersHeroChartOnlySoldDisabled(
              !tradersHeroChartOnlySoldDisabled
            );
          }
          if (domEls[i].id === legendLabels.revenue[2].id) {
            setTradersHeroChartBoughtAndSoldDisabled(
              !tradersHeroChartBoughtAndSoldDisabled
            );
          }
        }
      }
    }
  };

  const [revenueSalesMintingTimeframe, setRevenueSalesMintingTimeframe] =
    useState<number>(7);

  const handleRevenueSalesMintingTimeframeOnClick = (
    e: React.MouseEvent,
    value: any
  ) => {
    e.preventDefault();
    setRevenueSalesMintingTimeframe(value);
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
      <RevenueOverview traders={traders} labels={labels} />
    </>
  );
};

export default MarketOverview;
