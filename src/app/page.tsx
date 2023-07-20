// Components
import DataVizLayout from "@components/dataViz/layout";

// Constants
import months from "@constants/months";

// API
import endpoints from "@api/endpoints";

// Types
import type { DatasetsType } from "@app/types";

// Helpers
import orderBy from "lodash.orderby";

async function getDailySummaryData() {
  const res = await fetch(endpoints.nft_ethereum_daily_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getLeaderBoard1dData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["1d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getLeaderBoard7dData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["7d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getLeaderBoard30dData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["30d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getLeaderBoard90dData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["90d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getLeaderBoardAllData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["all"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getWalletTimeframeSummary() {
  const res = await fetch(endpoints.nft_ethereum_timeframe_wallet_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getVolumeTimeframeSummary() {
  const res = await fetch(endpoints.nft_ethereum_timeframe_volume_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const dailySummaryData = await getDailySummaryData();
  const leaderBoard1dData = await getLeaderBoard1dData();
  const leaderBoard7dData = await getLeaderBoard7dData();
  const leaderBoard30dData = await getLeaderBoard30dData();
  const leaderBoard90dData = await getLeaderBoard90dData();
  const leaderBoardAllData = await getLeaderBoardAllData();
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

  // Labels
  const labels = await dateFormatter();

  // Datasets
  const totalVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total"
  );
  const totalVolume30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_30_day_moving_average"
  );
  const loanVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan"
  );
  const loanVolum30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_30_day_moving_average"
  );
  const fakeVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake"
  );
  const fakeVolume30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_30_day_moving_average"
  );
  const realPercentDifference = dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "real_percent_difference"
  );
  const trueVolume = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real"
  );
  const trueVolume30DayMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30_day_moving_average"
  );

  // Traders
  const onlyBought = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_buyer_wallets"
  );
  const onlyBoughtMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30_day_moving_average" // to be updated with the correct moving average data
  );

  const onlySold = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_seller_wallets"
  );
  const onlySoldMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_30_day_moving_average"
  );
  const boughtAndSold = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_seller_and_buyer_wallets"
  );
  const boughtAndSoldMovingAverage = await dailySummaryData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_30_day_moving_average"
  );

  // Timeframe Summary
  // Active Wallet
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

  // Volume
  // True
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
    <main className="main-container">
      <DataVizLayout
        labels={labels}
        fakeVolume={fakeVolume[0].data}
        trueVolume={trueVolume[0].data}
        loanVolume={loanVolume[0].data}
        totalVolume={totalVolume[0].data}
        realPercentDifference={realPercentDifference[0].data}
        loanVolumeMovingAverage={loanVolum30DayMovingAverage[0].data}
        fakeVolumeMovingAverage={fakeVolume30DayMovingAverage[0].data}
        totalVolumeMovingAverage={totalVolume30DayMovingAverage[0].data}
        trueVolumeMovingAverage={trueVolume30DayMovingAverage[0].data}
        leaderboard={{
          top100: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 100),
            // allTop100: [],
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
          },
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
            // all: [],
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
            // all: [],
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
            // all: [],
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
            // all: [],
            all: orderBy(
              leaderBoardAllData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 5),
          },
        }}
        traders={{
          onlyBought: onlyBought[0].data,
          onlyBoughtMovingAverage: onlyBoughtMovingAverage[0].data,
          onlySold: onlySold[0].data,
          onlySoldMovingAverage: onlySoldMovingAverage[0].data,
          boughtAndSold: boughtAndSold[0].data,
          boughtAndSoldMovingAverage: boughtAndSoldMovingAverage[0].data,
          activeWallets: {
            oneDay: activeWallet1Day[0].data,
            sevenDay: activeWallet7Day[0].data,
            thirtyDay: activeWallet30Day[0].data,
            ninetyDay: activeWallet90Day[0].data,
            all: activeWalletAll[0].data,
          },
          newWallets: {
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
        }}
      />
    </main>
  );
}
