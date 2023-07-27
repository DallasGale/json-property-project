"use client";
import { useEffect, useState } from "react";

// Utils
import Image from "next/image";
import { truncateString } from "@utils/truncateString";
import { useSpring, animated, easings } from "@react-spring/web";

// Assets
import CryptoGreenIcon from "@assets/icons/cryptoGreen.svg";
import CryptoRedIcon from "@assets/icons/cryptoRed.svg";
import CryptoYellowIcon from "@assets/icons/cryptoYellow.svg";
import CryptoGreyIcon from "@assets/icons/cryptoGrey.svg";

// Types
import type {
  TrueVolumeTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
} from "@app/types";
import DecimalFormatter from "@/utils/decimalFormatter";

// Components
import FourColumnGrid from "@/grids/fourColumnGrid";
import ChartDataToggles from "@components/toggles/chart_data";
import { numFormatter } from "@/utils/numFormatter";
import GoodToBadColors from "@/utils/goodToBadColors";
import VolumeTableChart from "../charts/volumeTableChart";

interface LeaderBoardTypes {
  showTimeframeToggles?: boolean;
  leaderboardData: {
    trueVolume: {
      oneDay: TrueVolumeTypes[];
      sevenDay: TrueVolumeTypes[];
      thirtyDay: TrueVolumeTypes[];
      ninetyDay: TrueVolumeTypes[];
      all: TrueVolumeTypes[];
    };
    fakeVolume: {
      oneDay: FakeVolumeTypes[];
      sevenDay: FakeVolumeTypes[];
      thirtyDay: FakeVolumeTypes[];
      ninetyDay: FakeVolumeTypes[];
      all: FakeVolumeTypes[];
    };
    loanVolume: {
      oneDay: LoanVolumeTypes[];
      sevenDay: LoanVolumeTypes[];
      thirtyDay: LoanVolumeTypes[];
      ninetyDay: LoanVolumeTypes[];
      all: LoanVolumeTypes[];
    };
    royalty: {
      oneDay: RoyaltyTypes[];
      sevenDay: RoyaltyTypes[];
      thirtyDay: RoyaltyTypes[];
      ninetyDay: RoyaltyTypes[];
      all: RoyaltyTypes[];
    };
  };
}

const Leaderboard: React.FC<LeaderBoardTypes> = ({
  showTimeframeToggles = false,
  leaderboardData,
}) => {
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 750,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  // Daily True
  const [trueVolumeDataArray, setTrueVolumeDataArray] = useState<any[]>(
    leaderboardData.trueVolume.thirtyDay
  );
  const [loanVolumeDataArray, setLoanVolumeDataArray] = useState<any[]>(
    leaderboardData.loanVolume.thirtyDay
  );
  const [fakeVolumeDataArray, setFakeVolumeDataArray] = useState<any[]>(
    leaderboardData.fakeVolume.thirtyDay
  );
  const [revenueDataArray, setRevenueVolumeDataArray] = useState<any[]>(
    leaderboardData.royalty.thirtyDay
  );

  const [timeframe, setTimeframe] = useState(1);
  useEffect(() => {
    if (timeframe === 90) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.ninetyDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.ninetyDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.ninetyDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.ninetyDay);
    }
    if (timeframe === 30) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.thirtyDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.thirtyDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.thirtyDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.thirtyDay);
    }
    if (timeframe === 7) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.sevenDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.sevenDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.sevenDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.sevenDay);
    }

    if (timeframe === 1) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.oneDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.oneDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.oneDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.oneDay);
    }

    if (timeframe === 0) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.all);
      setLoanVolumeDataArray(leaderboardData.loanVolume.all);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.all);
      setRevenueVolumeDataArray(leaderboardData.royalty.all);
    }
  }, [timeframe]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

  return (
    <>
      {showTimeframeToggles && (
        <animated.div
          style={{ ...springs1 }}
          className="chart__grid chart__grid--one-col"
        >
          <div className="chart__chart-actions-lockup">
            <ChartDataToggles
              title="Leaderboard"
              onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
              active={timeframe}
            />
          </div>
        </animated.div>
      )}
      <FourColumnGrid
        gridHeading={!showTimeframeToggles ? "Leaderboards" : ""}
        column1={{
          content: (
            <VolumeTableChart
              title="True Volume"
              valueTitle="% Of Total"
              color="accent-green"
              col1data={trueVolumeDataArray.map(({ name }) => {
                return (
                  <tr key={name}>
                    <td height="30" valign="top">
                      <p className="typography__display--2">
                        {truncateString(name, 20)}
                      </p>
                    </td>
                  </tr>
                );
              })}
              col2data={trueVolumeDataArray.map(
                ({ total_real_day_volume }, index) => {
                  return (
                    <tr key={index + total_real_day_volume}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoGreenIcon} alt="Crypto Icon" />
                          <p className="typography__display--2 typography__color--accent-green">
                            {numFormatter(
                              DecimalFormatter(total_real_day_volume)
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
              col3data={trueVolumeDataArray.map(
                ({ total_real_day_volume_percentage }, index: number) => {
                  return (
                    <tr key={index + total_real_day_volume_percentage}>
                      <td height="30" valign="top" align="right">
                        {total_real_day_volume_percentage ? (
                          <p className="typography__display--2">
                            {DecimalFormatter(total_real_day_volume_percentage)}
                            %
                          </p>
                        ) : (
                          <p className="typography__display--2 typography__color--grey">
                            --
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            />
          ),
        }}
        column2={{
          content: (
            <VolumeTableChart
              title="Fake Volume"
              valueTitle="% Of Total"
              color="accent-red"
              col1data={fakeVolumeDataArray.map(({ name }) => {
                return (
                  <tr key={name}>
                    <td height="30" valign="top">
                      <p className="typography__display--2">
                        {truncateString(name, 20)}
                      </p>
                    </td>
                  </tr>
                );
              })}
              col2data={fakeVolumeDataArray.map(
                ({ total_day_volume_fake }, index: number) => {
                  return (
                    <tr key={index + total_day_volume_fake}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoRedIcon} alt="Crypto Icon" />
                          <p className="typography__display--2 typography__color--accent-red">
                            {numFormatter(
                              DecimalFormatter(total_day_volume_fake)
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
              col3data={fakeVolumeDataArray.map(
                ({ total_fake_day_volume_percentage }, index: number) => {
                  return (
                    <tr key={index + total_fake_day_volume_percentage}>
                      <td height="30" valign="top" align="right">
                        {total_fake_day_volume_percentage ? (
                          <p className="typography__display--2">
                            {DecimalFormatter(total_fake_day_volume_percentage)}
                            %
                          </p>
                        ) : (
                          <p className="typography__display--2 typography__color--grey">
                            --
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            />
          ),
        }}
        column3={{
          content: (
            <VolumeTableChart
              title="Loan Volume"
              valueTitle="New Loans"
              color="accent-yellow"
              col1data={loanVolumeDataArray.map(({ name }) => {
                return (
                  <tr key={name}>
                    <td height="30" valign="top">
                      <p className="typography__display--2">
                        {truncateString(name, 20)}
                      </p>
                    </td>
                  </tr>
                );
              })}
              col2data={loanVolumeDataArray.map(
                ({ total_day_volume_loan }, index: number) => {
                  return (
                    <tr key={index + total_day_volume_loan}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoYellowIcon} alt="Crypto Icon" />
                          <p className="typography__display--2 typography__color--accent-yellow">
                            {numFormatter(
                              DecimalFormatter(total_day_volume_loan)
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            />
          ),
        }}
        column4={{
          content: (
            <VolumeTableChart
              title="Revenue Volume"
              valueTitle="Earnings"
              color="light-grey-1"
              col1data={revenueDataArray.map(({ name }) => {
                return (
                  <tr key={name}>
                    <td height="30" valign="top">
                      <p className="typography__display--2">
                        {truncateString(name, 25)}
                      </p>
                    </td>
                  </tr>
                );
              })}
              col2data={revenueDataArray.map(
                ({ total_day_total_royalty }, index: number) => {
                  return (
                    <tr key={index + total_day_total_royalty}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoGreyIcon} alt="Crypto Icon" />
                          <p className="typography__display--2">
                            {numFormatter(
                              DecimalFormatter(total_day_total_royalty)
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            />
          ),
        }}
      />
    </>
  );
};

export default Leaderboard;
