import type { DatasetsType } from "@/app/types";

interface LeaderBoardTypes {
  labels: DatasetsType[];
  true_volume: DatasetsType[];
  loans: DatasetsType[];
}

const Leaderboards: React.FC<LeaderBoardTypes> = ({
  labels,
  true_volume,
  loans,
}) => {
  return (
    <section className="chart__wrapper">
      <div className="chart__grid">
        <div className="chart__grid-cell--full">
          <h2 className="typography__display--1">Leaderboards</h2>

          <div className="chart__grid">
            <div className="chart__container chart__container--quarter">
              <table width="100%">
                <thead>
                  <p className="typography__label--4">True Volume</p>
                </thead>
                <tbody>
                  {true_volume.map((data: any) => {
                    console.log({ data });

                    return (
                      <tr key={data?.label}>
                        <td>
                          <p className="typography__display--2 typography__color--white">
                            {data?.label}
                          </p>
                        </td>
                        <td>
                          <p className="typography__label--3">
                            {data?.data.number}
                          </p>
                        </td>
                        <td>
                          <p className="typography__label--3 typography__color--green">
                            {data?.data.percent}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="chart__container chart__container--quarter"></div>
            <div className="chart__container chart__container--quarter">
              <table width="100%">
                <thead>
                  <p className="typography__label--4">Loans</p>
                </thead>
                <tbody>
                  {loans.map((data: any) => {
                    console.log({ data });
                    // const loanNumber = data?.fil

                    // return (
                    //   <tr key={data?.label}>
                    //     <td>
                    //       <p className="typography__display--2 typography__color--white">
                    //         {data?.label}
                    //       </p>
                    //     </td>
                    //     <td>
                    //       <p className="typography__label--3">
                    //         {data?.data.number}
                    //       </p>
                    //     </td>
                    //     <td>
                    //       <p className="typography__label--3 typography__color--green">
                    //         {data?.data.percent}
                    //       </p>
                    //     </td>
                    //   </tr>
                    // );
                  })}
                </tbody>
              </table>
            </div>
            <div className="chart__container chart__container--quarter"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboards;
