// Components
import {
  CollectionTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
  TrueVolumeTypes,
} from "@/app/types";
import Leaderboard from "@components/leaderboard/leaderboard";
import DataTable from "../dataTable/dataTable";
import { TradersTimeframeTypes } from "../traders/types";

// Types
interface LeaderboardsTypes {
  traders: {
    trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
    loanVolumeTimeframeSummaryData: TradersTimeframeTypes;
    fakeVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalVolumeTimeframeSummaryData: TradersTimeframeTypes;
  };
  leaderboard: {
    top100: {
      sortedByTrueVol: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
      sortedByTrueVolPct: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
      sortedByTotalVol: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
      sortedByTrueSales: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
      sortedByLoans: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
      sortedByRevenue: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
      sortedByFake: {
        oneDayTop100: CollectionTypes[];
        sevenDayTop100: CollectionTypes[];
        thirtyDayTop100: CollectionTypes[];
        ninetyDayTop100: CollectionTypes[];
        allTop100: CollectionTypes[];
      };
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
}
const Leaderboards: React.FC<LeaderboardsTypes> = ({
  leaderboard,
  traders,
}) => {
  return (
    <>
      <Leaderboard
        showTimeframeToggles={true}
        leaderboardData={leaderboard}
        traders={traders}
      />

      <DataTable
        tableTitle="Top 100 Collections"
        tableBodyData={leaderboard.top100}
      />
    </>
  );
};

export default Leaderboards;
