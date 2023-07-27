import { cache } from "react";
import endpoints from "@/api/endpoints";
import orderBy from "lodash.orderby";
import Leaderboards from "@components/views/leaderboards";

// Fetching
const getLeaderBoard1dData = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["1d"]);
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

const LeaderboardsPage: React.FC = async () => {
  // Leaderboard
  const leaderBoard1dData = await getLeaderBoard1dData();
  const leaderBoard7dData = await getLeaderBoard7dData();
  const leaderBoard30dData = await getLeaderBoard30dData();
  const leaderBoard90dData = await getLeaderBoard90dData();
  const leaderBoardAllData = await getLeaderBoardAllData();

  return (
    <Leaderboards
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
    />
  );
};

export default LeaderboardsPage;
