"use client";
import { useState } from "react";
import MarketOverview, {
  PercentChangeTimeframeTypes,
} from "@views/marketOverview";

// Types
import type {
  TrueVolumeTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
  CollectionTypes,
} from "@/app/types";

// Components
import Header from "@/components/header/header";
import Leaderboards from "../views/leaderboards";
import type { TradersTimeframeTypes } from "../traders/traders";

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
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
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
    activeWallets: TradersTimeframeTypes;
    newWallets: TradersTimeframeTypes;
    trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalPercentChangeTimeframeData: PercentChangeTimeframeTypes;
    truePercentChangeTimeframeData: PercentChangeTimeframeTypes;
    fakeVolumeTimeframeSummaryData: TradersTimeframeTypes;
    loanVolumeTimeframeSummaryData: TradersTimeframeTypes;
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
                  activeWallets: traders.activeWallets,
                  newWallets: traders.newWallets,
                  trueVolumeTimeframeSummaryData:
                    traders.trueVolumeTimeframeSummaryData,
                  totalVolumeTimeframeSummaryData:
                    traders.totalVolumeTimeframeSummaryData,
                  totalPercentChangeTimeframeData:
                    traders.totalPercentChangeTimeframeData,
                  truePercentChangeTimeframeData:
                    traders.truePercentChangeTimeframeData,
                  fakeVolumeTimeframeSummaryData:
                    traders.fakeVolumeTimeframeSummaryData,
                  loanVolumeTimeframeSummaryData:
                    traders.loanVolumeTimeframeSummaryData,
                }}
              />
            )}
            {activeTab == "leaderboards" && (
              <Leaderboards
                leaderboard={{
                  top100: {
                    oneDayTop100: leaderboard.top100.oneDayTop100,
                    sevenDayTop100: leaderboard.top100.sevenDayTop100,
                    thirtyDayTop100: leaderboard.top100.thirtyDayTop100,
                    ninetyDayTop100: leaderboard.top100.ninetyDayTop100,
                    allTop100: leaderboard.top100.allTop100,
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
