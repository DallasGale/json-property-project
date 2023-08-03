import Link from "next/link";
import { usePathname } from "next/navigation";

import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import Image from "next/image";

interface TableChartProps {
  title: string;
  valueTitle: string;
  color: string;
  col1data: React.ReactNode;
  col2data: React.ReactNode;
  col3data?: React.ReactNode;
}

const VolumeTableChart: React.FC<TableChartProps> = ({
  title,
  valueTitle,
  color,
  col1data,
  col2data,
  col3data,
}) => {
  const route = usePathname();
  return (
    <div className="volume-table-chart">
      <div className="volume-table-chart__header">
        <div className={`volume-table-chart__title ${color}`}>
          <p className={`typography__body--small typography__color--${color}`}>
            {title}
          </p>
        </div>
        <div className="volume-table-chart__value-title">
          <p className="typography__label--medium typography__color--dark-medium-emphasis">
            {valueTitle}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1", minWidth: "66%", maxWidth: "66%" }}>
          <table cellPadding={0} cellSpacing={0} width="100%">
            {col1data}
          </table>
        </div>
        <div style={{ flex: "1", minWidth: "18%", maxWidth: "18%" }}>
          <table cellPadding={0} cellSpacing={0} width="100%">
            {col2data}
          </table>
        </div>
        {col3data && (
          <div style={{ flex: "1", minWidth: "18%", maxWidth: "18%" }}>
            <table cellPadding={0} cellSpacing={0} width="100%">
              {col3data}
            </table>
          </div>
        )}
      </div>
      {route === "/" && (
        <Link
          href="/leaderboards"
          className="typography__label--5 typography__color--dark-medium-emphasis link__more-cta"
        >
          Show More
          <Image src={ChevronRightIcon.src} alt="" width={15} height={15} />
        </Link>
      )}
    </div>
  );
};
export default VolumeTableChart;
