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
    trueVolume: TrueVolumeTypes[];
    fakeVolume: FakeVolumeTypes[];
    loanVolume: LoanVolumeTypes[];
    royalty: RoyaltyTypes[];
  };
}
const Leaderboards: React.FC<LeaderboardsTypes> = ({ leaderboard }) => {
  return (
    <>
      <Leaderboard
        showTimeframeToggles={true}
        trueVolume={leaderboard.trueVolume}
        fakeVolume={leaderboard.fakeVolume}
        loanVolume={leaderboard.loanVolume}
        royalty={leaderboard.royalty}
      />

      <DataTable
        tableTitle="Top 100 Collections"
        tableBodyData={leaderboard.top100}
      />
    </>
  );
};

export default Leaderboards;
