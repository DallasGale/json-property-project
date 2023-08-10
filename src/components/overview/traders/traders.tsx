// • Generic •
// These are variables that can be re-used without re-naming.

// • Specific •
// The naming of these state variables are specific to Traders data.
// When re-using this component, make sure these are changed.

"use client";
import { useEffect, useState } from "react";
import { TradersTypes } from "@/app/types";
import Overview from "../overview";
import { legendLabels } from "@constants/legendLabels";
import { VolumeFormatter } from "@/utils/volumeFormatter";
import { handleHeroTimeframeClick, handleLegendClick } from "../utils";

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
  // ------------------------------------------------------------------------------
  // Hero
  // ------------------------------------------------------------------------------

  // • Generic •
  // Hero Labels State
  // -----------------
  const [heroLabels, setHeroLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );

  // • Generic •
  // Hero Timeframe State
  // --------------------
  const [heroTimeframe, setHeroTimeframe] = useState(90);
  const [heroTimeframeClicked, setHeroTimeframeClicked] = useState(false);

  // • Specific •
  // Hero Data State
  // ---------------
  // > Only Bought
  const [heroOnlyBoughtData, setHeroOnlyBoughtData] = useState(
    activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
  );
  // > Only Sold
  const [heroOnlySoldData, setHeroOnlySoldData] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );
  // > Bought And Sold
  const [heroBoughtAndSold, setHeroBoughtAndSoldData] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );

  // • Specific •
  // Hero Disabled State
  // -------------------
  // > Only Bought
  const [heroOnlyBoughtDisabled, setHeroOnlyBoughtDisabled] = useState(false);
  // > Only Sold
  const [heroOnlySoldDisabled, setHeroOnlySoldDisabled] = useState(false);
  // > Bought and Sold
  const [heroBoughtAndSoldDisabled, setHeroBoughtAndSoldDisabled] =
    useState(false);

  // • Specific •
  // > Timeframe clicked...
  useEffect(() => {
    if (heroTimeframe === 0) {
      // Data
      setHeroOnlyBoughtData(activeWalletsOnlyBought);
      setHeroOnlySoldData(activeWalletsOnlySold);
      setHeroBoughtAndSoldData(activeWalletsBoughtAndSold);

      // Labels
      setHeroLabels(labels);
    }
    if (heroTimeframe === 1) {
      // Data
      setHeroOnlyBoughtData(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 1)
      );
      setHeroOnlySoldData(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 1)
      );
      setHeroBoughtAndSoldData(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 1)
      );
      // Labels
      setHeroLabels(labels.slice(labels.length - 1).map((data: any) => data));
    }
    if (heroTimeframe === 7) {
      // Data
      setHeroOnlyBoughtData(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 7)
      );
      setHeroOnlySoldData(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 7)
      );
      setHeroBoughtAndSoldData(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 7)
      );
      // Labels
      setHeroLabels(labels.slice(labels.length - 7).map((data: any) => data));
    }
    if (heroTimeframe === 30) {
      // Data
      setHeroOnlyBoughtData(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 30)
      );
      setHeroOnlySoldData(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 30)
      );
      setHeroBoughtAndSoldData(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 30)
      );
      // Labels
      setHeroLabels(labels.slice(labels.length - 30).map((data: any) => data));
    }

    if (heroTimeframe === 90) {
      // Data
      setHeroOnlyBoughtData(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
      );
      setHeroOnlySoldData(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
      );
      setHeroBoughtAndSoldData(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 90)
      );
      // Labels
      setHeroLabels(labels.slice(labels.length - 90).map((data: any) => data));
    }
  }, [heroTimeframe]);

  // ------------------------------------------------------------------------------
  // Trendlines #1 + #2
  // ------------------------------------------------------------------------------

  // • Generic •
  // Trendline Timeframe State
  const [trendlineTimeframe, setTrendlineTimeframe] = useState<number>(7);

  // • Generic •
  // > Timeframe
  const handleTrendlineTimeframeClick = (e: React.MouseEvent, value: any) => {
    e.preventDefault();
    setTrendlineTimeframe(value);
  };

  // ------------------------------------------------------------------------------
  // Trendlines #1
  // ------------------------------------------------------------------------------
  // > Trendline #1 Data State

  // • Specific •
  // Total Active Wallets
  const [totalActiveWallets, setTotalActiveWallets] = useState<number>(1);

  // • Specific •
  // Active Wallet Labels
  // todo: should thie be labels for newWallets and activeWallets?
  const [activeWalletLabels, setActiveWalletLabels] = useState(
    labels.slice(labels.length - 90).map((data: string) => data)
  );

  // • Specific •
  // > Trendline #1

  // Only Bought
  const [
    trendline1ActiveWalletsOnlyBoughtData,
    setTrendline1ActiveWalletsOnlyBoughtData,
  ] = useState(
    activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
  );

  // Only Sold
  const [
    trendline1ActiveWalletsOnlySoldData,
    setTrendline1ActiveWalletsOnlySoldData,
  ] = useState(activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90));

  // Bought and Sold
  const [
    trendline1ActiveWalletsBoughtAndSoldData,
    setTrendline1ActiveWalletsBoughtAndSoldData,
  ] = useState(activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90));

  // Trendline #1 (Active Wallets) Disabled State
  // --------------------------------------------
  // • Specific •
  // > Trendline #1

  // Only Bought
  const [
    trendline1ActiveWalletsOnlyBoughtDisabled,
    setTrendline1ActiveWalletsOnlyBoughtDisabled,
  ] = useState(false);
  // Only Sold
  const [
    trendline1ActiveWalletsOnlySoldDisabled,
    setTrendline1ActiveWalletsOnlySoldDisabled,
  ] = useState(false);
  // Bought And Sold
  const [
    trendline1ActiveWalletsAndSoldDisabled,
    setTrendline1ActiveWalletsBoughtAndSoldDisabled,
  ] = useState(false);

  // • Specific •
  // > Trendline timeframe clicked...
  useEffect(() => {
    if (traders.activeWallets) {
      if (trendlineTimeframe === 0) {
        // Data
        setTrendline1ActiveWalletsOnlyBoughtData(activeWalletsOnlyBought);
        setTrendline1ActiveWalletsOnlySoldData(activeWalletsOnlySold);
        setTrendline1ActiveWalletsBoughtAndSoldData(activeWalletsBoughtAndSold);
        setTotalActiveWallets(traders.activeWallets.all[0]);

        // Labels
        setActiveWalletLabels(labels);
      }
      if (trendlineTimeframe === 1) {
        // Data
        setTrendline1ActiveWalletsOnlyBoughtData(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 1)
        );
        setTrendline1ActiveWalletsOnlySoldData(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 1)
        );
        setTrendline1ActiveWalletsBoughtAndSoldData(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 1
          )
        );
        setTotalActiveWallets(traders.activeWallets.oneDay[0]);

        // Labels
        setActiveWalletLabels(
          labels.slice(labels.length - 1).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 7) {
        // Data
        setTrendline1ActiveWalletsOnlyBoughtData(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 7)
        );
        setTrendline1ActiveWalletsOnlySoldData(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 7)
        );
        setTrendline1ActiveWalletsBoughtAndSoldData(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 7
          )
        );
        setTotalActiveWallets(traders.activeWallets.sevenDay[0]);

        // Labels
        setActiveWalletLabels(
          labels.slice(labels.length - 7).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 30) {
        // Data
        setTrendline1ActiveWalletsOnlyBoughtData(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 30)
        );
        setTrendline1ActiveWalletsOnlySoldData(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 30)
        );
        setTrendline1ActiveWalletsBoughtAndSoldData(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 39
          )
        );
        setTotalActiveWallets(traders.activeWallets.thirtyDay[0]);

        // Labels
        setActiveWalletLabels(
          labels.slice(labels.length - 30).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 90) {
        // Data
        setTrendline1ActiveWalletsOnlyBoughtData(
          activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
        );
        setTrendline1ActiveWalletsOnlySoldData(
          activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
        );
        setTrendline1ActiveWalletsBoughtAndSoldData(
          activeWalletsBoughtAndSold.slice(
            activeWalletsBoughtAndSold.length - 90
          )
        );
        setTotalActiveWallets(traders.activeWallets.ninetyDay[0]);

        // Labels
        setActiveWalletLabels(
          labels.slice(labels.length - 90).map((data: string) => data)
        );
      }
    }
  }, [trendlineTimeframe]);

  // ------------------------------------------------------------------------------
  // Trendlines #2
  // ------------------------------------------------------------------------------

  // • Specific •
  // > Trendline #2 Data State
  const [trendline2TotalNewWallets, setTrendline2TotalNewWallets] =
    useState<number>(1);
  const [trendline2NewWalletsLabels, setTrendline2NewWalletsLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [
    trendline2NewWalletsDailyStatsBoughtData,
    setTrendline2NewWalletsDailyStatsBoughtData,
  ] = useState(
    traders.newWallets?.dailyStats.buyer.slice(
      traders.newWallets?.dailyStats.buyer.length - 90
    )
  );
  const [
    trendline2NewWalletsDailyStatsMintedData,
    setTrendline2NewWalletsDailyStatsMintedData,
  ] = useState(
    traders.newWallets?.dailyStats.minter.slice(
      traders.newWallets?.dailyStats.minter.length - 90
    )
  );
  const [
    trendline2NewWalletsDailyStatsOtherData,
    setTrendline2NewWalletsDailyStatsOtherData,
  ] = useState(
    traders.newWallets?.dailyStats.other.slice(
      traders.newWallets?.dailyStats.other.length - 90
    )
  );

  // • Specific •
  // > Disabled state
  const [trendline2NewWalletsDisabled, setTrendline2NewWalletsDisabled] =
    useState(false);
  const [trendline2TotalCreatedDisabled, setTrendline2TotalCreatedDisabled] =
    useState(false);

  // • Specific •
  // > Trendline timeframe clicked...
  useEffect(() => {
    if (traders.newWallets) {
      if (trendlineTimeframe === 0) {
        // Data
        setTrendline2TotalNewWallets(traders.newWallets.all[0]);
        setTrendline2NewWalletsDailyStatsBoughtData(
          traders.newWallets?.dailyStats.buyer
        );
        setTrendline2NewWalletsDailyStatsMintedData(
          traders.newWallets?.dailyStats.minter
        );
        setTrendline2NewWalletsDailyStatsOtherData(
          traders.newWallets?.dailyStats.other
        );

        // Labels
        setTrendline2NewWalletsLabels(labels);
      }
      if (trendlineTimeframe === 1) {
        // Data
        setTrendline2TotalNewWallets(traders.newWallets.oneDay[0]);
        setTrendline2NewWalletsDailyStatsBoughtData(
          traders.newWallets?.dailyStats.buyer.slice(
            traders.newWallets?.dailyStats.buyer.length - 1
          )
        );
        setTrendline2NewWalletsDailyStatsMintedData(
          traders.newWallets?.dailyStats.minter.slice(
            traders.newWallets?.dailyStats.minter.length - 1
          )
        );
        setTrendline2NewWalletsDailyStatsOtherData(
          traders.newWallets?.dailyStats.other.slice(
            traders.newWallets?.dailyStats.other.length - 1
          )
        );

        // Labels
        setTrendline2NewWalletsLabels(
          labels.slice(labels.length - 1).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 7) {
        // Data
        setTrendline2TotalNewWallets(traders.newWallets.sevenDay[0]);
        setTrendline2NewWalletsDailyStatsBoughtData(
          traders.newWallets?.dailyStats.buyer.slice(
            traders.newWallets?.dailyStats.buyer.length - 7
          )
        );
        setTrendline2NewWalletsDailyStatsMintedData(
          traders.newWallets?.dailyStats.minter.slice(
            traders.newWallets?.dailyStats.minter.length - 7
          )
        );
        setTrendline2NewWalletsDailyStatsOtherData(
          traders.newWallets?.dailyStats.other.slice(
            traders.newWallets?.dailyStats.other.length - 7
          )
        );

        // Labels
        setTrendline2NewWalletsLabels(
          labels.slice(labels.length - 7).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 30) {
        // Data
        setTrendline2TotalNewWallets(traders.newWallets.thirtyDay[0]);
        setTrendline2NewWalletsDailyStatsBoughtData(
          traders.newWallets?.dailyStats.buyer.slice(
            traders.newWallets?.dailyStats.buyer.length - 30
          )
        );
        setTrendline2NewWalletsDailyStatsMintedData(
          traders.newWallets?.dailyStats.minter.slice(
            traders.newWallets?.dailyStats.minter.length - 30
          )
        );
        setTrendline2NewWalletsDailyStatsOtherData(
          traders.newWallets?.dailyStats.other.slice(
            traders.newWallets?.dailyStats.other.length - 30
          )
        );
        // Labels
        setTrendline2NewWalletsLabels(
          labels.slice(labels.length - 30).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 90) {
        // Data
        setTrendline2TotalNewWallets(traders.newWallets.ninetyDay[0]);
        setTrendline2NewWalletsDailyStatsBoughtData(
          traders.newWallets?.dailyStats.buyer.slice(
            traders.newWallets?.dailyStats.buyer.length - 90
          )
        );
        setTrendline2NewWalletsDailyStatsMintedData(
          traders.newWallets?.dailyStats.minter.slice(
            traders.newWallets?.dailyStats.minter.length - 90
          )
        );
        setTrendline2NewWalletsDailyStatsOtherData(
          traders.newWallets?.dailyStats.other.slice(
            traders.newWallets?.dailyStats.other.length - 90
          )
        );
        // Labels
        setTrendline2NewWalletsLabels(
          labels.slice(labels.length - 90).map((data: string) => data)
        );
      }
    }
  }, [trendlineTimeframe]);

  return (
    <Overview
      title="Traders"
      heroChartLegendLabels={legendLabels.tradersHero}
      heroChartTimeframe={heroTimeframe}
      heroChartLabels={heroLabels}
      heroChartTimeframeClicked={heroTimeframeClicked}
      heroChartLegendOnClick={(e: string) =>
        handleLegendClick(
          e,
          [
            {
              id: legendLabels.tradersHero[0].id,
              setter: () => setHeroOnlyBoughtDisabled(!heroOnlyBoughtDisabled),
            },
            {
              id: legendLabels.tradersHero[1].id,
              setter: () => setHeroOnlySoldDisabled(!heroOnlySoldDisabled),
            },
            {
              id: legendLabels.tradersHero[2].id,
              setter: () =>
                setHeroBoughtAndSoldDisabled(!heroBoughtAndSoldDisabled),
            },
          ],
          legendLabels.tradersHero
        )
      }
      heroChartTimeframeOnClick={(arg1, arg2) =>
        handleHeroTimeframeClick(
          arg1,
          arg2,
          setHeroTimeframeClicked,
          setHeroTimeframe
        )
      }
      heroChartDatasets={[
        {
          label: "Only Bought",
          data: heroOnlyBoughtDisabled ? [] : heroOnlyBoughtData,
          borderColor: "white",
          backgroundColor: "rgba(64, 192, 87, 1)",
        },
        {
          label: "Only Sold",
          data: heroOnlySoldDisabled ? [] : heroOnlySoldData,
          borderColor: "black",
          backgroundColor: "rgba(250, 82, 82, 1)",
        },
        {
          label: "Bought and Sold",
          data: heroBoughtAndSoldDisabled ? [] : heroBoughtAndSold,
          borderColor: "white",
          backgroundColor: "rgba(95, 61, 196, 1)",
        },
      ]}
      trendlineTimeframeOnClick={(arg1, arg2) =>
        handleTrendlineTimeframeClick(arg1, arg2)
      }
      trendlineTimeframe={trendlineTimeframe}
      trendline1HeaderTitle="Active Wallets"
      trendline1HeaderValue={VolumeFormatter(totalActiveWallets)}
      trendline1Labels={activeWalletLabels}
      trendline1LegendLabels={legendLabels.activeWallets}
      trendLine1LegendOnClick={(e: string) =>
        handleLegendClick(
          e,
          [
            {
              id: legendLabels.activeWallets[0].id,
              setter: () =>
                setTrendline1ActiveWalletsOnlyBoughtDisabled(
                  !trendline1ActiveWalletsOnlyBoughtDisabled
                ),
            },
            {
              id: legendLabels.activeWallets[1].id,
              setter: () =>
                setTrendline1ActiveWalletsOnlySoldDisabled(
                  !trendline1ActiveWalletsOnlySoldDisabled
                ),
            },
            {
              id: legendLabels.activeWallets[2].id,
              setter: () =>
                setTrendline1ActiveWalletsBoughtAndSoldDisabled(
                  !trendline1ActiveWalletsAndSoldDisabled
                ),
            },
          ],
          legendLabels.activeWallets
        )
      }
      trendline1Datasets={[
        {
          label: legendLabels.activeWallets[0].name,
          data: trendline1ActiveWalletsOnlyBoughtDisabled
            ? []
            : trendline1ActiveWalletsOnlyBoughtData || [],
          borderColor: legendLabels.activeWallets[0].rgba,
          backgroundColor: legendLabels.activeWallets[0].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          label: legendLabels.activeWallets[1].name,
          data: trendline1ActiveWalletsOnlySoldDisabled
            ? []
            : trendline1ActiveWalletsOnlySoldData || [],
          borderColor: legendLabels.activeWallets[1].rgba,
          backgroundColor: legendLabels.activeWallets[1].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          label: legendLabels.activeWallets[2].name,
          data: trendline1ActiveWalletsAndSoldDisabled
            ? []
            : trendline1ActiveWalletsBoughtAndSoldData || [],
          borderColor: legendLabels.activeWallets[2].rgba,
          backgroundColor: legendLabels.activeWallets[2].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
      ]}
      trendline2HeaderTitle="New Wallets"
      trendline2HeaderValue={VolumeFormatter(trendline2TotalNewWallets)}
      trendline2Labels={trendline2NewWalletsLabels}
      trendline2LegendLabels={legendLabels.newWallets}
      trendLine2LegendOnClick={(e: string) =>
        handleLegendClick(
          e,
          [
            {
              id: legendLabels.newWallets[0].id,
              setter: () =>
                setTrendline2TotalCreatedDisabled(
                  !trendline2TotalCreatedDisabled
                ),
            },
            {
              id: legendLabels.newWallets[1].id,
              setter: () =>
                setTrendline2NewWalletsDisabled(!trendline2NewWalletsDisabled),
            },
          ],
          legendLabels.newWallets
        )
      }
      trendline2Datasets={[
        {
          label: legendLabels.newWallets[0].name,
          data: trendline2TotalCreatedDisabled
            ? []
            : trendline2NewWalletsDailyStatsBoughtData || [],
          borderColor: legendLabels.newWallets[0].rgba,
          backgroundColor: legendLabels.newWallets[0].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          label: legendLabels.newWallets[1].name,
          data: trendline2NewWalletsDisabled
            ? []
            : trendline2NewWalletsDailyStatsMintedData || [],
          borderColor: legendLabels.newWallets[1].rgba,
          backgroundColor: legendLabels.newWallets[1].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          label: legendLabels.newWallets[2].name,
          data: trendline2NewWalletsDisabled
            ? []
            : trendline2NewWalletsDailyStatsOtherData || [],
          borderColor: legendLabels.newWallets[2].rgba,
          backgroundColor: legendLabels.newWallets[2].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
      ]}
    />
  );
};

export default TradersOverview;
