import { useSpring, animated, easings } from "@react-spring/web";
import Image from "next/image";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";
import ChevronDown from "@assets/icons/chevron-down.svg";

// Utils
import GoodToBadColors from "@/utils/goodToBadColors";
import DecimalFormatter from "@/utils/decimalFormatter";

interface DataTableProps {
  tableTitle?: string;
  tableHead: TabelHeadTypes[];
  tableBody: TableBodyTypes[];
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
}) => {
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
      <table cellPadding={6} cellSpacing={0} width="100%">
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
          {tableBody.length &&
            tableBody.map(
              ({
                number,
                os,
                collection,
                volume,
                trueV,
                trueVPercent,
                floor,
                sales,
              }) => (
                <tr key={number}>
                  <td width="50">
                    <p className="typography__display--2">{number}</p>
                  </td>
                  <td width="50">
                    <p className="typography__display--2">{os}</p>
                  </td>
                  <td>
                    <p className="typography__display--6">{collection}</p>
                  </td>
                  <td width="70">
                    <div className="data-table__cell-content">
                      <Image
                        src={CryptoIcon}
                        alt="Crypto Icon"
                        className="data-table__icon data-table__icon--crypto"
                      />
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        {DecimalFormatter(volume)}
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
                        {DecimalFormatter(trueV)}
                      </p>
                    </div>
                  </td>
                  <td width="70" align="right">
                    <p
                      className="typography__display--2"
                      style={{ color: GoodToBadColors(trueVPercent) }}
                    >
                      {trueVPercent}
                    </p>
                  </td>
                  <td width="70" align="right">
                    <div className="data-table__cell-content">
                      <Image
                        src={CryptoIcon}
                        alt="Crypto Icon"
                        className="data-table__icon data-table__icon--crypto"
                      />
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        {DecimalFormatter(floor)}
                      </p>
                    </div>
                  </td>
                  <td width="70" align="right">
                    <p className="typography__display--2 typography__color--dark-medium-emphasis">
                      {sales}
                    </p>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
