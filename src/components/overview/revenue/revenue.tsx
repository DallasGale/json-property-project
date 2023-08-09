// • Generic •
// These are variables that can be re-used without re-naming.

// • Specific •
// The naming of these state variables are specific to Traders data.
// When re-using this component, make sure these are changed.

"use client";
import { useEffect, useState } from "react";
import { RevenueTypes, TradersTypes } from "@/app/types";
import Overview from "../overview";
import { legendLabels } from "@constants/legendLabels";
import { VolumeFormatter } from "@/utils/volumeFormatter";
import { handleHeroTimeframeClick, handleLegendClick } from "../utils";

type RevenueOverviewProps = {
  labels: string[];
  activeWalletsOnlyBought: number[];
  activeWalletsOnlySold: number[];
  activeWalletsBoughtAndSold: number[];
  revenue: RevenueTypes;
};

const RevenueOverview: React.FC<RevenueOverviewProps> = ({
  labels,
  revenue,
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
  // > Royalty
  const [heroRoyaltyData, setHeroRoyaltyData] = useState(
    revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 90)
  );
  // > Platform
  const [heroPlatformData, setHeroPlatformData] = useState(
    revenue.platformVolume.slice(revenue.platformVolume.length - 90)
  );

  // • Specific •
  // Hero Disabled State
  // -------------------
  // > Royalty
  const [heroRoyaltyDisabled, setHeroRoyaltyDisabled] = useState(false);
  // > Platform
  const [heroPlatformDisabled, setHeroPlatformDisabled] = useState(false);

  console.log({ heroTimeframe });
  // • Specific •
  // > Timeframe clicked...
  useEffect(() => {
    if (heroTimeframe === 0) {
      // Data
      setHeroRoyaltyData(revenue.royaltyVolume);
      setHeroPlatformData(revenue.platformVolume);

      // Labels
      setHeroLabels(labels);
    }
    if (heroTimeframe === 1) {
      // Data
      setHeroRoyaltyData(
        revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 1)
      );
      setHeroPlatformData(
        revenue.platformVolume.slice(revenue.platformVolume.length - 1)
      );

      // Labels
      setHeroLabels(labels.slice(labels.length - 1).map((data: any) => data));
    }
    if (heroTimeframe === 7) {
      // Data
      setHeroRoyaltyData(
        revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 7)
      );
      setHeroPlatformData(
        revenue.platformVolume.slice(revenue.platformVolume.length - 7)
      );

      // Labels
      setHeroLabels(labels.slice(labels.length - 7).map((data: any) => data));
    }
    if (heroTimeframe === 30) {
      // Data
      setHeroRoyaltyData(
        revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 30)
      );
      setHeroPlatformData(
        revenue.platformVolume.slice(revenue.platformVolume.length - 30)
      );

      // Labels
      setHeroLabels(labels.slice(labels.length - 30).map((data: any) => data));
    }

    if (heroTimeframe === 90) {
      // Data
      setHeroRoyaltyData(
        revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 90)
      );
      setHeroPlatformData(
        revenue.platformVolume.slice(revenue.platformVolume.length - 90)
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
  // Royalty Sales Labels
  // todo: should thie be labels for newWallets and activeWallets?
  const [salesRevenueLabels, setSalesRevenueLabels] = useState(
    labels.slice(labels.length - 90).map((data: string) => data)
  );

  // • Specific •
  // > Trendline #1

  // Sales Royalty
  const [trendline1SalesRoyaltyData, setTrendline1SalesRoyaltyData] = useState(
    revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 90)
  );

  // Sales Platform
  const [trendline1SalesPlatformData, setTrendline1SalesPlatformData] =
    useState(revenue.platformVolume.slice(revenue.platformVolume.length - 90));

  // Trendline #1 (Active Wallets) Disabled State
  // --------------------------------------------
  // • Specific •
  // > Trendline #1

  // Sales Royalty
  const [salesRoyaltyDisabled, setSalesRoyaltyDisabled] = useState(false);
  // Sales Platform
  const [salesPlatformDisabled, setSalesPlatformDisabled] = useState(false);

  // • Specific •
  // > Trendline timeframe clicked...
  useEffect(() => {
    if (revenue.royaltyVolume) {
      if (trendlineTimeframe === 0) {
        // Data
        setTrendline1SalesRoyaltyData(revenue.royaltyVolume);
        setTrendline1SalesPlatformData(revenue.platformVolume);

        // Labels
        setSalesRevenueLabels(labels);
      }
      if (trendlineTimeframe === 1) {
        // Data
        setTrendline1SalesRoyaltyData(
          revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 1)
        );
        setTrendline1SalesPlatformData(
          revenue.platformVolume.slice(revenue.platformVolume.length - 1)
        );

        // Labels
        setSalesRevenueLabels(
          labels.slice(labels.length - 1).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 7) {
        // Data
        setTrendline1SalesRoyaltyData(
          revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 7)
        );
        setTrendline1SalesPlatformData(
          revenue.platformVolume.slice(revenue.platformVolume.length - 7)
        );

        // Labels
        setSalesRevenueLabels(
          labels.slice(labels.length - 7).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 30) {
        // Data
        setTrendline1SalesRoyaltyData(
          revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 30)
        );
        setTrendline1SalesPlatformData(
          revenue.platformVolume.slice(revenue.platformVolume.length - 30)
        );

        // Labels
        setSalesRevenueLabels(
          labels.slice(labels.length - 30).map((data: string) => data)
        );
      }
      if (trendlineTimeframe === 90) {
        // Data
        setTrendline1SalesRoyaltyData(
          revenue.royaltyVolume.slice(revenue.royaltyVolume.length - 90)
        );
        setTrendline1SalesPlatformData(
          revenue.platformVolume.slice(revenue.platformVolume.length - 90)
        );

        // Labels
        setSalesRevenueLabels(
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
    trendline2NewWalletsDailyStatsData,
    setTrendline2NewWalletsDailyStatsData,
  ] = useState(
    0
    // traders.newWallets?.dailyStats.new.slice(
    //   traders.newWallets?.dailyStats.new.length - 90
  );

  const [
    trendline2NewWalletsDailyStatsTotalCreatedData,
    setTrendline2NewWalletsDailyStatsTotalCreatedData,
  ] = useState(
    0
    // traders.newWallets?.dailyStats.totalCreated.slice(
    //   traders.newWallets?.dailyStats.totalCreated.length - 90
    // )
  );

  // • Specific •
  // > Disabled state
  const [trendline2NewWalletsDisabled, setTrendline2NewWalletsDisabled] =
    useState(false);
  const [trendline2TotalCreatedDisabled, setTrendline2TotalCreatedDisabled] =
    useState(false);

  return (
    <Overview
      title="Revenue"
      heroChartLegendLabels={legendLabels.revenue}
      heroChartTimeframe={heroTimeframe}
      heroChartLabels={heroLabels}
      heroChartTimeframeClicked={heroTimeframeClicked}
      heroChartLegendOnClick={(e: string) =>
        handleLegendClick(
          e,
          [
            {
              id: legendLabels.revenue[0].id,
              setter: () => setHeroRoyaltyDisabled(!heroRoyaltyDisabled),
            },
            {
              id: legendLabels.revenue[1].id,
              setter: () => setHeroPlatformDisabled(!heroPlatformDisabled),
            },
          ],
          legendLabels.revenue
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
          label: legendLabels.revenue[0].name,
          data: heroRoyaltyDisabled ? [] : heroRoyaltyData,
          borderColor: "white",
          backgroundColor: legendLabels.revenue[0].rgba,
        },
        {
          label: legendLabels.revenue[1].name,
          data: heroPlatformDisabled ? [] : heroPlatformData,
          borderColor: "black",
          backgroundColor: legendLabels.revenue[1].rgba,
        },
      ]}
      trendlineTimeframeOnClick={(arg1, arg2) =>
        handleTrendlineTimeframeClick(arg1, arg2)
      }
      trendlineTimeframe={trendlineTimeframe}
      trendline1HeaderTitle="Sales Revenue"
      trendline1HeaderValue={VolumeFormatter(0)}
      trendline1Labels={salesRevenueLabels}
      trendline1LegendLabels={legendLabels.salesRevenue}
      trendLine1LegendOnClick={(e: string) =>
        handleLegendClick(
          e,
          [
            {
              id: legendLabels.salesRevenue[0].id,
              setter: () => setSalesRoyaltyDisabled(!salesRoyaltyDisabled),
            },
            {
              id: legendLabels.salesRevenue[1].id,
              setter: () => setSalesPlatformDisabled(!salesPlatformDisabled),
            },
          ],
          legendLabels.salesRevenue
        )
      }
      trendline1Datasets={[
        {
          label: legendLabels.salesRevenue[0].name,
          data: salesRoyaltyDisabled ? [] : trendline1SalesRoyaltyData || [],
          borderColor: legendLabels.salesRevenue[0].rgba,
          backgroundColor: legendLabels.salesRevenue[0].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
        {
          label: legendLabels.salesRevenue[1].name,
          data: salesPlatformDisabled ? [] : trendline1SalesPlatformData || [],
          borderColor: legendLabels.salesRevenue[1].rgba,
          backgroundColor: legendLabels.salesRevenue[1].rgba,
          pointRadius: 0,
          borderWidth: 3,
        },
      ]}
      trendline2HeaderTitle="Minting Revenue"
      trendline2HeaderValue={VolumeFormatter(trendline2TotalNewWallets)}
      trendline2Labels={trendline2NewWalletsLabels}
      trendline2LegendLabels={legendLabels.mintingRevenue}
      trendLine2LegendOnClick={(e: string) =>
        handleLegendClick(
          e,
          [
            {
              id: legendLabels.mintingRevenue[0].id,
              setter: () =>
                setTrendline2TotalCreatedDisabled(
                  !trendline2TotalCreatedDisabled
                ),
            },
            {
              id: legendLabels.mintingRevenue[1].id,
              setter: () =>
                setTrendline2NewWalletsDisabled(!trendline2NewWalletsDisabled),
            },
          ],
          legendLabels.newWallets
        )
      }
      trendline2Datasets={
        [
          // {
          //   label: legendLabels.mintingRevenue[0].name,
          //   data: trendline2TotalCreatedDisabled
          //     ? []
          //     : trendline2NewWalletsDailyStatsTotalCreatedData || [],
          //   borderColor: legendLabels.newWallets[0].rgba,
          //   backgroundColor: legendLabels.newWallets[0].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
          // {
          //   label: legendLabels.mintingRevenue[1].name,
          //   data: trendline2NewWalletsDisabled
          //     ? []
          //     : trendline2NewWalletsDailyStatsData || [],
          //   borderColor: legendLabels.newWallets[1].rgba,
          //   backgroundColor: legendLabels.newWallets[1].rgba,
          //   pointRadius: 0,
          //   borderWidth: 3,
          // },
        ]
      }
    />
  );
};

export default RevenueOverview;
