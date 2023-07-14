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
    top100: CollectionTypes[];
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
        tableHead={[
          {
            name: "#",
            id: "number",
            hasChevronDown: false,
          },
          // {
          //   name: "OS",
          //   id: "OS",
          //   hasChevronDown: false,
          // },
          {
            name: "Collection",
            id: "collection",
            hasChevronDown: false,
          },
          {
            name: "Volume",
            id: "volume",
            hasChevronDown: true,
          },
          {
            name: "True V",
            id: "true-v",
            hasChevronDown: true,
          },
          {
            name: "True V %",
            id: "true-v-percent",
            hasChevronDown: true,
          },
          // {
          //   name: "Floor",
          //   id: "floor",
          //   hasChevronDown: true,
          // },
          {
            name: "True Sales",
            id: "sales",
            hasChevronDown: true,
          },
        ]}
        tableBodyData={leaderboard.top100}
      />
    </>
  );
};

export default Leaderboards;
