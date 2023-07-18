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
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
    };
    trueVolume: {
      oneDay: TrueVolumeTypes[];
      sevenDay: TrueVolumeTypes[];
      thirtyDay: TrueVolumeTypes[];
      ninetyDay: TrueVolumeTypes[];
      all: TrueVolumeTypes[];
    };
    fakeVolume: {
      oneDay: FakeVolumeTypes[];
      sevenDay: FakeVolumeTypes[];
      thirtyDay: FakeVolumeTypes[];
      ninetyDay: FakeVolumeTypes[];
      all: FakeVolumeTypes[];
    };
    loanVolume: {
      oneDay: LoanVolumeTypes[];
      sevenDay: LoanVolumeTypes[];
      thirtyDay: LoanVolumeTypes[];
      ninetyDay: LoanVolumeTypes[];
      all: LoanVolumeTypes[];
    };
    royalty: {
      oneDay: RoyaltyTypes[];
      sevenDay: RoyaltyTypes[];
      thirtyDay: RoyaltyTypes[];
      ninetyDay: RoyaltyTypes[];
      all: RoyaltyTypes[];
    };
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
  console.log({ leaderboard });
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
                  trueVolume: {
                    oneDay: leaderboard.trueVolume.oneDay,
                    sevenDay: leaderboard.trueVolume.sevenDay,
                    thirtyDay: leaderboard.trueVolume.thirtyDay,
                    ninetyDay: leaderboard.trueVolume.ninetyDay,
                    all: leaderboard.trueVolume.all,
                  },
                  fakeVolume: {
                    oneDay: leaderboard.fakeVolume.oneDay,
                    sevenDay: leaderboard.fakeVolume.sevenDay,
                    thirtyDay: leaderboard.fakeVolume.thirtyDay,
                    ninetyDay: leaderboard.fakeVolume.ninetyDay,
                    all: leaderboard.fakeVolume.all,
                  },
                  loanVolume: {
                    oneDay: leaderboard.loanVolume.oneDay,
                    sevenDay: leaderboard.loanVolume.sevenDay,
                    thirtyDay: leaderboard.loanVolume.thirtyDay,
                    ninetyDay: leaderboard.loanVolume.ninetyDay,
                    all: leaderboard.loanVolume.all,
                  },
                  royalty: {
                    oneDay: leaderboard.royalty.oneDay,
                    sevenDay: leaderboard.royalty.sevenDay,
                    thirtyDay: leaderboard.royalty.thirtyDay,
                    ninetyDay: leaderboard.royalty.ninetyDay,
                    all: leaderboard.royalty.all,
                  },
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
                  true_volume: leaderboard.trueVolume.thirtyDay,
                  fake_volume: leaderboard.fakeVolume.thirtyDay,
                  loan_volume: leaderboard.loanVolume.thirtyDay,
                  royalty: leaderboard.royalty.thirtyDay,
                }}
              />
            )}
            {activeTab == "leaderboards" && (
              <Leaderboards
                leaderboard={{
                  top100: {
                    OneDayTop100: leaderboard.top100.oneDayTop100,
                    SevenDayTop100: leaderboard.top100.sevenDayTop100,
                    ThirtyDayTop100: leaderboard.top100.thirtyDayTop100,
                  },
                  trueVolume: {
                    oneDay: leaderboard.trueVolume.oneDay,
                    sevenDay: leaderboard.trueVolume.sevenDay,
                    thirtyDay: leaderboard.trueVolume.thirtyDay,
                    ninetyDay: leaderboard.trueVolume.ninetyDay,
                    all: leaderboard.trueVolume.all,
                  },
                  fakeVolume: {
                    oneDay: leaderboard.fakeVolume.oneDay,
                    sevenDay: leaderboard.fakeVolume.sevenDay,
                    thirtyDay: leaderboard.fakeVolume.thirtyDay,
                    ninetyDay: leaderboard.fakeVolume.ninetyDay,
                    all: leaderboard.fakeVolume.all,
                  },
                  loanVolume: {
                    oneDay: leaderboard.loanVolume.oneDay,
                    sevenDay: leaderboard.loanVolume.sevenDay,
                    thirtyDay: leaderboard.loanVolume.thirtyDay,
                    ninetyDay: leaderboard.loanVolume.ninetyDay,
                    all: leaderboard.loanVolume.all,
                  },
                  royalty: {
                    oneDay: leaderboard.royalty.oneDay,
                    sevenDay: leaderboard.royalty.sevenDay,
                    thirtyDay: leaderboard.royalty.thirtyDay,
                    ninetyDay: leaderboard.royalty.ninetyDay,
                    all: leaderboard.royalty.all,
                  },
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
