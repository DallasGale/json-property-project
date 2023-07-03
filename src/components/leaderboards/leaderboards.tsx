import { truncateString } from "@/utils/truncateString";
interface LeaderBoardTypes {
  collection_names: string[];
  true_volume: number[];
  true_volume_percentage: number[];
  loan_volume: number[];
}

const Leaderboards: React.FC<LeaderBoardTypes> = ({
  collection_names,
  true_volume,
  true_volume_percentage,
  loan_volume,
}) => {
  return (
    <section className="chart__wrapper">
      <div className="chart__grid">
        <div className="chart__grid-cell--full">
          <h2 className="typography__display--1">Leaderboards</h2>

          <div className="chart__grid">
            <div className="chart__container chart__container--quarter u-justifyStart">
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
            </div>
            <div className="chart__container chart__container--quarter"></div>
            <div className="chart__container chart__container--quarter u-justifyStart">
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
            </div>
            <div className="chart__container chart__container--quarter"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboards;
