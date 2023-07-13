"use client";
import { useState } from "react";
import Marketplaces from "@views/marketplaces";
import MarketOverview from "@views/marketOverview";

// Types
import type {
  DatasetsType,
  TrueVolumeTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
} from "@/app/types";

// Components
import Header from "@/components/header/header";
import navigation from "@/constants/navigation";
import Interesting from "../views/interesting";
import Leaderboards from "../views/leaderboards";

interface DataVizLayoutTypes {
  labels: string[];
  trueVolume: any[];
  loanVolume: any[];
  totalVolume: any[];
  fakeVolume: any[];
  realPercentDifference: number[];
  leaderboardDatasets: DatasetsType[];
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: {
    trueVolume: TrueVolumeTypes[];
    fakeVolume: FakeVolumeTypes[];
    loanVolume: LoanVolumeTypes[];
    royalty: RoyaltyTypes[];
  };
  traders: {
    onlyBought: number[];
    onlyBoughtMovingAverage: number[];
    onlySold: number[];
    onlySoldMovingAverage: number[];
    boughtAndSold: number[];
    boughtAndSoldMovingAverage: number[];
  };
}

const DataVizLayout: React.FC<DataVizLayoutTypes> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  realPercentDifference,
  totalVolume,
  leaderboardDatasets,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
  trueVolumeMovingAverage,
  leaderboard,
  traders,
}) => {
  const [activeTab, setActiveTab] = useState("market-overview");

  console.log({ activeTab });
  return (
    <>
      <Header handleTabClick={(e) => setActiveTab(e)} />
      <div className="content">
        <section className="wrapper">
          <>
            {activeTab == "market-overview" && (
              <MarketOverview
                labels={labels}
                trueVolume={trueVolume}
                totalVolume={totalVolume}
                fakeVolume={fakeVolume}
                realPercentDifference={realPercentDifference}
                loanVolume={loanVolume}
                leaderboardDatasets={leaderboardDatasets}
                loanVolumeMovingAverage={loanVolumeMovingAverage}
                fakeVolumeMovingAverage={fakeVolumeMovingAverage}
                totalVolumeMovingAverage={totalVolumeMovingAverage}
                trueVolumeMovingAverage={trueVolumeMovingAverage}
                leaderboard={{
                  trueVolume: leaderboard.trueVolume,
                  fakeVolume: leaderboard.fakeVolume,
                  loanVolume: leaderboard.loanVolume,
                  royalty: leaderboard.royalty,
                }}
                traders={{
                  onlyBought: traders.onlyBought,
                  onlyBoughtMovingAverage: traders.onlyBoughtMovingAverage,
                  onlySold: traders.onlySold,
                  onlySoldMovingAverage: traders.onlySoldMovingAverage,
                  boughtAndSold: traders.boughtAndSold,
                  boughtAndSoldMovingAverage:
                    traders.boughtAndSoldMovingAverage,
                }}
              />
            )}
            {activeTab == "marketplaces" && (
              <Marketplaces
                labels={labels}
                trueVolume={trueVolume}
                totalVolume={totalVolume}
                fakeVolume={fakeVolume}
                realPercentDifference={realPercentDifference}
                loanVolume={loanVolume}
                leaderboardDatasets={leaderboardDatasets}
                loanVolumeMovingAverage={loanVolumeMovingAverage}
                fakeVolumeMovingAverage={fakeVolumeMovingAverage}
                totalVolumeMovingAverage={totalVolumeMovingAverage}
                trueVolumeMovingAverage={trueVolumeMovingAverage}
                leaderboard={{
                  true_volume: leaderboard.trueVolume,
                  fake_volume: leaderboard.fakeVolume,
                  loan_volume: leaderboard.loanVolume,
                  royalty: leaderboard.royalty,
                }}
              />
            )}
            {activeTab == "leaderboards" && (
              <Leaderboards
                leaderboard={{
                  trueVolume: leaderboard.trueVolume,
                  fakeVolume: leaderboard.fakeVolume,
                  loanVolume: leaderboard.loanVolume,
                  royalty: leaderboard.royalty,
                }}
              />
            )}
          </>
        </section>
      </div>
    </>
  );
};
export default DataVizLayout;
