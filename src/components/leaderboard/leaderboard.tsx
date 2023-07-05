// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import Image from "next/image";
import { truncateString } from "@utils/truncateString";
import { kFormatter } from "@utils/kFormatter";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";

// Types
import type {
  TrueVolumeTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
} from "@app/types";

interface LeaderBoardTypes {
  true_volume: TrueVolumeTypes[];
  fake_volume: FakeVolumeTypes[];
  loan_volume: LoanVolumeTypes[];
  royalty: RoyaltyTypes[];
}

const Leaderboard: React.FC<LeaderBoardTypes> = ({
  true_volume,
  fake_volume,
  loan_volume,
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
  const springs2 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 150,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs3 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 300,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs4 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 450,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs5 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 600,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  return (
    <div className="chart__grid">
      <div className="chart__grid-cell--full">
        <animated.h2 style={{ ...springs1 }} className="typography__display--1">
          Leaderboards
        </animated.h2>

        <div className="chart__grid chart__grid--leaderboard">
          <animated.div
            style={{ ...springs2 }}
            className="chart__container chart__container--quarter u-justifyStart"
          >
            <p className="typography__label--4">True Volume</p>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ flex: "1", minWidth: "50%", maxWidth: "50%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {true_volume.map(({ name }) => {
                    return (
                      <tr key={name}>
                        <td height="30" valign="top">
                          <p className="typography__display--2 typography__color--white">
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
                  {true_volume.map(({ total_real_day_volume }, index) => {
                    return (
                      <tr key={index + total_real_day_volume}>
                        <td height="30" valign="top" align="right">
                          <div className="leaderboard__data-cell">
                            <Image src={CryptoIcon} alt="Crypto Icon" />
                            <p className="typography__display--2">
                              {total_real_day_volume.toFixed(2)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {true_volume.map(
                    ({ total_real_day_volume_percentage }, index: number) => {
                      return (
                        <tr key={index + total_real_day_volume_percentage}>
                          <td height="30" valign="top" align="right">
                            <p className="typography__display--2 typography__color--green">
                              {total_real_day_volume_percentage.toFixed(2)}%
                            </p>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </table>
              </div>
            </div>
          </animated.div>
          <animated.div
            style={{ ...springs3 }}
            className="chart__container chart__container--quarter u-justifyStart"
          >
            <p className="typography__label--4">Fake Volume</p>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ flex: "1", minWidth: "50%", maxWidth: "50%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {fake_volume.map(({ name }) => {
                    return (
                      <tr key={name}>
                        <td height="30" valign="top">
                          <p className="typography__display--2 typography__color--white">
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
                  {fake_volume.map(
                    ({ total_day_volume_fake }, index: number) => {
                      return (
                        <tr key={index + total_day_volume_fake}>
                          <td height="30" valign="top" align="right">
                            <div className="leaderboard__data-cell">
                              <Image src={CryptoIcon} alt="Crypto Icon" />
                              <p className="typography__display--2">
                                {total_day_volume_fake.toFixed(2)}
                              </p>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </table>
              </div>
              <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {fake_volume.map(
                    ({ total_fake_day_volume_percentage }, index: number) => {
                      return (
                        <tr key={index + total_fake_day_volume_percentage}>
                          <td height="30" valign="top" align="right">
                            <p className="typography__display--2 typography__color--red">
                              {total_fake_day_volume_percentage.toFixed(2)}%
                            </p>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </table>
              </div>
            </div>
          </animated.div>
          <animated.div
            style={{ ...springs4 }}
            className="chart__container chart__container--quarter u-justifyStart"
          >
            <p className="typography__label--4">Loans</p>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ flex: "1", minWidth: "75%", maxWidth: "75%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {loan_volume.map(({ name }) => {
                    return (
                      <tr key={name}>
                        <td height="30" valign="top">
                          <p className="typography__display--2 typography__color--white">
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
                  {loan_volume.map(
                    ({ total_day_volume_loan }, index: number) => {
                      return (
                        <tr key={index + total_day_volume_loan}>
                          <td height="30" valign="top" align="right">
                            <div className="leaderboard__data-cell">
                              <Image src={CryptoIcon} alt="Crypto Icon" />
                              <p className="typography__display--2">
                                {kFormatter(total_day_volume_loan.toFixed(2))}
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
          </animated.div>
          <animated.div
            style={{ ...springs5 }}
            className="chart__container chart__container--quarter u-justifyStart"
          >
            <p className="typography__label--4">Revenue</p>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ flex: "1", minWidth: "75%", maxWidth: "75%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {royalty.map(({ name }) => {
                    return (
                      <tr key={name}>
                        <td height="30" valign="top">
                          <p className="typography__display--2 typography__color--white">
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
                  {royalty.map(({ total_day_total_royalty }, index: number) => {
                    return (
                      <tr key={index + total_day_total_royalty}>
                        <td height="30" valign="top" align="right">
                          <div className="leaderboard__data-cell">
                            <Image src={CryptoIcon} alt="Crypto Icon" />
                            <p className="typography__display--2">
                              {total_day_total_royalty.toFixed(2)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
