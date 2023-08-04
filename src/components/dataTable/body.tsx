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
import { CollectionTypes } from "@/app/types";
import { ColumnLabels } from "@/constants/top100table";

interface BodyProps {
  data: CollectionTypes[];
  active: string;
}

const Body: React.FC<BodyProps> = ({ data, active }) => {
  const today = new Date();

  return (
    <>
      <tbody>
        {data.map(
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
              total_fake_day_volume_percentage,
              total_loan_day_volume_percentage,
            },
            index
          ) => {
            return (
              <tr
                key={contract_address + index + 1}
                className="data-table__row"
              >
                <td width="50" className="data-table__td">
                  <p className="typography__display--2">{index + 1}</p>
                </td>
                <td className="data-table__td">
                  <HoverCard
                    width={320}
                    shadow="md"
                    openDelay={300}
                    position="top"
                  >
                    <HoverCard.Target>
                      <p className="typography__display--6 u-cursor-pointer">
                        {name}
                      </p>
                    </HoverCard.Target>
                    <HoverCard.Dropdown className="dropdown">
                      <TooltipBody
                        name={name}
                        today={today.toDateString()}
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
                      />
                    </HoverCard.Dropdown>
                  </HoverCard>
                </td>
                <td width="120" className="data-table__td">
                  <div className="data-table__cell-content">
                    {total_real_day_volume ? (
                      <>
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            active === ColumnLabels[2].id //"true-volume"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {VolumeFormatter(
                            DecimalFormatter(total_real_day_volume)
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        -
                      </p>
                    )}
                  </div>
                </td>
                <td width="70" align="right" className="data-table__td">
                  {total_real_day_volume_percentage ? (
                    <p
                      style={{
                        color: GoodToBadColors(
                          total_real_day_volume_percentage
                        ),
                      }}
                      className={`typography__display--2 ${
                        active === ColumnLabels[3].id // "true-volume-percentage"
                          ? "typography__weight--700"
                          : "typography__weight--300"
                      }`}
                    >
                      {DecimalFormatter(total_real_day_volume_percentage)}%
                    </p>
                  ) : (
                    <p className="typography__display--2 typography__color--dark-medium-emphasis">
                      -
                    </p>
                  )}
                </td>

                <td width="100" align="right" className="data-table__td">
                  <div className="data-table__cell-content">
                    {total_raw_day_volume ? (
                      <>
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            active === ColumnLabels[4].id // "total-volume"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {VolumeFormatter(
                            DecimalFormatter(total_raw_day_volume)
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        -
                      </p>
                    )}
                  </div>
                </td>

                <td width="90" align="right" className="data-table__td">
                  <p
                    className={`typography__display--2 ${
                      active === ColumnLabels[5].id // "sales"
                        ? "typography__color--white typography__weight--700"
                        : "typography__color--dark-medium-emphasis"
                    }`}
                  >
                    {total_real_day_trade_num
                      ? VolumeFormatter(total_real_day_trade_num)
                      : "-"}
                  </p>
                </td>

                {/* loans */}
                <td width="70" align="right" className="data-table__td">
                  <div className="leaderboard__data-cell">
                    {total_day_volume_loan ? (
                      <>
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            active === ColumnLabels[6].id // "loans"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {VolumeFormatter(
                            DecimalFormatter(total_day_volume_loan)
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        -
                      </p>
                    )}
                  </div>
                </td>

                {/* revenue */}
                <td width="70" align="right" className="data-table__td">
                  <div className="leaderboard__data-cell">
                    {total_day_total_royalty ? (
                      <>
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            active === ColumnLabels[7].id // "revenue"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {VolumeFormatter(
                            DecimalFormatter(total_day_total_royalty)
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        -
                      </p>
                    )}
                  </div>
                </td>
                {/* fake_volume */}
                <td width="70" align="right" className="data-table__td">
                  <div className="leaderboard__data-cell">
                    {total_day_volume_fake ? (
                      <>
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            active === ColumnLabels[8].id // "fake"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {VolumeFormatter(
                            DecimalFormatter(total_day_volume_fake)
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        -
                      </p>
                    )}
                  </div>
                </td>
                {/* total sales count */}
                <td width="120" align="right" className="data-table__td">
                  <div className="leaderboard__data-cell">
                    {total_day_trade_num ? (
                      <>
                        <Image
                          src={CryptoIcon}
                          alt="Crypto Icon"
                          className="data-table__icon data-table__icon--crypto"
                        />
                        <p
                          className={`typography__display--2 ${
                            active === ColumnLabels[9].id //  "total-sales-count"
                              ? "typography__color--white typography__weight--700"
                              : "typography__color--dark-medium-emphasis"
                          }`}
                        >
                          {VolumeFormatter(
                            DecimalFormatter(total_day_trade_num)
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="typography__display--2 typography__color--dark-medium-emphasis">
                        -
                      </p>
                    )}
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

export default Body;
