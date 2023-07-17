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

async function getData() {
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
  console.log({ res });

  return res.json();
}

async function getLeaderBoard7dData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["7d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log({ res });

  return res.json();
}
async function getLeaderBoard30dData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary["30d"]);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log({ res });

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const leaderBoard1dData = await getLeaderBoard1dData();
  const leaderBoard30dData = await getLeaderBoard30dData();
  const leaderBoard7dData = await getLeaderBoard7dData();

  const dateFormatter = async () => {
    let newDates: any[] = [];
    await data.labels.forEach((date: any) => {
      const fullDate = new Date(date);
      const month = fullDate.getMonth();
      const day = fullDate.getDate();
      const completeDate = `${months[month]} ${day}`;
      newDates.push(completeDate);
    });
    return newDates;
  };

  // Labels
  const labels = await dateFormatter();

  // Datasets
  const totalVolume = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total"
  );
  const totalVolume30DayMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_30_day_moving_average"
  );
  const loanVolume = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan"
  );
  const loanVolum30DayMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_loan_30_day_moving_average"
  );
  const fakeVolume = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake"
  );
  const fakeVolume30DayMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_30_day_moving_average"
  );
  const realPercentDifference = data?.datasets.filter(
    ({ label }: DatasetsType) => label === "real_percent_difference"
  );
  const trueVolume = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real"
  );
  const trueVolume30DayMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30_day_moving_average"
  );

  // Traders
  const onlyBought = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_buyer_wallets"
  );
  const onlyBoughtMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30_day_moving_average" // to be updated with the correct moving average data
  );

  const onlySold = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_seller_wallets"
  );
  const onlySoldMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_fake_30_day_moving_average"
  );
  const boughtAndSold = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "unique_seller_and_buyer_wallets"
  );
  const boughtAndSoldMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_total_30_day_moving_average"
  );
  //   OneDayTop100: orderBy(
  //     leaderBoard7dData,
  //       ["total_raw_day_volume"],
  //       "desc"
  //     ).slice(0, 100),

  // SevenDayTop100:  orderBy(
  //     leaderBoard7dData,
  //       ["total_raw_day_volume"],
  //       "desc"
  //     ).slice(0, 100)

  //   ThirtyDayTop100: orderBy(leaderBoard30dData,
  //     ["total_raw_day_volume"],
  //     "desc"
  //   ).slice(0, 100)
  // },
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
            OneDayTop100: orderBy(
              leaderBoard1dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
            SevenDayTop100: orderBy(
              leaderBoard7dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
            ThirtyDayTop100: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ).slice(0, 100),
          },
          trueVolume: {
            oneDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            sevenDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            ninetyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            all: orderBy(leaderBoard30dData, ["total_raw_day_volume"], "desc"),
          },
          fakeVolume: {
            oneDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            sevenDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            ninetyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            all: orderBy(leaderBoard30dData, ["total_raw_day_volume"], "desc"),
          },
          loanVolume: {
            oneDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            sevenDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            ninetyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            all: orderBy(leaderBoard30dData, ["total_raw_day_volume"], "desc"),
          },
          royalty: {
            oneDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            sevenDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            thirtyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            ninetyDay: orderBy(
              leaderBoard30dData,
              ["total_raw_day_volume"],
              "desc"
            ),
            all: orderBy(leaderBoard30dData, ["total_raw_day_volume"], "desc"),
          },

          // trueVolume: orderBy(
          //   leaderBoard30dData,
          //   ["total_real_day_volume"],
          //   "desc"
          // ).slice(0, 5),
          // fakeVolume: orderBy(
          //   leaderBoard30dData,
          //   ["total_day_volume_fake"],
          //   "desc"
          // ).slice(0, 5),
          // loanVolume: orderBy(
          //   leaderBoard30dData,
          //   ["total_day_volume_loan"],
          //   "desc"
          // ).slice(0, 5),
          // royalty: orderBy(
          //   leaderBoard30dData,
          //   ["total_day_total_royalty"],
          //   "desc"
          // ).slice(0, 5),
        }}
        traders={{
          onlyBought: onlyBought[0].data,
          onlyBoughtMovingAverage: onlyBoughtMovingAverage[0].data,
          onlySold: onlySold[0].data,
          onlySoldMovingAverage: onlySoldMovingAverage[0].data,
          boughtAndSold: boughtAndSold[0].data,
          boughtAndSoldMovingAverage: boughtAndSoldMovingAverage[0].data,
        }}
      />
    </main>
  );
}
