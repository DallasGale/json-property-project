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
  CollectionTypes,
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
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: {
    top100: {
      OneDayTop100: CollectionTypes[];
      SevenDayTop100: CollectionTypes[];
      ThirtyDayTop100: CollectionTypes[];
    };
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
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
  trueVolumeMovingAverage,
  leaderboard,
  traders,
}) => {
  const [activeTab, setActiveTab] = useState("market-overview");
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
                  top100: {
                    OneDayTop100: leaderboard.top100.OneDayTop100,
                    SevenDayTop100: leaderboard.top100.SevenDayTop100,
                    ThirtyDayTop100: leaderboard.top100.ThirtyDayTop100,
                  },
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
