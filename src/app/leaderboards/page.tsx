import { cache } from "react";
import endpoints from "@/api/endpoints";
import orderBy from "lodash.orderby";
import Leaderboards from "@components/views/leaderboards";
import { DatasetsType } from "../types";

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

const getVolumeTimeframeSummary = cache(async () => {
  const res = await fetch(endpoints.nft_ethereum_timeframe_volume_summary);
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
  const volumeSummararyData = await getVolumeTimeframeSummary();

  const totalVolumeSummary7Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_7d"
  );
  const totalVolumeSummary1Day = volumeSummararyData?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_1d"
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
  return (
    <Leaderboards
      traders={{
        totalVolumeTimeframeSummaryData: {
          oneDay: totalVolumeSummary1Day[0].data,
          sevenDay: totalVolumeSummary7Day[0].data,
          thirtyDay: totalVolumeSummary30Day[0].data,
          ninetyDay: totalVolumeSummary90Day[0].data,
          all: totalVolumeSummaryAll[0].data,
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
        trueVolumeTimeframeSummaryData: {
          oneDay: trueVolumeSummary1Day[0].data,
          sevenDay: trueVolumeSummary7Day[0].data,
          thirtyDay: trueVolumeSummary30Day[0].data,
          ninetyDay: trueVolumeSummary90Day[0].data,
          all: trueVolumeSummaryAll[0].data,
        },
      }}
      leaderboard={{
        top100: {
          sortedByTotalVol: {
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
          ).slice(0, 100)
          },

          sortedByTrueVolPct: {
            oneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
            sevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_real_day_volume_percentage"],
              "desc"
            ).slice(0, 100),
            thirtyDayTop100: orderBy(
              leaderBoard30dData,
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
            ).slice(0, 100)
            },
          }
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
