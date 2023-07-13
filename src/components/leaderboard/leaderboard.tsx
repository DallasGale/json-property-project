// Utils
import Image from "next/image";
import { truncateString } from "@utils/truncateString";

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

interface LeaderBoardTypes {
  trueVolume: TrueVolumeTypes[];
  fakeVolume: FakeVolumeTypes[];
  loanVolume: LoanVolumeTypes[];
  royalty: RoyaltyTypes[];
}

const Leaderboard: React.FC<LeaderBoardTypes> = ({
  trueVolume,
  fakeVolume,
  loanVolume,
  royalty,
}) => {
  return (
    <FourColumnGrid
      gridHeading="Leaderboards"
      column1={{
        content: (
          <>
            <p className="typography__label--4">True Volume</p>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <div style={{ flex: "1", minWidth: "60%", maxWidth: "60%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {trueVolume.map(({ name }) => {
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
                  {trueVolume.map(({ total_real_day_volume }, index) => {
                    return (
                      <tr key={index + total_real_day_volume}>
                        <td height="30" valign="top" align="right">
                          <div className="leaderboard__data-cell">
                            <Image src={CryptoIcon} alt="Crypto Icon" />
                            <p className="typography__display--2">
                              {DecimalFormatter(total_real_day_volume)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div style={{ flex: "1", minWidth: "20%", maxWidth: "20%" }}>
                <table cellPadding={0} cellSpacing={0} width="100%">
                  {trueVolume.map(
                    ({ total_real_day_volume_percentage }, index: number) => {
                      return (
                        <tr key={index + total_real_day_volume_percentage}>
                          <td height="30" valign="top" align="right">
                            {total_real_day_volume_percentage ? (
                              <p className="typography__display--2 typography__color--green">
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
                  {fakeVolume.map(({ name }) => {
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
                  {fakeVolume.map(
                    ({ total_day_volume_fake }, index: number) => {
                      return (
                        <tr key={index + total_day_volume_fake}>
                          <td height="30" valign="top" align="right">
                            <div className="leaderboard__data-cell">
                              <Image src={CryptoIcon} alt="Crypto Icon" />
                              <p className="typography__display--2">
                                {DecimalFormatter(total_day_volume_fake)}
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
                  {fakeVolume.map(
                    ({ total_fake_day_volume_percentage }, index: number) => {
                      return (
                        <tr key={index + total_fake_day_volume_percentage}>
                          <td height="30" valign="top" align="right">
                            {total_fake_day_volume_percentage ? (
                              <p className="typography__display--2 typography__color--red">
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
                  {loanVolume.map(({ name }) => {
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
                  {loanVolume.map(
                    ({ total_day_volume_loan }, index: number) => {
                      return (
                        <tr key={index + total_day_volume_loan}>
                          <td height="30" valign="top" align="right">
                            <div className="leaderboard__data-cell">
                              <Image src={CryptoIcon} alt="Crypto Icon" />
                              <p className="typography__display--2">
                                {DecimalFormatter(total_day_volume_loan)}
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
                  {royalty.map(({ name }) => {
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
                  {royalty.map(({ total_day_total_royalty }, index: number) => {
                    return (
                      <tr key={index + total_day_total_royalty}>
                        <td height="30" valign="top" align="right">
                          <div className="leaderboard__data-cell">
                            <Image src={CryptoIcon} alt="Crypto Icon" />
                            <p className="typography__display--2">
                              {DecimalFormatter(total_day_total_royalty)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </>
        ),
      }}
    />
  );
};

export default Leaderboard;
