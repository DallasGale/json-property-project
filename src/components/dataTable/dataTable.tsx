"use client";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

// Utils
import { useSearchParams } from "next/navigation";

// Components
import ChartDataToggles from "@components/toggles/chart_data";
import Head from "./head";
import DataTableBody from "./body";

// Constants
import { ColumnLabels } from "@constants/top100table";
import { config } from "@constants/animationSettings";

// Types
import { DataTableColumnLabelsTypes, DataTableTypes } from "@/app/types";

const DataTable: React.FC<DataTableTypes> = ({ tableBodyData }) => {
  const searchParams = useSearchParams().get("q");

  // Animations
  const animation1 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 900,
    config,
  });
  const animation2 = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1150,
    config,
  });

  const [sortedBy, setSortedBy] = useState({
    id: ColumnLabels[2].id,
    category: ColumnLabels[2].category,
  });
  const [timeframe, setTimeframe] = useState(1);
  const [top100Data, setTop100Data] = useState(
    tableBodyData.sortedByTrueVol.thirtyDayTop100
  );
  const [activeColumn, setActiveColumn] = useState(ColumnLabels[2].id);
  const handleSorting = (id: string, category: string) => {
    console.log({ id, category });
    setSortedBy({ id: id, category: category });
    setActiveColumn(id);
  };

  useEffect(() => {
    if (searchParams) {
      const found: Pick<DataTableColumnLabelsTypes, "category">[] =
        ColumnLabels.filter((label) => label.id === searchParams);
      setSortedBy({ id: searchParams, category: found[0].category });
      setActiveColumn(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    // True Volume
    if (sortedBy.id === ColumnLabels[2].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByTrueVol.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByTrueVol.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByTrueVol.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByTrueVol.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByTrueVol.allTop100);
      }
    }
    // True Volume Percentage
    if (sortedBy.id === ColumnLabels[3].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByTrueVolPct.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByTrueVolPct.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByTrueVolPct.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByTrueVolPct.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByTrueVolPct.allTop100);
      }
    }
    //  Total Volume
    if (sortedBy.id === ColumnLabels[4].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByTotalVol.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByTotalVol.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByTotalVol.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByTotalVol.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByTotalVol.allTop100);
      }
    }
    // True Sales
    if (sortedBy.id === ColumnLabels[5].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByTrueSales.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByTrueSales.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByTrueSales.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByTrueSales.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByTrueSales.allTop100);
      }
    }
    // Loans
    if (sortedBy.id === ColumnLabels[6].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByLoans.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByLoans.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByLoans.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByLoans.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByLoans.allTop100);
      }
    }
    // Revenue
    if (sortedBy.id === ColumnLabels[7].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByRevenue.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByRevenue.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByRevenue.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByRevenue.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByRevenue.allTop100);
      }
    }
    // Fake
    if (sortedBy.id === ColumnLabels[8].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByFake.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByFake.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByFake.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByFake.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByFake.allTop100);
      }
    }
    // Total Sales Count
    if (sortedBy.id === ColumnLabels[9].id) {
      if (timeframe === 90) {
        setTop100Data(tableBodyData.sortedByTotalSalesCount.ninetyDayTop100);
      }
      if (timeframe === 30) {
        setTop100Data(tableBodyData.sortedByTotalSalesCount.thirtyDayTop100);
      }
      if (timeframe === 7) {
        setTop100Data(tableBodyData.sortedByTotalSalesCount.sevenDayTop100);
      }

      if (timeframe === 1) {
        setTop100Data(tableBodyData.sortedByTotalSalesCount.oneDayTop100);
      }

      if (timeframe === 0) {
        setTop100Data(tableBodyData.sortedByTotalSalesCount.allTop100);
      }
    }
  }, [timeframe, sortedBy]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

  return (
    <div className="data-table">
      <animated.div
        style={{ ...animation1 }}
        className="chart__grid chart__grid--one-col"
      >
        <div className="chart__chart-actions-lockup">
          <ChartDataToggles
            title={`Most ${sortedBy.category} by Collection`}
            onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
            active={timeframe}
          />
        </div>
      </animated.div>
      <div className="data-table__table-wrapper">
        <animated.table
          style={{ ...animation2 }}
          cellPadding={6}
          cellSpacing={0}
          width="100%"
        >
          <Head
            labels={ColumnLabels}
            active={activeColumn}
            handleSortByClick={(e, category) => handleSorting(e, category)}
          />
          <DataTableBody
            active={activeColumn}
            data={top100Data}
            timeframe={timeframe}
          />
        </animated.table>
      </div>
    </div>
  );
};

export default DataTable;
