import Head from "next/head";
import endpoints from "@/api/endpoints";
import orderBy from "lodash.orderby";
import { CollectionTypes } from "../types";
import { Metadata } from "next";
import SalesResults from "@/components/views/salesResults";

// Fetching
const getPropertyData = async () => {
  const res = await fetch(
    "https://jason-project-api-dallasgale1.vercel.app/api/property"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const metadata: Metadata = {
  title: "",
  description: "",
};

const SalesResultsPage: React.FC = async () => {
  // Leaderboard
  const propertyData = await getPropertyData();
  console.log({ propertyData });
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
      </Head>
      <SalesResults propertyData={propertyData} />
    </>
  );
};

export default SalesResultsPage;
