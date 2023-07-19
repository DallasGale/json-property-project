"use client";
import { useEffect, useState } from "react";
import { useSpring, animated, easings } from "@react-spring/web";
import Image from "next/image";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";
import ChevronDown from "@assets/icons/chevron-down.svg";

// Utils
import GoodToBadColors from "@/utils/goodToBadColors";
import DecimalFormatter from "@/utils/decimalFormatter";
import { CollectionTypes, DatasetsType } from "@/app/types";

// Components
import ChartDataToggles from "@components/toggles/chart_data";
import { numFormatter } from "@/utils/numFormatter";

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

type TabelHeadTypes = {
  name: string;
  id: string;
  hasChevronDown: boolean;
  active: boolean;
};

const tableHead: TabelHeadTypes[] = [
  {
    name: "#",
    id: "number",
    hasChevronDown: false,
    active: false,
  },

  {
    name: "Collection",
    id: "collection",
    hasChevronDown: false,
    active: false,
  },
  {
    name: "True Volume",
    id: "true-volume",
    hasChevronDown: true,
    active: true,
  },
  {
    name: "True V %",
    id: "true-volume-percentage",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Total Volume",
    id: "total-volume",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "True Sales",
    id: "sales",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Loans",
    id: "loans",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Revenue",
    id: "revenue",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Fake",
    id: "fake",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Total Sales Count",
    id: "total-sales-count",
    hasChevronDown: true,
    active: false,
  },
  // {
  //   name: "True Sales",
  //   id: "sales",
  //   hasChevronDown: true,
  // },
  // {
  //   name: "True Sales",
  //   id: "sales",
  //   hasChevronDown: true,
  // },
];

const DataTable: React.FC<DataTableProps> = ({ tableBodyData }) => {
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 0,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs2 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 150,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  const [timeframe, setTimeframe] = useState(90);
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
        <thead>
          <tr>
            {tableHead.length &&
              tableHead.map(({ name, id, hasChevronDown }) => (
                <td
                  id={id}
                  onClick={(e) => handleSorting(e.currentTarget.id)}
                  key={id}
                  className={`data-table__cell data-table__cell--${name.toLowerCase()}`}
                >
                  {hasChevronDown ? (
                    <div className="data-table__cell-content">
                      <Image
                        src={ChevronDown}
                        alt="Crypto Icon"
                        className="data-table__icon data-table__icon--chevron"
                      />
                      <p
                        className={`typography__display--2 ${
                          activeColumn === id
                            ? "typography__color--white typography__weight--700"
                            : "typography__color--dark-medium-emphasis"
                        }`}
                      >
                        {name}
                      </p>
                    </div>
                  ) : (
                    <p className="typography__display--2 typography__color--dark-medium-emphasis">
                      {name}
                    </p>
                  )}
                </td>
              ))}
          </tr>
        </thead>
        <tbody>
          {top100Data.length &&
            top100Data.map(
              (
                {
                  name,
                  contract_address,
                  total_day_total_royalty,
                  total_day_trade_num,
                  total_day_volume_fake,
                  total_day_volume_loan,
                  total_raw_day_volume,
                  total_real_day_trade_num,
                  total_real_day_volume,
                  total_real_day_volume_percentage,
                },
                index
              ) => {
                let count = index + 1;
                return (
                  <tr key={contract_address}>
                    <td width="50">
                      <p className="typography__display--2">{count}</p>
                    </td>
                    <td>
                      <p className="typography__display--6">{name}</p>
                    </td>
                    <td width="120">
                      <div className="data-table__cell-content">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            activeColumn === "true-volume"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {numFormatter(
                            DecimalFormatter(total_real_day_volume)
                          )}
                        </p>
                      </div>
                    </td>
                    <td width="70" align="right">
                      {total_real_day_volume_percentage ? (
                        <p
                          style={{
                            color: GoodToBadColors(
                              total_real_day_volume_percentage
                            ),
                          }}
                          className={`typography__display--2 ${
                            activeColumn === "true-volume-percentage"
                              ? "typography__weight--700"
                              : "typography__weight--300"
                          }`}
                        >
                          {DecimalFormatter(total_real_day_volume_percentage)}%
                        </p>
                      ) : (
                        <p className="typography__display--2">--</p>
                      )}
                    </td>

                    <td width="100" align="right">
                      <div className="data-table__cell-content">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            activeColumn === "total-volume"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {numFormatter(DecimalFormatter(total_raw_day_volume))}
                        </p>
                      </div>
                    </td>

                    <td width="90" align="right">
                      <p
                        className={`typography__display--2 ${
                          activeColumn === "sales"
                            ? "typography__color--white typography__weight--700"
                            : "typography__color--dark-medium-emphasis"
                        }`}
                      >
                        {numFormatter(total_real_day_trade_num)}
                      </p>
                    </td>

                    {/* loans */}
                    <td width="70" align="right">
                      <div className="leaderboard__data-cell">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            activeColumn === "loans"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {numFormatter(
                            DecimalFormatter(total_day_volume_loan)
                          )}
                        </p>
                      </div>
                    </td>

                    {/* revenue */}
                    <td width="70" align="right">
                      <div className="leaderboard__data-cell">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            activeColumn === "revenue"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {numFormatter(
                            DecimalFormatter(total_day_total_royalty)
                          )}
                        </p>
                      </div>
                    </td>
                    {/* fake_volume */}
                    <td width="70" align="right">
                      <div className="leaderboard__data-cell">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            activeColumn === "fake"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {numFormatter(
                            DecimalFormatter(total_day_volume_fake)
                          )}
                        </p>
                      </div>
                    </td>
                    {/* total sales count */}
                    <td width="120" align="right">
                      <div className="leaderboard__data-cell">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            activeColumn === "total-sales-count"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {numFormatter(DecimalFormatter(total_day_trade_num))}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </animated.table>
    </div>
  );
};

export default DataTable;
