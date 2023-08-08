import Head from "next/head";
import endpoints from "@/api/endpoints";
import orderBy from "lodash.orderby";
import Leaderboards from "@components/views/leaderboards";
import { CollectionTypes, DatasetsType } from "../types";
import { Metadata } from "next";

// Fetching
const getLeaderBoard1dData = async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["1d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getLeaderBoard7dData = async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["7d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getLeaderBoard30dData = async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["30d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getLeaderBoard90dData = async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["90d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const getLeaderBoardAllData = async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["all"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const metadata: Metadata = {
  title: "DataBeast - Powered by nftDb",
  description: "Powered by nftDb",
};

const LeaderboardsPage: React.FC = async () => {
  // Leaderboard
  const leaderBoard1dData = await getLeaderBoard1dData();
  const leaderBoard7dData = await getLeaderBoard7dData();
  const leaderBoard30dData = await getLeaderBoard30dData();
  const leaderBoard90dData = await getLeaderBoard90dData();
  const leaderBoardAllData = await getLeaderBoardAllData();

  // 1day percentage
  const totalRealDayVolumePercentage1d = leaderBoard1dData.filter(
    ({ total_real_day_volume_percentage }: CollectionTypes) =>
      total_real_day_volume_percentage !== null
  );
  // 7day percentage
  const totalRealDayVolumePercentage7d = leaderBoard7dData.filter(
    ({ total_real_day_volume_percentage }: CollectionTypes) =>
      total_real_day_volume_percentage !== null
  );
  // 30day percentage
  const totalRealDayVolumePercentage30d = leaderBoard30dData.filter(
    ({ total_real_day_volume_percentage }: CollectionTypes) =>
      total_real_day_volume_percentage !== null
  );

  return (
    <>
      <Head>
        <title>DataBeast - Powered by nftDb</title>
        <meta name="description" content="Powered by nftDb" />
      </Head>
      <Leaderboards
        top100={{
          sortedByTrueVol: {
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
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_real_day_volume"],
              "desc"
            ).slice(0, 100),
          },
          sortedByTrueVolPct: {
            oneDayTop100: orderBy(
              totalRealDayVolumePercentage1d,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              totalRealDayVolumePercentage7d,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              totalRealDayVolumePercentage30d,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
          },
          sortedByTotalVol: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
          },
          sortedByTrueSales: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_real_day_trade_num"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_real_day_trade_num"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_real_day_trade_num"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_real_day_trade_num"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_real_day_trade_num"],
              "desc"
            ).slice(0, 100),
          },
          sortedByLoans: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_day_volume_loan"],
              "desc"
            ).slice(0, 100),
          },
          sortedByRevenue: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_day_total_royalty"],
              "desc"
            ).slice(0, 100),
          },
          sortedByFake: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_day_volume_fake"],
              "desc"
            ).slice(0, 100),
          },
          sortedByTotalSalesCount: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_day_trade_num"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_day_trade_num"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_day_trade_num"],
              "desc"
            ).slice(0, 100),
            ninetyDayTop100: orderBy(
              leaderBoard90dData,
              ["total_day_trade_num"],
              "desc"
            ).slice(0, 100),
            allTop100: orderBy(
              leaderBoardAllData,
              ["total_day_trade_num"],
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
            all: orderBy(
              leaderBoardAllData,
              ["total_real_day_volume"],
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
      />
    </>
  );
};

export default LeaderboardsPage;
