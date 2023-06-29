import Image from "next/image";
import Logo from "../../public/DataBeast.svg";
import VolumeChart from "@components/volumeChart";
import type { DatasetType } from "@components/volumeChart";

async function getData() {
  const res = await fetch(
    "https://data.databeast.xyz/nft_ethereum_summary_daily.json"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  const dateFormatter = async () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
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
  const volumeWashTrading = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_wash_trading"
  );
  const inorganicVolume = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_fake"
  );
  const loanVolume = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_loan"
  );
  // const percentDifference: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "percent_difference"
  // );
  // const realPercentDifference: Datasets = data?.datasets.filter(
  //   ({ label }: DatasetType) => label === "real_percent_difference"
  // );
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
          trueVolume={realVolume[0].data}
          loanVolume={loanVolume[0].data}
          totalVolume={totalVolume[0].data}
          fakeBlurVolume={volumeWashTrading[0].data}
          fakeOtherVolume={inorganicVolume[0].data}
        />
      </div>
    </main>
  );
}
