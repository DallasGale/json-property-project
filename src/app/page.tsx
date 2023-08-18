import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};
const MarketOverviewPage: React.FC = async () => {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
      </Head>
      <h1>Market Overview</h1>
    </>
  );
};

export default MarketOverviewPage;
