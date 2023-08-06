import DecimalFormatter from "@/utils/decimalFormatter";
import PercentChangeColors from "@/utils/percentChangeColors";
import Image from "next/image";
import CryptoIcon from "@assets/icons/crypto.svg";

// Types
import { ChartHeaderTypes } from "@/app/types";

const ChartHeader: React.FC<ChartHeaderTypes> = ({
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
          <p className="typography__title--large">
            {withCryptoIcon && <Image src={CryptoIcon} alt="Crypto Icon" />}
            {value}
          </p>
        )}
        {valueDiff && (
          <p
            className="typography__label--large"
            style={{
              color: PercentChangeColors(valueDiff),
            }}
          >
            {valueDiff > 0 && "+"}
            {DecimalFormatter(valueDiff)}%
          </p>
        )}
      </div>
      <h3 className="typography__title--small">{title}</h3>
      <p className="typography__body--small typography__color--dark-medium-emphasis">
        {description}
      </p>
    </div>
  );
};

export default ChartHeader;
