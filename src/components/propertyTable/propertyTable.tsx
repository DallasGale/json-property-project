"use client";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

// Utils
import { useSearchParams } from "next/navigation";

// Components
import ChartDataToggles from "@components/toggles/chart_data";
import Head from "./head";
import PropertyTableBody from "./body";

// Constants
import { ColumnLabels } from "@constants/top100table";
import { config } from "@constants/animationSettings";

// Types
import {
  PropertyTableColumnLabelsTypes,
  PropertyDataTableTypes,
} from "@/app/types";

const PropertyDataTable: React.FC<PropertyDataTableTypes> = ({
  propertyData,
}) => {
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
  });
  const [timeframe, setTimeframe] = useState(1);
  const [propertyDataState, setPropertyDataState] = useState(propertyData);
  const [activeColumn, setActiveColumn] = useState(ColumnLabels[2].id);
  const handleSorting = (id: string, category: string) => {
    console.log({ id, category });
    setSortedBy({ id: id });
    setActiveColumn(id);
  };

  useEffect(() => {
    if (searchParams) {
      setSortedBy({ id: searchParams });
      setActiveColumn(searchParams);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   // Address
  //   if (sortedBy.id === ColumnLabels[1].id) {
  //     if (timeframe === 90) {
  //       setPropertyData(tableBodyData.sortedAlphabetically.ninetyDayTop100);
  //     }
  //     if (timeframe === 30) {
  //       setPropertyData(tableBodyData.sortedAlphabetically.thirtyDayTop100);
  //     }
  //     if (timeframe === 7) {
  //       setPropertyData(tableBodyData.sortedAlphabetically.sevenDayTop100);
  //     }

  //     if (timeframe === 1) {
  //       setPropertyData(tableBodyData.sortedAlphabetically.oneDayTop100);
  //     }

  //     if (timeframe === 0) {
  //       setPropertyData(tableBodyData.sortedAlphabetically.allTop100);
  //     }
  //   }
  //   // Variance
  //   if (sortedBy.id === ColumnLabels[2].id) {
  //     if (timeframe === 90) {
  //       setPropertyData(tableBodyData.sortedByTrueVol.ninetyDayTop100);
  //     }
  //     if (timeframe === 30) {
  //       setPropertyData(tableBodyData.sortedByTrueVol.thirtyDayTop100);
  //     }
  //     if (timeframe === 7) {
  //       setPropertyData(tableBodyData.sortedByTrueVol.sevenDayTop100);
  //     }

  //     if (timeframe === 1) {
  //       setPropertyData(tableBodyData.sortedByTrueVol.oneDayTop100);
  //     }

  //     if (timeframe === 0) {
  //       setPropertyData(tableBodyData.sortedByTrueVol.allTop100);
  //     }
  //   }
  //   // Indicative Price
  //   if (sortedBy.id === ColumnLabels[3].id) {
  //     if (timeframe === 90) {
  //       setPropertyData(tableBodyData.sortedByTrueVolPct.ninetyDayTop100);
  //     }
  //     if (timeframe === 30) {
  //       setPropertyData(tableBodyData.sortedByTrueVolPct.thirtyDayTop100);
  //     }
  //     if (timeframe === 7) {
  //       setPropertyData(tableBodyData.sortedByTrueVolPct.sevenDayTop100);
  //     }

  //     if (timeframe === 1) {
  //       setPropertyData(tableBodyData.sortedByTrueVolPct.oneDayTop100);
  //     }

  //     if (timeframe === 0) {
  //       setPropertyData(tableBodyData.sortedByTrueVolPct.allTop100);
  //     }
  //   }
  //   //  Selling Price
  //   if (sortedBy.id === ColumnLabels[4].id) {
  //     if (timeframe === 90) {
  //       setPropertyData(tableBodyData.sortedByTotalVol.ninetyDayTop100);
  //     }
  //     if (timeframe === 30) {
  //       setPropertyData(tableBodyData.sortedByTotalVol.thirtyDayTop100);
  //     }
  //     if (timeframe === 7) {
  //       setPropertyData(tableBodyData.sortedByTotalVol.sevenDayTop100);
  //     }

  //     if (timeframe === 1) {
  //       setPropertyData(tableBodyData.sortedByTotalVol.oneDayTop100);
  //     }

  //     if (timeframe === 0) {
  //       setPropertyData(tableBodyData.sortedByTotalVol.allTop100);
  //     }
  //   }
  // }, [timeframe, sortedBy]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

  return (
    <div className="property-table">
      <animated.div
        style={{ ...animation1 }}
        className="chart__grid chart__grid--one-col"
      >
        <div className="chart__chart-actions-lockup">
          <ChartDataToggles
            title={`Top 100 Collections`}
            onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
            active={timeframe}
          />
        </div>
      </animated.div>
      <div className="property-table__table-wrapper">
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
          <PropertyTableBody
            property_data={propertyDataState}
            active={activeColumn}
          />
        </animated.table>
      </div>
    </div>
  );
};

export default PropertyDataTable;
