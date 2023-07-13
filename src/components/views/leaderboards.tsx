// Components
import {
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
  TrueVolumeTypes,
} from "@/app/types";
import FourColumnGrid from "@/grids/fourColumnGrid";
import TrendLineChart from "@components/charts/trendLineChart";
import Leaderboard from "@components/leaderboard/leaderboard";
import DataTable from "../dataTable/dataTable";

// Types
interface LeaderboardsTypes {
  leaderboard: {
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
            name: "Os",
            id: "os",
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
      {/* <FourColumnGrid
        gridHeading="Interesting"
        column1={{
          header: <h2 className="typography__display--5">Price Volatility</h2>,
          content: (
            <TrendLineChart
              legendFormat="tabled"
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
              legendLabels={[
                {
                  name: "NFT Top 20",
                  value: 0.8,
                  color: "accent-green",
                  id: "nft-top-20",
                },
                {
                  name: "US Market",
                  value: -0.8,
                  color: "accent-blue",
                  id: "us-market",
                },
                {
                  name: "Ethereum",
                  value: 2,
                  color: "accent-purple",
                  id: "ethereum",
                },
                {
                  name: "Bitcoin",
                  value: 10,
                  color: "accent-orange",
                  id: "bitcoin",
                },
              ]}
              datasets={[
                {
                  label: "NFT Top 20",
                  data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 2],
                  borderColor: "rgba(64, 192, 87, 1)",
                  backgroundColor: "rgba(64, 192, 87, 1)",
                  pointRadius: 0,
                  borderWidth: 2,
                },
                {
                  label: "US Market",
                  data: [9, 10, 11, 12, 13, 14, 15, 40, 20],
                  borderColor: "rgba(34, 139, 230, 1)",
                  backgroundColor: "rgba(34, 139, 230, 1)",
                  pointRadius: 0,
                  borderWidth: 2,
                },
                {
                  label: "Ethereum",
                  data: [16, 17, 18, 19, 20, 21, 22, 23, 1],
                  borderColor: "rgba(64, 192, 87, 1)",
                  backgroundColor: "rgba(64, 192, 87, 1)",
                  pointRadius: 0,
                  borderWidth: 2,
                },
                {
                  label: "Bitcoin",
                  data: [24, 25, 26, 27, 28, 39, 60, 90, 2],
                  borderColor: "rgba(253, 126, 20, 1)",
                  backgroundColor: "rgba(253, 126, 20, 1)",
                  pointRadius: 0,
                  borderWidth: 2,
                },
              ]}
              // legendLabels={[
              //   {
              //     color: "rgba(64, 192, 87, 1)",
              //     name: "NFT Top 20",
              //     id: "nft-top-20",
              //   },
              //   {
              //     color: "",
              //     name: "US Market",
              //     id: "us-market",
              //   },
              //   {
              //     color: "",
              //     name: "Ethereum",
              //     id: "ethereum",
              //   },
              //   {
              //     color: "",
              //     name: "Bitcoin",
              //     id: "bitcoin",
              //   },
              // ]}
              legendOnClick={() => null}
            />
          ),
        }}
        column2={{
          header: (
            <h2 className="typography__display--5">Volume Distribution</h2>
          ),
          content: (
            <div />
            // <TabledDotPoints
            //   dotpoints={[
            //     { title: "NFT Top 20", value: 0.8, color: "black" },
            //     { title: "NFT Top 20", value: 0.8, color: "darker-green" },
            //     { title: "NFT Top 20", value: 0.8, color: "dark-green" },
            //     { title: "NFT Top 20", value: 0.8, color: "accent-green" },
            //   ]}
            // />
          ),
        }}
        column3={{
          header: <h2 className="typography__display--5">Top Sweeps</h2>,
          content: "fd",
        }}
        column4={{
          header: <h2 className="typography__display--5">Graveyard</h2>,
          content: "fd",
        }}
      /> */}
    </>
  );
};

export default Leaderboards;
