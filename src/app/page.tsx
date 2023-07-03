// Components
import Image from "next/image";
import Logo from "../../public/DataBeast.svg";
import VolumeChart from "@components/volumeChart";

// Constants
import monthNames from "../constants";

// API
import endpoints from "@api/endpoints";
// import leaderBoardData from "../../public/data/leaderboards.json";

// Types
import type { DatasetsType } from "@app/types";

async function getData() {
  const res = await fetch(endpoints.nft_ethereum_daily_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getLeaderBoardData() {
  const res = await fetch(endpoints.nft_ethereum_collection_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  const leaderBoardData = await getLeaderBoardData();
  const leaderboardDatasets = leaderBoardData.datasets;
  const leaderboardCollectionNames = leaderboardDatasets.filter(
    ({ label }: any) => label === "name"
  );
  const leaderboardCollectionsTrueVolume = leaderboardDatasets.filter(
    ({ label }: any) => label === "total_real_day_volume"
  );
  const leaderboardCollectionsTrueVolumePercentage = leaderboardDatasets.filter(
    ({ label }: any) => label === "total_real_day_volume_percentage"
  );

  const leaderboardCollectionsLoanVolumePercentage = leaderboardDatasets.filter(
    ({ label }: any) => label === "total_day_volume_loan_num"
  );
  const leaderboardCollectionRevenue = leaderboardDatasets.filter(
    ({ label }: any) => label === "total_day_total_royalty"
  );

  const leaderboardCollectionFakeVolume = leaderboardDatasets.filter(
    ({ label }: any) => label === "total_day_volume_fake"
  );
  const leaderboardCollectionFakeVolumePercentage = leaderboardDatasets.filter(
    ({ label }: any) => label === "total_fake_day_volume_percentage"
  );

  // console.log({ mergedArrays });

  const dateFormatter = async () => {
    let newDates: any[] = [];
    await data.labels.forEach((date: any) => {
      const fullDate = new Date(date);
      const month = fullDate.getMonth();
      const day = fullDate.getDate();
      const completeDate = `${monthNames[month]} ${day}`;
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
  // const volumeFarming: Datasets = await data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "volume_farming"
  // );
  // const volumeWashTrading = await data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "volume_wash_trading"
  // );
  // const inorganicVolume = await data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "volume_fake"
  // );
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

  // const percentDifference: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "percent_difference"
  // );
  const realPercentDifference = data?.datasets.filter(
    ({ label }: DatasetsType) => label === "real_percent_difference"
  );
  // const realRawRatio: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "real_raw_ratio"
  // );
  const trueVolume = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real"
  );
  const trueVolume30DayMovingAverage = await data?.datasets.filter(
    ({ label }: DatasetsType) => label === "volume_real_30_day_moving_average"
  );

  // const realVolumeHack: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "real_volume_hack"
  // );
  // const totalPlatform: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "total_platform"
  // );
  // const totalRoyalty: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetsType) => label === "total_royalty"
  // );

  // useEffect(() => {
  //   if (labels) {
  //     dateFormatter(labels);
  //   }
  // }, [labels]);
  return (
    <main className="main-container">
      <header className="header">
        <Image src={Logo} alt="Databeast" />
      </header>

      <div className="content">
        <VolumeChart
          labels={labels}
          fakeVolume={fakeVolume[0].data}
          trueVolume={trueVolume[0].data}
          loanVolume={loanVolume[0].data}
          totalVolume={totalVolume[0].data}
          realPercentDifference={realPercentDifference[0].data}
          leaderboardDatasets={leaderboardDatasets}
          loanVolumeMovingAverage={loanVolum30DayMovingAverage[0].data}
          fakeVolumeMovingAverage={fakeVolume30DayMovingAverage[0].data}
          totalVolumeMovingAverage={totalVolume30DayMovingAverage[0].data}
          trueVolumeMovingAverage={trueVolume30DayMovingAverage[0].data}
          leaderboard={{
            names: leaderboardCollectionNames[0].data,
            true_volumes: leaderboardCollectionsTrueVolume[0].data,
            true_volume_percentage:
              leaderboardCollectionsTrueVolumePercentage[0].data,
            loan_volume: leaderboardCollectionsLoanVolumePercentage[0].data,
            revenue: leaderboardCollectionRevenue[0].data,
            fake_volume: leaderboardCollectionFakeVolume[0].data,
            fake_volume_percentage:
              leaderboardCollectionFakeVolumePercentage[0].data,
          }}
        />
      </div>
    </main>
  );
}
