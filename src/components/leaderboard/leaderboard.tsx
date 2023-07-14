"use client";
import { useEffect, useState } from "react";

// Utils
import Image from "next/image";
import { truncateString } from "@utils/truncateString";
import { useSpring, animated, easings } from "@react-spring/web";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";

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
import { kFormatter } from "@/utils/kFormatter";
import GoodToBadColors from "@/utils/goodToBadColors";

interface LeaderBoardTypes {
  showTimeframeToggles?: boolean;
  trueVolume: TrueVolumeTypes[];
  fakeVolume: FakeVolumeTypes[];
  loanVolume: LoanVolumeTypes[];
  royalty: RoyaltyTypes[];
}

const Leaderboard: React.FC<LeaderBoardTypes> = ({
  showTimeframeToggles = false,
  trueVolume,
  fakeVolume,
  loanVolume,
  royalty,
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

  // Daily True
  const [trueVolumeDataArray, setTrueVolumeDataArray] = useState(
    trueVolume.slice(trueVolume.length - 90)
  );
  const [loanVolumeDataArray, setLoanVolumeDataArray] = useState(
    loanVolume.slice(loanVolume.length - 90)
  );
  const [fakeVolumeDataArray, setFakeVolumeDataArray] = useState(
    fakeVolume.slice(fakeVolume.length - 90)
  );
  const [revenueDataArray, setRevenueVolumeDataArray] = useState(
    royalty.slice(royalty.length - 90)
  );

  const [timeframe, setTimeframe] = useState(90);
  useEffect(() => {
    if (timeframe === 90) {
      setFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 90));
      setLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 90));
      setTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 90));
      setRevenueVolumeDataArray(royalty.slice(royalty.length - 90));
    }
    if (timeframe === 30) {
      setFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
      setRevenueVolumeDataArray(royalty.slice(royalty.length - 30));
    }
    if (timeframe === 7) {
      setFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
      setLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
      setTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 7));
      setRevenueVolumeDataArray(royalty.slice(royalty.length - 7));
    }

    if (timeframe === 1) {
      setFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 1));
      setLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 1));
      setTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 1));
      setRevenueVolumeDataArray(royalty.slice(royalty.length - 1));
    }

    if (timeframe === 0) {
      setFakeVolumeDataArray(fakeVolume);
      setLoanVolumeDataArray(loanVolume);
      setTrueVolumeDataArray(trueVolume);
      setRevenueVolumeDataArray(royalty);
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
              title="Top 100 Collections"
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
            <>
              <p className="typography__label--4">True Volume</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "60%", maxWidth: "60%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {trueVolumeDataArray.map(({ name }) => {
                      return (
                        <tr key={name}>
                          <td height="30" valign="top">
                            <p className="typography__display--2 ">
                              {truncateString(name, 20)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {trueVolumeDataArray.map(
                      ({ total_real_day_volume }, index) => {
                        return (
                          <tr key={index + total_real_day_volume}>
                            <td height="30" valign="top" align="right">
                              <div className="leaderboard__data-cell">
                                <Image src={CryptoIcon} alt="Crypto Icon" />
                                <p className="typography__display--2">
                                  {kFormatter(
                                    DecimalFormatter(total_real_day_volume)
                                  )}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {trueVolumeDataArray.map(
                      ({ total_real_day_volume_percentage }, index: number) => {
                        return (
                          <tr key={index + total_real_day_volume_percentage}>
                            <td height="30" valign="top" align="right">
                              {total_real_day_volume_percentage ? (
                                <p
                                  className="typography__display--2"
                                  style={{
                                    color: GoodToBadColors(
                                      total_real_day_volume_percentage
                                    ),
                                  }}
                                >
                                  {DecimalFormatter(
                                    total_real_day_volume_percentage
                                  )}
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
                  </table>
                </div>
              </div>
            </>
          ),
        }}
        column2={{
          content: (
            <>
              <p className="typography__label--4">Fake Volume</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "60%", maxWidth: "60%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {fakeVolumeDataArray.map(({ name }) => {
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
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {fakeVolumeDataArray.map(
                      ({ total_day_volume_fake }, index: number) => {
                        return (
                          <tr key={index + total_day_volume_fake}>
                            <td height="30" valign="top" align="right">
                              <div className="leaderboard__data-cell">
                                <Image src={CryptoIcon} alt="Crypto Icon" />
                                <p className="typography__display--2">
                                  {kFormatter(
                                    DecimalFormatter(total_day_volume_fake)
                                  )}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {fakeVolumeDataArray.map(
                      ({ total_fake_day_volume_percentage }, index: number) => {
                        return (
                          <tr key={index + total_fake_day_volume_percentage}>
                            <td height="30" valign="top" align="right">
                              {total_fake_day_volume_percentage ? (
                                <p
                                  className="typography__display--2"
                                  style={{
                                    color: GoodToBadColors(
                                      total_fake_day_volume_percentage
                                    ),
                                  }}
                                >
                                  {DecimalFormatter(
                                    total_fake_day_volume_percentage
                                  )}
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
                  </table>
                </div>
              </div>
            </>
          ),
        }}
        column3={{
          content: (
            <>
              <p className="typography__label--4">Loans</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "75%", maxWidth: "75%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {loanVolumeDataArray.map(({ name }) => {
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
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {loanVolumeDataArray.map(
                      ({ total_day_volume_loan }, index: number) => {
                        return (
                          <tr key={index + total_day_volume_loan}>
                            <td height="30" valign="top" align="right">
                              <div className="leaderboard__data-cell">
                                <Image src={CryptoIcon} alt="Crypto Icon" />
                                <p className="typography__display--2">
                                  {kFormatter(
                                    DecimalFormatter(total_day_volume_loan)
                                  )}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </table>
                </div>
              </div>
            </>
          ),
        }}
        column4={{
          content: (
            <>
              <p className="typography__label--4">Revenue</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "75%", maxWidth: "75%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {revenueDataArray.map(({ name }) => {
                      return (
                        <tr key={name}>
                          <td height="30" valign="top">
                            <p className="typography__display--2">
                              {truncateString(name, 40)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {revenueDataArray.map(
                      ({ total_day_total_royalty }, index: number) => {
                        return (
                          <tr key={index + total_day_total_royalty}>
                            <td height="30" valign="top" align="right">
                              <div className="leaderboard__data-cell">
                                <Image src={CryptoIcon} alt="Crypto Icon" />
                                <p className="typography__display--2">
                                  {kFormatter(
                                    DecimalFormatter(total_day_total_royalty)
                                  )}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </table>
                </div>
              </div>
            </>
          ),
        }}
      />
    </>
  );
};

export default Leaderboard;
