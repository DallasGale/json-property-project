import DecimalFormatter from "@/utils/decimalFormatter";
import PercentChangeColors from "@/utils/percentChangeColors";
import Image from "next/image";
import CryptoIcon from "@assets/icons/crypto.svg";

interface ChartHeaderProps {
  title: string;
  description: string;
  value?: string;
  valueDiff?: number;
  withCryptoIcon?: boolean;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({
  title,
  description,
  value,
  valueDiff,
  withCryptoIcon = false,
}) => {
  return (
    <div className="chart__header">
      <div className="chart__value-percent-lockup">
        {value && (
          <p className="typography__display--1">
            {withCryptoIcon && <Image src={CryptoIcon} alt="Crypto Icon" />}
            {value}
          </p>
        )}
        {valueDiff && (
          <p
            className="typography__display--4"
            style={{
              color: PercentChangeColors(valueDiff),
            }}
          >
            {valueDiff > 0 && "+"}
            {DecimalFormatter(valueDiff)}%
          </p>
        )}
      </div>
      <h3 className="typography__display--2">{title}</h3>
      <p className="typography__label--3 typography__color--dark-medium-emphasis">
        {description}
      </p>
    </div>
  );
};

export default ChartHeader;