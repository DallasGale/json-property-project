"use client";
import { useEffect, useState } from "react";
import { useSpring, animated, easings } from "@react-spring/web";

// Utils
import { CollectionTypes } from "@/app/types";

// Components
import ChartDataToggles from "@components/toggles/chart_data";
import Head from "./head";
import Body from "./body";

// Constants
import { ColumnLabels } from "@constants/top100table";

interface DataTableProps {
  tableTitle?: string;
  tableBodyData: {
    oneDayTop100: CollectionTypes[];
    sevenDayTop100: CollectionTypes[];
    thirtyDayTop100: CollectionTypes[];
    ninetyDayTop100: CollectionTypes[];
    allTop100: CollectionTypes[];
  };
}

const DataTable: React.FC<DataTableProps> = ({ tableBodyData }) => {
  // Animations
  const springs1 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 900,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs2 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1150,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  const [timeframe, setTimeframe] = useState(1);
  const [top100Data, setTop100Data] = useState(tableBodyData.thirtyDayTop100);

  useEffect(() => {
    if (timeframe === 90) {
      setTop100Data(tableBodyData.ninetyDayTop100);
    }
    if (timeframe === 30) {
      setTop100Data(tableBodyData.thirtyDayTop100);
    }
    if (timeframe === 7) {
      setTop100Data(tableBodyData.sevenDayTop100);
    }

    if (timeframe === 1) {
      setTop100Data(tableBodyData.oneDayTop100);
    }

    if (timeframe === 0) {
      setTop100Data(tableBodyData.allTop100);
    }
  }, [timeframe]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

  const [activeColumn, setActiveColumn] = useState("true-volume");
  const handleSorting = (id: string) => {
    setActiveColumn(id);
  };

  return (
    <div className="data-table">
      <animated.div
        style={{ ...springs1 }}
        className="chart__grid chart__grid--one-col"
      >
        <div className="chart__chart-actions-lockup">
          <ChartDataToggles
            title="Top 100 Collections"
            onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
            active={timeframe}
          />
        </div>
      </animated.div>
      <animated.table
        style={{ ...springs2 }}
        cellPadding={6}
        cellSpacing={0}
        width="100%"
      >
        <Head labels={ColumnLabels} active={activeColumn} />
        <Body active={activeColumn} data={top100Data} />
      </animated.table>
    </div>
  );
};

export default DataTable;
