// Components
import { LeaderboardsTypes } from "@/app/types";
import Leaderboard from "@components/leaderboard/leaderboard";
import DataTable from "../dataTable/dataTable";

const Leaderboards: React.FC<LeaderboardsTypes> = ({ top100 }) => {
  return (
    <>
      <Leaderboard
        showTimeframeToggles={true}
        leaderboardData={{ ...top100 }}
      />

      <DataTable tableBodyData={{ ...top100 }} />
    </>
  );
};

export default Leaderboards;
