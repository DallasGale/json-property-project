"use client";
import { useEffect, useState } from "react";

import { TradersTypes } from "@/app/types";
import Overview from "../overview";
import { legendLabels } from "@constants/legendLabels";
import { VolumeFormatter } from "@/utils/volumeFormatter";

type TradersOverviewProps = {
  labels: string[];
  traders: TradersTypes;
};

const RevenueOverview: React.FC<TradersOverviewProps> = ({
  labels,
  traders,
}) => {
  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Traders Hero
  // ------------------------------------------------------
  // ------------------------------------------------------

  const [revenueHeroChartLabels, setHeroChartTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [revenueHeroChartTimeframe, setRevenueHeroChartTimeframe] =
    useState(90);

  const [
    revenueHeroChartTimeframeClicked,
    setRevenueHeroChartTimeframeClicked,
  ] = useState(false);

  // --------------------------
  // Handlers
  // --------------------------

  const handleRevenueHeroChartLegendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.revenue[0].id) {
            // setTradersHeroChartOnlyBoughtDisabled(
            //   !tradersHeroChartOnlyBoughtDisabled
            // );
          }
          if (domEls[i].id === legendLabels.revenue[1].id) {
            // setTradersHeroChartOnlySoldDisabled(
            //   !tradersHeroChartOnlySoldDisabled
            // );
          }
        }
      }
    }
  };
  // > Click handler
  const handleRevenueHeroChartTimeframeOnClick = (
    e: React.MouseEvent,
    value: any
  ) => {
    e.preventDefault();
    setRevenueHeroChartTimeframeClicked(true);
    setTimeout(() => {
      setRevenueHeroChartTimeframeClicked(false);
    }, 500);
    setRevenueHeroChartTimeframe(value);
  };

  // --------------------------
  // Hero - LifeCycle
  // --------------------------
  useEffect(() => {
    if (revenueHeroChartTimeframe === 0) {
      setHeroChartTradersLabels(labels);
    }
    if (revenueHeroChartTimeframe === 1) {
      setHeroChartTradersLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }
    if (revenueHeroChartTimeframe === 7) {
      setHeroChartTradersLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (revenueHeroChartTimeframe === 30) {
      setHeroChartTradersLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }

    if (revenueHeroChartTimeframe === 90) {
      setHeroChartTradersLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
  }, [revenueHeroChartTimeframe]);

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Revenue - Global
  // ------------------------------------------------------
  // ------------------------------------------------------
  const [revenueSalesMintingTimeframe, setRevenueSalesMintingTimeframe] =
    useState<number>(7);

  const handleRevenueSalesMintingTimeframeOnClick = (
    e: React.MouseEvent,
    value: any
  ) => {
    e.preventDefault();
    setRevenueSalesMintingTimeframe(value);
  };

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Revenues - Sales
  // ------------------------------------------------------
  // ------------------------------------------------------

  // > Data

  // > Click Handlers
  const handleRevenueSalesMintingOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          // if (domEls[i].id === legendLabels.activeWallets[0].id) {
          //   setTradersActiveWalletsOnlyBoughtDisabled(
          //     !tradersActiveWalletsOnlyBoughtDisabled
          //   );
          // }
          // if (domEls[i].id === legendLabels.activeWallets[1].id) {
          //   setTradersActiveWalletsOnlySoldDisabled(
          //     !tradersActiveWalletsOnlySoldDisabled
          //   );
          // }
        }
      }
    }
  };
  // > Handler
  const handleRevenueSalesOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.revenue[0].id) {
            // setTradersHeroChartOnlyBoughtDisabled(
            //   !tradersHeroChartOnlyBoughtDisabled
            // );
          }
          if (domEls[i].id === legendLabels.revenue[1].id) {
            // setTradersHeroChartOnlySoldDisabled(
            //   !tradersHeroChartOnlySoldDisabled
            // );
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
    if (revenueSalesMintingTimeframe === 0) {
    }
    if (revenueSalesMintingTimeframe === 1) {
    }
    if (revenueSalesMintingTimeframe === 7) {
    }
    if (revenueSalesMintingTimeframe === 30) {
    }
    if (revenueSalesMintingTimeframe === 90) {
    }
    // }
  }, [revenueSalesMintingTimeframe]);

  // ------------------------------------------------------
  // ------------------------------------------------------
  // START Overview - Revenue - Minting
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

  // > Handler
  const handleRevenueMintingOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.revenue[0].id) {
            // setTradersHeroChartOnlyBoughtDisabled(
            //   !tradersHeroChartOnlyBoughtDisabled
            // );
          }
          if (domEls[i].id === legendLabels.revenue[1].id) {
            // setTradersHeroChartOnlySoldDisabled(
            //   !tradersHeroChartOnlySoldDisabled
            // );
          }
        }
      }
    }
  };

  // > State update
  useEffect(() => {
    if (traders.newWallets) {
      if (revenueSalesMintingTimeframe === 0) {
        setTotalNewWallets(traders.newWallets.all[0]);
        setTradersNewWalletsDailyStatsDataArray(
          traders.newWallets?.dailyStats.new
        );
        setTradersNewWalletsDailyStatsTotalCreatedDataArray(
          traders.newWallets?.dailyStats.totalCreated
        );
        setNewWalletTradersLabels(labels);
      }
      if (revenueSalesMintingTimeframe === 1) {
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
      if (revenueSalesMintingTimeframe === 7) {
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
      if (revenueSalesMintingTimeframe === 30) {
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
      if (revenueSalesMintingTimeframe === 90) {
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
  }, [revenueSalesMintingTimeframe]);

  return (
    <Overview
      title="Revenue"
      heroChartLegendLabels={legendLabels.revenue}
      heroChartTimeframe={revenueHeroChartTimeframe}
      heroChartLabels={revenueHeroChartLabels}
      heroChartLegendOnClick={(e: string) =>
        handleRevenueHeroChartLegendOnClick(e)
      }
      heroChartTimeframeClicked={revenueHeroChartTimeframeClicked}
      heroChartTimeframeOnClick={(arg1, arg2) =>
        handleRevenueHeroChartTimeframeOnClick(arg1, arg2)
      }
      heroChartDatasets={
        [
          // {
          //   label: "Only Bought",
          //   data: tradersHeroChartOnlyBoughtDisabled
          //     ? []
          //     : tradersHeroChartOnlyBought,
          //   borderColor: "white",
          //   backgroundColor: "rgba(64, 192, 87, 1)",
          // },
          // {
          //   label: "Only Sold",
          //   data: tradersHeroChartOnlySoldDisabled
          //     ? []
          //     : tradersHeroChartOnlySold,
          //   borderColor: "black",
          //   backgroundColor: "rgba(250, 82, 82, 1)",
          // },
          // {
          //   label: "Bought and Sold",
          //   data: tradersHeroChartBoughtAndSoldDisabled
          //     ? []
          //     : tradersHeroChartBoughtAndSold,
          //   borderColor: "white",
          //   backgroundColor: "rgba(95, 61, 196, 1)",
          // },
        ]
      }
      trendlineTimeframe={revenueSalesMintingTimeframe}
      trendlineTimeframeOnClick={(arg1, arg2) =>
        handleRevenueSalesMintingTimeframeOnClick(arg1, arg2)
      }
      trendline1HeaderTitle="Sales Revenue"
      trendline1HeaderValue={VolumeFormatter(0)}
      trendline1Labels={[]}
      trendline1LegendLabels={legendLabels.revenue}
      trendLine1LegendOnClick={(e: string) => handleRevenueSalesOnClick(e)}
      trendline1Datasets={
        [
          // {
          //   data: tradersActiveWalletsOnlyBoughtDisabled
          //     ? []
          //     : tradersActiveWalletsOnlyBoughtDataArray || [],
          //   borderColor: legendLabels.activeWallets[0].rgba,
          //   backgroundColor: legendLabels.activeWallets[0].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
          // {
          //   data: tradersActiveWalletsOnlySoldDisabled
          //     ? []
          //     : tradersActiveWalletsOnlySoldDataArray || [],
          //   borderColor: legendLabels.activeWallets[1].rgba,
          //   backgroundColor: legendLabels.activeWallets[1].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
          // ]
        ]
      }
      trendline2HeaderTitle="Minting Revenue"
      trendline2Labels={newWalletTradersLabels}
      trendline2HeaderValue={VolumeFormatter(totalNewWallets)}
      trendline2LegendLabels={legendLabels.newWallets}
      trendLine2LegendOnClick={(e: string) => handleRevenueMintingOnClick(e)}
      trendline2Datasets={
        [
          // {
          //   data: tradersActiveWalletsOnlyBoughtDisabled
          //     ? []
          //     : tradersActiveWalletsOnlyBoughtDataArray || [],
          //   borderColor: legendLabels.activeWallets[0].rgba,
          //   backgroundColor: legendLabels.activeWallets[0].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
          // {
          //   data: tradersActiveWalletsOnlySoldDisabled
          //     ? []
          //     : tradersActiveWalletsOnlySoldDataArray || [],
          //   borderColor: legendLabels.activeWallets[1].rgba,
          //   backgroundColor: legendLabels.activeWallets[1].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
          // {
          //   data: tradersActiveWalletsAndSoldDisabled
          //     ? []
          //     : tradersActiveWalletsBoughtAndSoldDataArray || [],
          //   borderColor: legendLabels.activeWallets[2].rgba,
          //   backgroundColor: legendLabels.activeWallets[2].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
        ]
      }
    />
  );
};

export default RevenueOverview;
