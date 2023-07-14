import { useSpring, animated, easings } from "@react-spring/web";
import Image from "next/image";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";
import ChevronDown from "@assets/icons/chevron-down.svg";

// Utils
import GoodToBadColors from "@/utils/goodToBadColors";
import DecimalFormatter from "@/utils/decimalFormatter";
import { CollectionTypes, DatasetsType } from "@/app/types";

interface DataTableProps {
  tableTitle?: string;
  tableHead: TabelHeadTypes[];
  tableBody: TableBodyTypes[];
  tableBodyData: CollectionTypes[];
}

type TabelHeadTypes = {
  name: string;
  id: string;
  hasChevronDown?: boolean;
};

type TableBodyTypes = {
  number: number;
  os: number;
  collection: string;
  volume: number;
  trueV: number;
  trueVPercent: number;
  floor: number;
  sales: number;
  hasChevronDown?: boolean;
};
const DataTable: React.FC<DataTableProps> = ({
  tableTitle,
  tableHead,
  tableBody,
  tableBodyData,
}) => {
  console.log({ tableBodyData });
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

  return (
    <div className="data-table">
      <animated.div
        style={{ ...springs1 }}
        className="chart__grid chart__grid--one-col"
      >
        <div className="chart__chart-actions-lockup">
          {tableTitle && (
            <h2 className="typography__display--1">{tableTitle}</h2>
          )}
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
                  key={id}
                  className={`data-table__cell--${name.toLowerCase()}`}
                >
                  {hasChevronDown ? (
                    <div className="data-table__cell-content">
                      <Image
                        src={ChevronDown}
                        alt="Crypto Icon"
                        className="data-table__icon data-table__icon--chevron"
                      />
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
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
          {tableBodyData.length &&
            tableBodyData.map(
              (
                {
                  name,
                  contract_address,
                  total_day_total_platform,
                  total_day_total_royalty,
                  total_day_trade_num,
                  total_day_volume_fake,
                  total_day_volume_farming,
                  total_day_volume_loan,
                  total_day_volume_loan_num,
                  total_day_volume_wash_trading,
                  total_fake_day_volume_percentage,
                  total_loan_day_volume_percentage,
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
                    <td width="50">
                      <p className="typography__display--2">
                        {DecimalFormatter(total_day_total_platform)}
                      </p>
                    </td>
                    <td>
                      <p className="typography__display--6">{name}</p>
                    </td>
                    <td width="70">
                      <div className="data-table__cell-content">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p className="typography__display--2 typography__color--dark-medium-emphasis">
                          {DecimalFormatter(total_raw_day_volume)}
                        </p>
                      </div>
                    </td>
                    <td width="70" align="right">
                      <div className="data-table__cell-content">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p className="typography__display--2 typography__color--dark-medium-emphasis">
                          {DecimalFormatter(total_real_day_volume)}
                        </p>
                      </div>
                    </td>
                    <td width="70" align="right">
                      {total_real_day_volume_percentage ? (
                        <p
                          className="typography__display--2"
                          style={{
                            color: GoodToBadColors(
                              total_real_day_volume_percentage
                            ),
                          }}
                        >
                          {DecimalFormatter(total_real_day_volume_percentage)}%
                        </p>
                      ) : (
                        <p className="typography__display--2">--</p>
                      )}
                    </td>
                    <td width="70" align="right">
                      <div className="data-table__cell-content">
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p className="typography__display--2 typography__color--dark-medium-emphasis">
                          {DecimalFormatter(total_raw_day_volume)}
                        </p>
                      </div>
                    </td>
                    <td width="70" align="right">
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        {DecimalFormatter(total_real_day_trade_num)}
                      </p>
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
