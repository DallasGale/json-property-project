import Head from "next/head";
import { Metadata } from "next";
import { cache } from "react";
import endpoints from "@/api/endpoints";
import months from "@/constants/months";
import MarketOverview from "@views/marketOverview";
import { DatasetsType } from "./types";
import orderBy from "lodash.orderby";
import HeroBanner from "@components/heroBanner/heroBanner";
import StatusBar from "@components/statusBar/statusBar";

// Fetching
const getLeaderBoard1dData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["1d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

const getDailySummaryData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_daily_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

const getLeaderBoard7dData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["7d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});
const getLeaderBoard30dData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["30d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

const getLeaderBoard90dData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["90d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

const getLeaderBoardAllData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["all"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

const getWalletTimeframeSummary = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_timeframe_wallet_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});
const getVolumeTimeframeSummary = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_timeframe_volume_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

export const metadata: Metadata = {
  title: "DataBeast - Powered by nftDb",
  description: "Powered by nftDb",
};
const MarketOverviewPage: React.FC = async () => {
  // Daily
  const dailySummaryData = await getDailySummaryData();
  // Leaderboard
  const leaderBoard1dData = await getLeaderBoard1dData();
  const leaderBoard7dData = await getLeaderBoard7dData();
  const leaderBoard30dData = await getLeaderBoard30dData();
  const leaderBoard90dData = await getLeaderBoard90dData();
  const leaderBoardAllData = await getLeaderBoardAllData();
  // Wallet
  const walletSummararyData = await getWalletTimeframeSummary();
  const volumeSummararyData = await getVolumeTimeframeSummary();

  const dateFormatter = async () => {
    let newDates: any[] = [];
    await dailySummaryData.labels.forEach((date: any) => {
      const fullDate = new Date(date);
      const month = fullDate.getMonth();
      const day = fullDate.getDate();
      const year = fullDate.getFullYear();
      const completeDate = `${months[month]} ${day} '${year
        .toString()
        .slice(2, 4)}`;
      newDates.push(completeDate);
    });
    return newDates;
  };

  // Datasets  - Volumes
  const labels = await dateFormatter();
  const trueVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real"
  );
  const loanVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan"
  );
  const fakeVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake"
  );
  const realPercentDifference = dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "real_percent_difference"
  );
  const totalVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total"
  );
  const loanVolum30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_30_day_moving_average"
  );
  const fakeVolume30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_30_day_moving_average"
  );
  const totalVolume30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_30_day_moving_average"
  );
  const trueVolume30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30_day_moving_average"
  );

  // Datasets - Traders
  const activeWalletOnlyBought = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_buyer_wallets"
  );
  const activeWalletOnlySold = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_seller_wallets"
  );
  const activeWalletBoughtAndSold = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_seller_and_buyer_wallets"
  );
  const activeWallet1Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_total_buyer_seller_24h"
  );

  const activeWallet7Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_total_buyer_seller_7d"
  );

  const activeWallet30Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_total_buyer_seller_30d"
  );

  const activeWallet90Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_total_buyer_seller_90d"
  );

  const activeWalletAll = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_total_buyer_seller_all"
  );

  // New Wallet
  const newWallet1Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "new_wallet_24h"
  );

  const newWallet7Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "new_wallet_7d"
  );

  const newWallet30Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "new_wallet_30d"
  );

  const newWallet90Day = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "new_wallet_90d"
  );

  const newWalletAll = walletSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "new_wallet_all"
  );

  const newWalletsDailyStats = dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "new_wallets"
  );

  const totalNewWalletsCreatedDailyStats = dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "backward_accumulated_new_wallets"
  );
  const trueVolumeSummary1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_1d"
  );

  const trueVolumeSummary7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_7d"
  );
  const trueVolumeSummary30Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30d"
  );

  const trueVolumeSummary90Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_90d"
  );

  const trueVolumeSummaryAll = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_all_time"
  );

  // Total
  const totalVolumeSummary1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_1d"
  );

  const totalVolumeSummary7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_7d"
  );
  const totalVolumeSummary30Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_30d"
  );

  const totalVolumeSummary90Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_90d"
  );

  const totalVolumeSummaryAll = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_all_time"
  );

  // Fake
  const fakeVolumeSummary1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_1d"
  );

  const fakeVolumeSummary7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_7d"
  );
  const fakeVolumeSummary30Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_30d"
  );

  const fakeVolumeSummary90Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_90d"
  );

  const fakeVolumeSummaryAll = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_all_time"
  );

  // Loan
  const loanVolumeSummary1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_1d"
  );

  const loanVolumeSummary7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_7d"
  );
  const loanVolumeSummary30Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_30d"
  );

  const loanVolumeSummary90Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_90d"
  );

  const loanVolumeSummaryAll = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_all_time"
  );
  // Percent Change > Total
  const totalPctChange1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_pct_change_1d"
  );

  const totalPctChange7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_pct_change_7d"
  );

  const totalPctChange30Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_pct_change_30d"
  );

  const totalPctChange90Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_pct_change_90d"
  );

  // Percent Change > True
  const truePctChange1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_pct_change_1d"
  );

  const truePctChange7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_pct_change_7d"
  );

  const truePctChange30Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_pct_change_30d"
  );

  const truePctChange90Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_pct_change_90d"
  );

  return (
    <>
      <Head>
        <title>DataBeast - Powered by nftDb</title>
        <meta name="description" content="Powered by nftDb" />
      </Head>
      <HeroBanner />
      <StatusBar />
      <MarketOverview
        labels={labels}
        trueVolume={trueVolume[0].data}
        fakeVolume={fakeVolume[0].data}
        realPercentDifference={realPercentDifference[0].data}
        loanVolume={loanVolume[0].data}
        loanVolumeMovingAverage={loanVolum30DayMovingAverage[0].data}
        fakeVolumeMovingAverage={fakeVolume30DayMovingAverage[0].data}
        totalVolumeMovingAverage={totalVolume30DayMovingAverage[0].data}
        trueVolumeMovingAverage={trueVolume30DayMovingAverage[0].data}
        activeWalletsBoughtAndSold={activeWalletBoughtAndSold[0].data}
        activeWalletsOnlyBought={activeWalletOnlyBought[0].data}
        activeWalletsOnlySold={activeWalletOnlySold[0].data}
        newWallets={newWalletsDailyStats[0].data}
        leaderboard={{
          trueVolume: {
            oneDay: orderBy(
              leaderBoard1dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 5),
            sevenDay: orderBy(
              leaderBoard7dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 5),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 5),
            ninetyDay: orderBy(
              leaderBoard90dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 5),
            all: orderBy(
              leaderBoardAllData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 5),
          },
          fakeVolume: {
            oneDay: orderBy(
              leaderBoard1dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 5),
            sevenDay: orderBy(
              leaderBoard7dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 5),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 5),
            ninetyDay: orderBy(
              leaderBoard90dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 5),
            all: orderBy(
              leaderBoardAllData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 5),
          },
          loanVolume: {
            oneDay: orderBy(
              leaderBoard1dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 5),
            sevenDay: orderBy(
              leaderBoard7dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 5),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 5),
            ninetyDay: orderBy(
              leaderBoard30dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 5),
            all: orderBy(
              leaderBoardAllData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 5),
          },
          royalty: {
            oneDay: orderBy(
              leaderBoard1dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 5),
            sevenDay: orderBy(
              leaderBoard7dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 5),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 5),
            ninetyDay: orderBy(
              leaderBoard90dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 5),
            all: orderBy(
              leaderBoardAllData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 5),
          },
        }}
        traders={{
          activeWalletOnlyBought: activeWalletOnlyBought[0].data,
          activeWalletOnlySold: activeWalletOnlySold[0].data,
          activeWalletBoughtAndSold: activeWalletBoughtAndSold[0].data,
          activeWallets: {
            oneDay: activeWallet1Day[0].data,
            sevenDay: activeWallet7Day[0].data,
            thirtyDay: activeWallet30Day[0].data,
            ninetyDay: activeWallet90Day[0].data,
            all: activeWalletAll[0].data,
          },
          newWallets: {
            dailyStats: {
              new: newWalletsDailyStats[0].data,
              totalCreated: totalNewWalletsCreatedDailyStats[0].data,
            },
            oneDay: newWallet1Day[0].data,
            sevenDay: newWallet7Day[0].data,
            thirtyDay: newWallet30Day[0].data,
            ninetyDay: newWallet90Day[0].data,
            all: newWalletAll[0].data,
          },
          trueVolumeTimeframeSummaryData: {
            oneDay: trueVolumeSummary1Day[0].data,
            sevenDay: trueVolumeSummary7Day[0].data,
            thirtyDay: trueVolumeSummary30Day[0].data,
            ninetyDay: trueVolumeSummary90Day[0].data,
            all: trueVolumeSummaryAll[0].data,
          },
          totalVolumeTimeframeSummaryData: {
            oneDay: totalVolumeSummary1Day[0].data,
            sevenDay: totalVolumeSummary7Day[0].data,
            thirtyDay: totalVolumeSummary30Day[0].data,
            ninetyDay: totalVolumeSummary90Day[0].data,
            all: totalVolumeSummaryAll[0].data,
          },
          totalPercentChangeTimeframeData: {
            oneDay: totalPctChange1Day[0].data,
            sevenDay: totalPctChange7Day[0].data,
            thirtyDay: totalPctChange30Day[0].data,
            ninetyDay: totalPctChange90Day[0].data,
          },
          truePercentChangeTimeframeData: {
            oneDay: truePctChange1Day[0].data,
            sevenDay: truePctChange7Day[0].data,
            thirtyDay: truePctChange30Day[0].data,
            ninetyDay: truePctChange90Day[0].data,
          },
          fakeVolumeTimeframeSummaryData: {
            oneDay: fakeVolumeSummary1Day[0].data,
            sevenDay: fakeVolumeSummary7Day[0].data,
            thirtyDay: fakeVolumeSummary30Day[0].data,
            ninetyDay: fakeVolumeSummary90Day[0].data,
            all: fakeVolumeSummaryAll[0].data,
          },
          loanVolumeTimeframeSummaryData: {
            oneDay: loanVolumeSummary1Day[0].data,
            sevenDay: loanVolumeSummary7Day[0].data,
            thirtyDay: loanVolumeSummary30Day[0].data,
            ninetyDay: loanVolumeSummary90Day[0].data,
            all: loanVolumeSummaryAll[0].data,
          },
        }}
      />
    </>
  );
};

export default MarketOverviewPage;
