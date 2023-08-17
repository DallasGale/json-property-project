"use client";
import { useEffect, useState } from "react";
import { useSpring, animated, easings } from "@react-spring/web";

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
  const handleSorting = (id: string) => {
    setSortedBy({ id: id });
    setActiveColumn(id);
  };

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 300,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  return (
    <div className="property-table">
      <animated.div className="u-container-shadow" style={{ ...springs1 }}>
        <div className="chart__grid chart__grid--one-col">
          <div className="chart__chart-actions-lockup">
            <ChartDataToggles
              title={`Sales Results`}
              onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
              active={timeframe}
            />
          </div>
        </div>
        <div className="property-table__table-wrapper">
          <table cellPadding={6} cellSpacing={0} width="100%">
            <Head
              labels={ColumnLabels}
              active={activeColumn}
              handleSortByClick={(e) => handleSorting(e)}
            />
            <PropertyTableBody
              property_data={propertyDataState}
              active={activeColumn}
            />
          </table>
        </div>
      </animated.div>
    </div>
  );
};

export default PropertyDataTable;
