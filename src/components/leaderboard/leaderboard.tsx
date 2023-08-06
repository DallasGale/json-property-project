"use client";
import { useEffect, useState } from "react";

// Utils
import Image from "next/image";
import { truncateString } from "@utils/truncateString";
import { useSpring, animated, easings } from "@react-spring/web";
import { VolumeFormatter } from "@utils/volumeFormatter";
import DecimalFormatter from "@utils/decimalFormatter";

// Assets
import CryptoGreenIcon from "@assets/icons/cryptoGreen.svg";
import CryptoRedIcon from "@assets/icons/cryptoRed.svg";
import CryptoYellowIcon from "@assets/icons/cryptoYellow.svg";
import CryptoGreyIcon from "@assets/icons/cryptoGrey.svg";

// Components
import ChartDataToggles from "@components/toggles/chart_data";
import { HoverCard } from "@mantine/core";
import FourColumnGrid from "@/grids/fourColumnGrid";
import VolumeTableChart from "@components/charts/volumeTableChart";
import TooltipBody from "@components/leaderboard/tooltipBody/tooltipBody";
import PercentFormatter from "@utils/percentFormatter";
import { ColumnLabels } from "@/constants/top100table";

// Types
import type { LeaderboarCategoryTypes } from "@app/types";

interface LeaderBoardTypes {
  showTimeframeToggles?: boolean;
  leaderboardData: LeaderboarCategoryTypes;
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
    if (timeframe === 0) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.all);
      setLoanVolumeDataArray(leaderboardData.loanVolume.all);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.all);
      setRevenueVolumeDataArray(leaderboardData.royalty.all);
    }
    if (timeframe === 1) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.oneDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.oneDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.oneDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.oneDay);
    }
    if (timeframe === 7) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.sevenDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.sevenDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.sevenDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.sevenDay);
    }
    if (timeframe === 30) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.thirtyDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.thirtyDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.thirtyDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.thirtyDay);
    }
    if (timeframe === 90) {
      setTrueVolumeDataArray(leaderboardData.trueVolume.ninetyDay);
      setLoanVolumeDataArray(leaderboardData.loanVolume.ninetyDay);
      setFakeVolumeDataArray(leaderboardData.fakeVolume.ninetyDay);
      setRevenueVolumeDataArray(leaderboardData.royalty.ninetyDay);
    }
  }, [timeframe]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }
  const today = new Date();

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
              volumeCategory={ColumnLabels[2].id}
              title="True Volume"
              valueTitle="% Of Total"
              color="accent-green"
              col1data={trueVolumeDataArray.map(
                ({
                  name,
                  total_raw_day_volume,
                  total_real_day_volume,
                  total_day_volume_fake,
                  total_day_volume_loan,
                  total_real_day_volume_percentage,
                  total_fake_day_volume_percentage,
                  total_loan_day_volume_percentage,
                  total_day_total_royalty,
                }) => {
                  return (
                    <tr key={name}>
                      <td height="30" valign="top">
                        <HoverCard
                          width={320}
                          shadow="md"
                          openDelay={300}
                          position="top"
                        >
                          <HoverCard.Target>
                            <p className="typography__body--small u-cursor-pointer">
                              {truncateString(name, 20)}
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
                                total_real_day_volume_percentage
                              }
                              totalFakeVolumePercentage={
                                total_fake_day_volume_percentage
                              }
                              totalLoanVolumePercentage={
                                total_loan_day_volume_percentage
                              }
                            />
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </td>
                    </tr>
                  );
                }
              )}
              col2data={trueVolumeDataArray.map(
                ({ total_real_day_volume }, index) => {
                  return (
                    <tr key={index + total_real_day_volume}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoGreenIcon} alt="Crypto Icon" />
                          <p className="typography__label--large typography__color--accent-green">
                            {VolumeFormatter(
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
                          <p className="typography__body--small typography__color--dark-medium-emphasis">
                            {PercentFormatter(total_real_day_volume_percentage)}
                            %
                          </p>
                        ) : (
                          <p className="typography__body--small typography__color--dark-low-emphasis">
                            —
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
              volumeCategory={ColumnLabels[8].id}
              title="Fake Volume"
              valueTitle="% Of Total"
              color="accent-red"
              col1data={fakeVolumeDataArray.map(
                ({
                  name,
                  total_raw_day_volume,
                  total_real_day_volume,
                  total_day_volume_fake,
                  total_day_volume_loan,
                  total_real_day_volume_percentage,
                  total_fake_day_volume_percentage,
                  total_loan_day_volume_percentage,
                  total_day_total_royalty,
                }) => {
                  return (
                    <tr key={name}>
                      <td height="30" valign="top">
                        <HoverCard
                          width={320}
                          shadow="md"
                          openDelay={300}
                          position="top"
                        >
                          <HoverCard.Target>
                            <p className="typography__body--small u-cursor-pointer">
                              {truncateString(name, 20)}
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
                                total_real_day_volume_percentage
                              }
                              totalFakeVolumePercentage={
                                total_fake_day_volume_percentage
                              }
                              totalLoanVolumePercentage={
                                total_loan_day_volume_percentage
                              }
                            />
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </td>
                    </tr>
                  );
                }
              )}
              col2data={fakeVolumeDataArray.map(
                ({ total_day_volume_fake }, index: number) => {
                  return (
                    <tr key={index + total_day_volume_fake}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoRedIcon} alt="Crypto Icon" />
                          <p className="typography__label--large typography__color--accent-red">
                            {VolumeFormatter(
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
                          <p className="typography__body--small typography__color--dark-medium-emphasis">
                            {PercentFormatter(total_fake_day_volume_percentage)}
                            %
                          </p>
                        ) : (
                          <p className="typography__body--small typography__color--dark-low-emphasis">
                            —
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
              volumeCategory={ColumnLabels[6].id}
              title="Loan Volume"
              valueTitle="% of total"
              color="accent-yellow"
              col1data={loanVolumeDataArray.map(
                ({
                  name,
                  total_raw_day_volume,
                  total_real_day_volume,
                  total_day_volume_fake,
                  total_day_volume_loan,
                  total_real_day_volume_percentage,
                  total_fake_day_volume_percentage,
                  total_loan_day_volume_percentage,
                  total_day_total_royalty,
                }) => {
                  return (
                    <tr key={name}>
                      <td height="30" valign="top">
                        <HoverCard
                          width={320}
                          shadow="md"
                          openDelay={300}
                          position="top"
                        >
                          <HoverCard.Target>
                            <p className="typography__body--small u-cursor-pointer">
                              {truncateString(name, 20)}
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
                                total_real_day_volume_percentage
                              }
                              totalFakeVolumePercentage={
                                total_fake_day_volume_percentage
                              }
                              totalLoanVolumePercentage={
                                total_loan_day_volume_percentage
                              }
                            />
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </td>
                    </tr>
                  );
                }
              )}
              col2data={loanVolumeDataArray.map(
                ({ total_day_volume_loan }, index: number) => {
                  return (
                    <tr key={index + total_day_volume_loan}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoYellowIcon} alt="Crypto Icon" />
                          <p className="typography__label--large typography__color--accent-yellow">
                            {VolumeFormatter(
                              DecimalFormatter(total_day_volume_loan)
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
              col3data={loanVolumeDataArray.map(
                ({ total_loan_day_volume_percentage }, index: number) => {
                  return (
                    <tr key={index + total_loan_day_volume_percentage}>
                      <td height="30" valign="top" align="right">
                        {total_loan_day_volume_percentage ? (
                          <p className="typography__body--small typography__color--dark-medium-emphasis">
                            {PercentFormatter(total_loan_day_volume_percentage)}
                            %
                          </p>
                        ) : (
                          <p className="typography__body--small typography__color--dark-low-emphasis">
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
        column4={{
          content: (
            <VolumeTableChart
              volumeCategory={ColumnLabels[7].id}
              title="Collection Revenue"
              valueTitle="Earnings"
              color="light-grey-1"
              col1data={revenueDataArray.map(
                ({
                  name,
                  total_raw_day_volume,
                  total_real_day_volume,
                  total_day_volume_fake,
                  total_day_volume_loan,
                  total_real_day_volume_percentage,
                  total_fake_day_volume_percentage,
                  total_loan_day_volume_percentage,
                  total_day_total_royalty,
                }) => {
                  return (
                    <tr key={name}>
                      <td height="30" valign="top">
                        <HoverCard
                          width={320}
                          shadow="md"
                          openDelay={300}
                          position="top"
                        >
                          <HoverCard.Target>
                            <p className="typography__body--small u-cursor-pointer">
                              {truncateString(name, 25)}
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
                                total_real_day_volume_percentage
                              }
                              totalFakeVolumePercentage={
                                total_fake_day_volume_percentage
                              }
                              totalLoanVolumePercentage={
                                total_loan_day_volume_percentage
                              }
                            />
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </td>
                    </tr>
                  );
                }
              )}
              col2data={revenueDataArray.map(
                ({ total_day_total_royalty }, index: number) => {
                  return (
                    <tr key={index + total_day_total_royalty}>
                      <td height="30" valign="top" align="right">
                        <div className="leaderboard__data-cell">
                          <Image src={CryptoGreyIcon} alt="Crypto Icon" />
                          <p className="typography__label--large">
                            {VolumeFormatter(
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
