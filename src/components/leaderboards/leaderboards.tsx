// Utils
import { truncateString } from "@/utils/truncateString";
import { useSpring, animated, easings } from "@react-spring/web";
interface LeaderBoardTypes {
  collection_names: string[];
  true_volume: number[];
  true_volume_percentage: number[];
  loan_volume: number[];
  revenue: number[];
  fake_volume: number[];
  fake_volume_percentage: number[];
}

const Leaderboards: React.FC<LeaderBoardTypes> = ({
  collection_names,
  true_volume,
  true_volume_percentage,
  loan_volume,
  revenue,
  fake_volume,
  fake_volume_percentage,
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
  return (
    <section className="chart__wrapper">
      <div className="chart__grid">
        <div className="chart__grid-cell--full">
          <h2 className="typography__display--1">Leaderboards</h2>

          <div className="chart__grid">
            <animated.div
              style={{ ...springs1 }}
              className="chart__container chart__container--quarter u-justifyStart"
            >
              <p className="typography__label--4">True Volume</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "50%", maxWidth: "50%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {collection_names.map((label: string) => {
                      return (
                        <tr key={label}>
                          <td height="30" valign="top">
                            <p className="typography__display--2 typography__color--white">
                              {truncateString(label, 20)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {true_volume.map((volume: number, index: number) => {
                      return (
                        <tr key={index + volume}>
                          <td height="30" valign="top" align="right">
                            <p className="typography__display--2">
                              {volume.toFixed(2)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {true_volume_percentage.map(
                      (percent: number, index: number) => {
                        return (
                          <tr key={index + percent}>
                            <td height="30" valign="top" align="right">
                              <p className="typography__display--2 typography__color--green">
                                {percent}%
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
              style={{ ...springs2 }}
              className="chart__container chart__container--quarter u-justifyStart"
            >
              <p className="typography__label--4">Fake Volume</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "50%", maxWidth: "50%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {collection_names.map((label: string) => {
                      return (
                        <tr key={label}>
                          <td height="30" valign="top">
                            <p className="typography__display--2 typography__color--white">
                              {truncateString(label, 20)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {fake_volume.map((volume: number, index: number) => {
                      return (
                        <tr key={index + volume}>
                          <td height="30" valign="top" align="right">
                            <p className="typography__display--2">
                              {volume.toFixed(2)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {fake_volume_percentage.map(
                      (percent: number, index: number) => {
                        return (
                          <tr key={index + percent}>
                            <td height="30" valign="top" align="right">
                              <p className="typography__display--2 typography__color--red">
                                {percent}%
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
              <p className="typography__label--4">Loans</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "75%", maxWidth: "75%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {collection_names.map((label: string) => {
                      return (
                        <tr key={label}>
                          <td height="30" valign="top">
                            <p className="typography__display--2 typography__color--white">
                              {truncateString(label, 20)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {loan_volume.map((volume: number, index: number) => {
                      return (
                        <tr key={index + volume}>
                          <td height="30" valign="top" align="right">
                            <p className="typography__display--2">
                              {volume.toFixed(2)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </animated.div>
            <animated.div
              style={{ ...springs4 }}
              className="chart__container chart__container--quarter u-justifyStart"
            >
              <p className="typography__label--4">Revenue</p>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <div style={{ flex: "1", minWidth: "75%", maxWidth: "75%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {collection_names.map((label: string) => {
                      return (
                        <tr key={label}>
                          <td height="30" valign="top">
                            <p className="typography__display--2 typography__color--white">
                              {truncateString(label, 20)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ flex: "1", minWidth: "25%", maxWidth: "25%" }}>
                  <table cellPadding={0} cellSpacing={0} width="100%">
                    {revenue.map((amount: number, index: number) => {
                      return (
                        <tr key={index + amount}>
                          <td height="30" valign="top" align="right">
                            <p className="typography__display--2">
                              {amount.toFixed(2)}
                            </p>
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
    </section>
  );
};

export default Leaderboards;
