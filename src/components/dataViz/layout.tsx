"use client";
import { useState } from "react";
import Marketplaces from "@views/marketplaces";
import MarketOverview from "@views/marketOverview";

// Utils
import { useSpring, animated } from "@react-spring/web";

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
    true_volume: TrueVolumeTypes[];
    fake_volume: FakeVolumeTypes[];
    loan_volume: LoanVolumeTypes[];
    royalty: RoyaltyTypes[];
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
}) => {
  const [toggleView, setToggleView] = useState(true);

  const [activeTab, setActiveTab] = useState("market-overview");
  return (
    <>
      <Header handleTabClick={(e) => setActiveTab(e)} />
      <div className="content">
        <section className="chart__wrapper">
          <>
            {activeTab == navigation[0].id && (
              <MarketOverview
                toggleView={toggleView}
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
                  true_volume: leaderboard.true_volume,
                  fake_volume: leaderboard.fake_volume,
                  loan_volume: leaderboard.loan_volume,
                  royalty: leaderboard.royalty,
                }}
              />
            )}
            {activeTab == navigation[1].id && (
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
                  true_volume: leaderboard.true_volume,
                  fake_volume: leaderboard.fake_volume,
                  loan_volume: leaderboard.loan_volume,
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
