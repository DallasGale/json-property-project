// Components
import Image from "next/image";
import { HoverCard } from "@mantine/core";
import TooltipBody from "@components/leaderboard/tooltipBody/tooltipBody";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";

// Utils
import GoodToBadColors from "@utils/goodToBadColors";
import DecimalFormatter from "@utils/decimalFormatter";
import { VolumeFormatter } from "@utils/volumeFormatter";
import { ColumnLabels } from "@/constants/top100table";

// Types
import { PropertyDataTypes, PropertyTableBodyTypes } from "@/app/types";

const DataTableBody: React.FC<PropertyTableBodyTypes> = ({
  property_data,
  active,
}) => {
  console.log(property_data.data);
  return (
    <>
      <tbody>
        {property_data.data.map(
          ({
            id,
            full_address,
            variance,
            indicative_price,
            selling_price,
          }: PropertyDataTypes) => {
            return (
              <tr key={id} className="property-table__row">
                <td className="property-table__td">
                  <HoverCard
                    width={320}
                    shadow="md"
                    openDelay={300}
                    position="top"
                  >
                    <HoverCard.Target>
                      <p className="typography__display--6 u-cursor-pointer">
                        {full_address}
                      </p>
                    </HoverCard.Target>
                    <HoverCard.Dropdown className="dropdown">
                      {/* <TooltipBody
                        name={name}
                        timeframe={timeframe}
                        trueVolume={total_real_day_volume}
                        fakeVolume={total_day_volume_fake}
                        loanVolume={total_day_volume_loan}
                        totalVolume={total_raw_day_volume}
                        totalRevenue={total_day_total_royalty}
                        totalRealDayVolume={total_real_day_volume}
                        totalFakeVolume={total_day_volume_fake}
                        totalLoanVolume={total_day_volume_loan}
                        totalRealDayVolumePercentage={
                          total_real_day_volume_percentage || 0
                        }
                        totalFakeVolumePercentage={
                          total_fake_day_volume_percentage || 0
                        }
                        totalLoanVolumePercentage={
                          total_loan_day_volume_percentage || 0
                        }
                      /> */}
                    </HoverCard.Dropdown>
                  </HoverCard>
                </td>
                <td width="70" align="right" className="property-table__td">
                  <p
                    style={{
                      color: GoodToBadColors(variance),
                    }}
                    className={`typography__display--2 ${
                      active === ColumnLabels[0].id
                        ? "typography__weight--700"
                        : "typography__weight--300"
                    }`}
                  >
                    {DecimalFormatter(variance)}%
                  </p>
                </td>
                <td width="90" className="property-table__td">
                  <div className="property-table__cell-content">
                    <p
                      className={`typography__display--2 ${
                        active === ColumnLabels[1].id
                          ? "typography__color--white typography__weight--700"
                          : "typography__color--dark-medium-emphasis"
                      }`}
                    >
                      {VolumeFormatter(DecimalFormatter(indicative_price))}
                    </p>
                  </div>
                </td>

                <td width="95" align="right" className="property-table__td">
                  <div className="property-table__cell-content">
                    <p
                      className={`typography__display--2 ${
                        active === ColumnLabels[2].id
                          ? "typography__color--white typography__weight--700"
                          : "typography__color--dark-medium-emphasis"
                      }`}
                    >
                      {VolumeFormatter(DecimalFormatter(selling_price))}
                    </p>
                  </div>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </>
  );
};

export default DataTableBody;
