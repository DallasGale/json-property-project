// Components
import Image from "next/image";
import Logo from "../../public/DataBeast.svg";
import VolumeChart from "@components/volumeChart";

// Constants
import monthNames from "../constants";

// API
import endpoints from "@api/endpoints";

// Types
import type { DatasetType } from "@components/volumeChart";

async function getData() {
  const res = await fetch(endpoints.nft_ethereum_daily_summary);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
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
    ({ label }: DatasetType) => label === "volume_total"
  );
  // const volumeFarming: Datasets = await data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "volume_farming"
  // );
  // const volumeWashTrading = await data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "volume_wash_trading"
  // );
  // const inorganicVolume = await data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "volume_fake"
  // );
  const loanVolume = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_loan"
  );
  const fakeVolume = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_fake"
  );
  // const percentDifference: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "percent_difference"
  // );
  const realPercentDifference = data?.datasets.filter(
    ({ label }: DatasetType) => label === "real_percent_difference"
  );
  // const realRawRatio: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "real_raw_ratio"
  // );
  const realVolume = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_real"
  );
  // const realVolumeHack: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "real_volume_hack"
  // );
  // const totalPlatform: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "total_platform"
  // );
  // const totalRoyalty: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "total_royalty"
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
          trueVolume={realVolume[0].data}
          loanVolume={loanVolume[0].data}
          totalVolume={totalVolume[0].data}
          realPercentDifference={realPercentDifference[0].data}
          // fakeBlurVolume={volumeWashTrading[0].data}
          // fakeOtherVolume={inorganicVolume[0].data}
        />
      </div>
    </main>
  );
}
