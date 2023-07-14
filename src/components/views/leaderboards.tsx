// Components
import {
  CollectionTypes,
  DatasetsType,
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
          {
            name: "OS",
            id: "OS",
            hasChevronDown: false,
          },
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
          {
            name: "Floor",
            id: "floor",
            hasChevronDown: true,
          },
          {
            name: "Sales",
            id: "sales",
            hasChevronDown: true,
          },
        ]}
        tableBodyData={leaderboard.top100}
        tableBody={[
          {
            number: 1,
            os: 1,
            collection: "Collection",
            volume: 120,
            trueV: 992,
            trueVPercent: 55,
            floor: 30.7,
            sales: 40,
          },
          {
            number: 2,
            os: 2,
            collection: "Collection",
            volume: 655,
            trueV: 471,
            trueVPercent: 53,
            floor: 6.3,
            sales: 96,
          },
          {
            number: 3,
            os: 3,
            collection: "Collection",
            volume: 1342,
            trueV: 400,
            trueVPercent: 37,
            floor: 6.8,
            sales: 72,
          },
          {
            number: 4,
            os: 7,
            collection: "Collection",
            volume: 12.6,
            trueV: 322,
            trueVPercent: 93,
            floor: 1.1,
            sales: 304,
          },
          {
            number: 5,
            os: 10,
            collection: "Collection",
            volume: 2.5,
            trueV: 211,
            trueVPercent: 100,
            floor: 6.2,
            sales: 32,
          },
        ]}
      />
    </>
  );
};

export default Leaderboards;
