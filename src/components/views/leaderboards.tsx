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

// Types
interface LeaderboardsTypes {
  leaderboard: {
    top100: {
      OneDayTop100: CollectionTypes[];
      SevenDayTop100: CollectionTypes[];
      ThirtyDayTop100: CollectionTypes[];
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
const Leaderboards: React.FC<LeaderboardsTypes> = ({ leaderboard }) => {
  return (
    <>
      <Leaderboard showTimeframeToggles={true} leaderboardData={leaderboard} />

      <DataTable
        tableTitle="Top 100 Collections"
        tableBodyData={leaderboard.top100}
      />
    </>
  );
};

export default Leaderboards;
