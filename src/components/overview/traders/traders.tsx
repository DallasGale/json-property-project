"use client";
import { useEffect, useState } from "react";

import { TradersTypes } from "@/app/types";
import Overview from "../overview";
import { legendLabels } from "@constants/legendLabels";
import { VolumeFormatter } from "@/utils/volumeFormatter";

type TradersOverviewProps = {
  labels: string[];
  activeWalletsOnlyBought: number[];
  activeWalletsOnlySold: number[];
  activeWalletsBoughtAndSold: number[];
  traders: TradersTypes;
};

const TradersOverview: React.FC<TradersOverviewProps> = ({
  labels,
  activeWalletsOnlyBought,
  activeWalletsOnlySold,
  activeWalletsBoughtAndSold,
  traders,
}) => {
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

  const [
    tradersHeroChartTimeframeClicked,
    setTradersHeroChartTimeframeClicked,
  ] = useState(false);

  // --------------------------
  // Handlers
  // --------------------------
  const handleTradersHeroChartTimeframeOnClick = (
    e: React.MouseEvent,
    value: any
  ) => {
    e.preventDefault();
    setTradersHeroChartTimeframeClicked(true);
    setTimeout(() => {
      setTradersHeroChartTimeframeClicked(false);
    }, 500);
    setTradersHeroChartTimeframe(value);
  };

  const handleTraderHeroChartLegendOnClick = (e: string) => {
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

  // --------------------------
  // Hero - LifeCycle
  // --------------------------
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

  // --------------------------
  // LifeCycle
  // --------------------------
  useEffect(() => {
    // if (traders.activeWallets) {
    if (tradersWalletsTimeframe === 0) {
      setTradersActiveWalletsOnlyBoughtDataArray(activeWalletsOnlyBought);
      setTradersActiveWalletsOnlySoldDataArray(activeWalletsOnlySold);
      setTradersActiveWalletsBoughtAndSoldDataArray(activeWalletsBoughtAndSold);
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
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 1)
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
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 7)
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
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 39)
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
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 90)
      );
      setActiveWalletTradersLabels(
        labels.slice(labels.length - 90).map((data: string) => data)
      );
      setTotalActiveWallets(traders.activeWallets.ninetyDay[0]);
    }
    // }
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

  return (
    <Overview
      title="Traders"
      heroChartLegendLabels={legendLabels.tradersHero}
      heroChartTimeframe={tradersHeroChartTimeframe}
      heroChartLabels={tradersHeroChartLabels}
      heroChartLegendOnClick={(e: string) =>
        handleTraderHeroChartLegendOnClick(e)
      }
      heroChartTimeframeClicked={tradersHeroChartTimeframeClicked}
      heroChartTimeframeOnClick={(arg1, arg2) =>
        handleTradersHeroChartTimeframeOnClick(arg1, arg2)
      }
      heroChartDatasets={[
        {
          label: "Only Bought",
          data: tradersHeroChartOnlyBoughtDisabled
            ? []
            : tradersHeroChartOnlyBought,
          borderColor: "white",
          backgroundColor: "rgba(64, 192, 87, 1)",
        },
        {
          label: "Only Sold",
          data: tradersHeroChartOnlySoldDisabled
            ? []
            : tradersHeroChartOnlySold,
          borderColor: "black",
          backgroundColor: "rgba(250, 82, 82, 1)",
        },
        {
          label: "Bought and Sold",
          data: tradersHeroChartBoughtAndSoldDisabled
            ? []
            : tradersHeroChartBoughtAndSold,
          borderColor: "white",
          backgroundColor: "rgba(95, 61, 196, 1)",
        },
      ]}
      trendlineTimeframe={tradersWalletsTimeframe}
      trendlineTimeframeOnClick={(arg1, arg2) =>
        handleTradersWalletsTimeframeOnClick(arg1, arg2)
      }
      trendline1HeaderTitle="Active Wallets"
      trendline1HeaderValue={VolumeFormatter(totalActiveWallets)}
      trendline1Labels={activeWalletTradersLabels}
      trendline1LegendLabels={legendLabels.activeWallets}
      trendLine1LegendOnClick={(e: string) =>
        handleTradersActiveWalletsOnClick(e)
      }
      trendline1Datasets={[
        {
          data: tradersActiveWalletsOnlyBoughtDisabled
            ? []
            : tradersActiveWalletsOnlyBoughtDataArray || [],
          borderColor: legendLabels.activeWallets[0].rgba,
          backgroundColor: legendLabels.activeWallets[0].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          data: tradersActiveWalletsOnlySoldDisabled
            ? []
            : tradersActiveWalletsOnlySoldDataArray || [],
          borderColor: legendLabels.activeWallets[1].rgba,
          backgroundColor: legendLabels.activeWallets[1].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          data: tradersActiveWalletsAndSoldDisabled
            ? []
            : tradersActiveWalletsBoughtAndSoldDataArray || [],
          borderColor: legendLabels.activeWallets[2].rgba,
          backgroundColor: legendLabels.activeWallets[2].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
      ]}
      trendline2HeaderTitle="New Wallets"
      trendline2HeaderValue={VolumeFormatter(totalNewWallets)}
      trendline2Labels={newWalletTradersLabels}
      trendline2LegendLabels={legendLabels.newWallets}
      trendLine2LegendOnClick={(e: string) => handleTradersNewWalletsOnClick(e)}
      trendline2Datasets={[
        {
          data: tradersTotalCreatedDisabled
            ? []
            : tradersNewWalletsDailyStatsTotalCreated || [],
          borderColor: legendLabels.newWallets[0].rgba,
          backgroundColor: legendLabels.newWallets[0].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          data: tradersNewWalletsDisabled
            ? []
            : tradersNewWalletsDailyStats || [],
          borderColor: legendLabels.newWallets[1].rgba,
          backgroundColor: legendLabels.newWallets[1].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
      ]}
    />
  );
};

export default TradersOverview;
