import Head from "next/head";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DataBeast - Powered by nftDb",
  description: "Powered by nftDb",
};
const MarketOverviewPage: React.FC = async () => {
  return (
    <Head>
      <title>DataBeast - Powered by nftDb</title>
      <meta name="description" content="Powered by nftDb" />
    </Head>
  );
};

export default MarketOverviewPage;
