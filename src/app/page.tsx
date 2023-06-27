import Image from "next/image";
import Logo from "../../public/DataBeast.svg";
import VolumeChart from "@components/volumeChart";

async function getData() {
  const res = await fetch("https://data.databeast.xyz/data2.json");
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
  return (
    <main className="main-container">
      <header className="header">
        <Image src={Logo} alt="Databeast" />
      </header>

      <div className="content">
        <VolumeChart jsonData={data} />
      </div>
    </main>
  );
}
