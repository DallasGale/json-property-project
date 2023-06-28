import Image from "next/image";
import Logo from "../../public/DataBeast.svg";
import VolumeChart from "@components/volumeChart";
import type { Datasets, DatasetType } from "@components/volumeChart";

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

  // Labels
  const labels = await data?.labels;

  // Datasets
  const totalVolume: Datasets = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "total_volume"
  );
  const volumeFarming: Datasets = await data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_farming"
  );
  const volumeWashTrading: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "volume_wash_trading"
  );
  const inorganicVolume: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "inorganic_volume"
  );
  const loanVolume = data?.datasets.filter(
    ({ label }: DatasetType) => label === "loan_volume"
  );
  const percentDifference: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "percent_difference"
  );
  const realPercentDifference: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "real_percent_difference"
  );
  const realRawRatio: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "real_raw_ratio"
  );
  const realVolume = data?.datasets.filter(
    ({ label }: DatasetType) => label === "real_volume"
  );
  const realVolumeHack: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "real_volume_hack"
  );
  const totalPlatform: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "total_platform"
  );
  const totalRoyalty: Datasets = data?.datasets.filter(
    ({ label }: DatasetType) => label === "total_royalty"
  );

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
          fakeBlurVolume={volumeWashTrading[0].data.slice(volumeWashTrading[0].data.length - 90)}
          fakeOtherVolume={inorganicVolume[0].data.slice(inorganicVolume[0].data.length - 90)}
        />
      </div>
    </main>
  );
}
