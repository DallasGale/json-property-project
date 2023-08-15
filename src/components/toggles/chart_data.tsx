"use clinet";
import { TextInput } from "@mantine/core";

import { ChartDataTogglesTypes } from "@/app/types";
import { DateRangePicker } from "rsuite";
import { useState } from "react";
import "rsuite/dist/rsuite.min.css";

const ChartDataToggles: React.FC<ChartDataTogglesTypes> = ({
  onClick,
  title,
  active,
}) => {
  // const [value, setValue] = useState<[Date, Date]>([
  //   new Date(2021, 11, 1),
  //   new Date(2021, 11, 5),
  // ]);

  const [value, setValue] = useState(new Date());

  return (
    <div>
      <div className="chart__title">
        <h2 className="typography__display--9">{title}</h2>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            gap: 20,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 20,
            }}
          >
            <div>
              <DateRangePicker placeholder="Select Date Range" />
            </div>
            <div className="button-group">
              <button
                className={`button typography__label--1 ${
                  active === 1 ? "active" : ""
                }`}
                onClick={(e) => onClick(e, 1)}
              >
                ALL
              </button>
              <button
                className={`button typography__label--1 ${
                  active === 7 ? "active" : ""
                }`}
                onClick={(e) => onClick(e, 7)}
              >
                VIC
              </button>
              <button
                className={`button typography__label--1 ${
                  active === 30 ? "active" : ""
                }`}
                onClick={(e) => onClick(e, 30)}
              >
                NSW
              </button>
              <button
                className={`button typography__label--1 ${
                  active === 90 ? "active" : ""
                }`}
                onClick={(e) => onClick(e, 90)}
              >
                QLD
              </button>
              <button
                className={`button typography__label--1 ${
                  active === 0 ? "active" : ""
                }`}
                onClick={(e) => onClick(e, 0)}
              >
                SA
              </button>
              <button
                className={`button typography__label--1 ${
                  active === 0 ? "active" : ""
                }`}
                onClick={(e) => onClick(e, 0)}
              >
                ACT
              </button>
            </div>
          </div>
          <TextInput placeholder="Search Address or Suburb" />
        </div>
      </div>
    </div>
  );
};

export default ChartDataToggles;
