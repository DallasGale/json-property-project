// Utils
import Moment from "react-moment";
import { numFormatter } from "@utils/numFormatter";
import DecimalFormatter from "@utils/decimalFormatter";

// Components
import ProgressRing from "@components/charts/progressRing";
import Image from "next/image";

// Assets
import CryptoGreenIcon from "@assets/icons/cryptoGreen.svg";
import CryptoRedIcon from "@assets/icons/cryptoRed.svg";
import CryptoYellowIcon from "@assets/icons/cryptoYellow.svg";
import CryptoGreyIcon from "@assets/icons/cryptoGrey.svg";
import LegendIconGreen from "@assets/icons/legendIconGreen.svg";
import LegendIconRed from "@assets/icons/legendIconRed.svg";
import LegendIconYellow from "@assets/icons/legendIconYellow.svg";
import TimeIcon from "@assets/icons/time.svg";

interface TooltipBodyProps {
  name: string;
  today: string;
  trueVolume: number[];
  fakeVolume: number[];
  loanVolume: number[];
  totalVolume: number;
  totalRevenue: number;
  totalRealDayVolume: number;
  totalFakeVolume: number;
  totalLoanVolume: number;
  totalRealDayVolumePercentage: number;
  totalFakeVolumePercentage: number;
  totalLoanVolumePercentage: number;
}
const TooltipBody: React.FC<TooltipBodyProps> = ({
  name,
  today,
  trueVolume,
  fakeVolume,
  loanVolume,
  totalVolume,
  totalRevenue,
  totalRealDayVolume,
  totalFakeVolume,
  totalLoanVolume,
  totalRealDayVolumePercentage,
  totalFakeVolumePercentage,
  totalLoanVolumePercentage,
}) => {
  return (
    <div className="tooltip-body">
      <div className="tooltip-body__header">
        <p className="typography__display--6 typography__color--white">
          {name}
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Image src={TimeIcon.src} alt="" width={15} height={15} />
          <p className="typography__display--2 typography__color--dark-medium-emphasis">
            <Moment
              format="ddd, MMMM Do"
              subtract={{ days: 1, hours: 0 }}
              date={today}
            />
          </p>
        </div>
      </div>

      <div className="tooltip-body__content">
        <div className="tooltip-body__content-data">
          <div className="tooltip-body__content-data-progress">
            <ProgressRing
              modiferClass="tooltip-body__content-data-progress-ring"
              trueVolume={trueVolume}
              fakeVolume={fakeVolume}
              loanVolume={loanVolume}
            />
          </div>
          <div className="tooltip-body__content-data-values">
            <table
              className="tooltip-body__table"
              width="100%"
              cellSpacing={0}
              cellPadding={0}
            >
              <tr>
                <td width="50%">
                  <div className="tooltip-body__legend-item">
                    <Image src={LegendIconGreen} alt="Legend Icon" />
                    <p className="typography__label--3">True Volume</p>
                  </div>
                </td>
                <td width="20%" align="right">
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <Image
                      src={CryptoGreenIcon}
                      alt="Crypto Icon"
                      className="tooltip-body__icon tooltip-body__icon--crypto"
                    />
                    <p className="typography__label--1 typography__color--accent-green">
                      {numFormatter(DecimalFormatter(totalRealDayVolume))}
                    </p>
                  </div>
                </td>
                <td width="30%" align="right">
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <p className="typography__label--3">
                      {numFormatter(
                        DecimalFormatter(totalRealDayVolumePercentage)
                      )}
                      %
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <div className="tooltip-body__legend-item">
                    <Image src={LegendIconRed} alt="Legend Icon" />
                    <p className="typography__label--3">Fake Volume</p>
                  </div>
                </td>
                <td width="20%" align="right">
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <Image
                      src={CryptoRedIcon}
                      alt="Crypto Icon"
                      className="tooltip-body__icon tooltip-body__icon--crypto"
                    />
                    <p className="typography__label--1 typography__color--accent-red">
                      {numFormatter(DecimalFormatter(totalFakeVolume))}
                    </p>
                  </div>
                </td>
                <td width="30%" align="right">
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <p className="typography__label--3">
                      {numFormatter(
                        DecimalFormatter(totalFakeVolumePercentage)
                      )}
                      %
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <div className="tooltip-body__legend-item">
                    <Image src={LegendIconYellow} alt="Legend Icon" />
                    <p className="typography__label--3">Loans</p>
                  </div>
                </td>
                <td width="20%" align="right">
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <Image
                      src={CryptoYellowIcon}
                      alt="Crypto Icon"
                      className="tooltip-body__icon tooltip-body__icon--crypto"
                    />
                    <p className="typography__label--1 typography__color--accent-yellow">
                      {numFormatter(DecimalFormatter(totalLoanVolume))}
                    </p>
                  </div>
                </td>
                <td width="30%" align="right">
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <p className="typography__label--3">
                      {numFormatter(
                        DecimalFormatter(totalLoanVolumePercentage)
                      )}
                      %
                    </p>
                  </div>
                </td>
              </tr>
            </table>
            <div className="tooltip-body__table-footer" />
            <table
              className="tooltip-body__table"
              width="100%"
              cellSpacing={0}
              cellPadding={0}
            >
              <tr>
                <td colSpan={2}>
                  <p className="typography__label--3">Total Volume</p>
                </td>
                <td>
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <Image
                      src={CryptoGreyIcon}
                      alt="Crypto Icon"
                      className="tooltip-body__icon tooltip-body__icon--crypto"
                    />
                    <p className="typography__label--3 typography__color--white">
                      {numFormatter(DecimalFormatter(totalVolume))}
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <p className="typography__label--3">Revenue</p>
                </td>
                <td>
                  <div className="tooltip_body__table--value-col u-justifyEnd">
                    <Image
                      src={CryptoGreyIcon}
                      alt="Crypto Icon"
                      className="tooltip-body__icon tooltip-body__icon--crypto"
                    />
                    <p className="typography__label--3 typography__color--white">
                      {numFormatter(DecimalFormatter(totalRevenue))}
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipBody;
