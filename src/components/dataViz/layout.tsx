"use client";
import { useEffect, useState } from "react";
import ExpandedView from "@components/dataViz/expandedView";
import CompactView from "@components/dataViz/compactView";
import ChartDataToggles from "@components/toggles/chart_data";
import DailyTrueVolumeChart from "@components/charts/dailyTrueVolume";
import Leaderboards from "@components/leaderboards/leaderboards";

import TrueVolumeBarChart from "@components/charts/trueVolumeBar";
import { RingProgress, Text } from "@mantine/core";
import { kFormatter } from "@utils/kFormatter";

// Utils
import { useSpring, animated } from "@react-spring/web";

// Types
import type {
  DatasetsType,
  TrueVolumeTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
} from "@/app/types";
interface DataVizLayoutTypes {
  labels: string[];
  trueVolume: any[];
  loanVolume: any[];
  totalVolume: any[];
  fakeVolume: any[];
  realPercentDifference: number[];
  leaderboardDatasets: DatasetsType[];
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: {
    true_volume: TrueVolumeTypes[];
    fake_volume: FakeVolumeTypes[];
    loan_volume: LoanVolumeTypes[];
  };
}

const DataVizLayout: React.FC<DataVizLayoutTypes> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  realPercentDifference,
  totalVolume,
  leaderboardDatasets,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
  trueVolumeMovingAverage,
  leaderboard,
}) => {
  // Animations
  const springs = useSpring({
    from: { y: 1000 },
    to: { y: 0 },
  });

  const [toggleView, setToggleView] = useState(true);
  const [timespan, setTimespan] = useState(-30);

  function handleDailyTrueVolumeTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimespan(value);
  }
  // function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
  //   e.preventDefault();
  //   setTimespan(value);
  // }

  // Daily True
  const [dailyTrueVolumeLabels, setDailyTrueVolumeLabels] = useState(
    labels.slice(labels.length - 30).map((data: any) => data)
  );
  const [dailyTrueVolumeDataArray, setDailyTrueVolumeDataArray] = useState(
    trueVolume.slice(trueVolume.length - 30)
  );
  const [dailyLoanVolumeDataArray, setDailyLoanVolumeDataArray] = useState(
    loanVolume.slice(loanVolume.length - 30)
  );
  const [dailyFakeVolumeDataArray, setDailyFakeVolumeDataArray] = useState(
    fakeVolume.slice(fakeVolume.length - 30)
  );
  useEffect(() => {
    if (timespan === -30) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 30));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (timespan === -7) {
      setDailyFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
      setDailyLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
      setDailyTrueVolumeDataArray(trueVolume.slice(trueVolume.length - 7));
      setDailyTrueVolumeLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }

    if (timespan === null) {
      setDailyFakeVolumeDataArray(fakeVolume);
      setDailyLoanVolumeDataArray(loanVolume);
      setDailyTrueVolumeDataArray(trueVolume);
      setDailyTrueVolumeLabels(labels);
    }
  }, [timespan]);

  const trendlineTrueVolumeArray = trueVolume.slice(trueVolume.length - 30);

  const renderTrueTotalPercentage = () => {
    const trueV: any = trueVolume[trueVolume.length - 1];
    const totalV: any = totalVolume[totalVolume.length - 1];
    return (trueV / totalV).toFixed(0);
  };
  const trendlineVolumeLabels = labels
    .slice(labels.length - 30)
    .map((data: any) => data);

  const [showLeaderboard, setShowLeaderboard] = useState(true);
  // useEffect(() => {
  //   setShowLeaderboard(false);
  //   setTimeout(() => {
  //     setShowLeaderboard(true);
  //   }, 350);
  // }, [toggleView]);
  return (
    <>
      <div className="content">
        <section className="chart__wrapper">
          <button
            onClick={() => setToggleView(!toggleView)}
            style={{
              width: 100,
              color: "white",
              border: "1px solid white",
              background: "black",
              position: "absolute",
              top: 10,
              padding: 10,
              right: 10,
              zIndex: 10,
              cursor: "pointer",
            }}
          >
            Toggle View
          </button>
          <div className="chart__grid">
            {/* <animated.div
              style={{ ...springs }}
              className={`${
                toggleView ? "chart__grid-cell" : "chart__grid-cell--full"
              }`}
            >
              <div className="chart__container">
                <ChartDataToggles
                  onClick={(arg1, arg2) =>
                    handleDailyTrueVolumeTimeferame(arg1, arg2)
                  }
                />

                <DailyTrueVolumeChart
                  labels={dailyTrueVolumeLabels}
                  data={{
                    true_volume: dailyTrueVolumeDataArray,
                    loan_volume: dailyLoanVolumeDataArray,
                    fake_volume: dailyFakeVolumeDataArray,
                  }}
                />
              </div>
            </animated.div> */}

            <animated.div
              style={{ ...springs }}
              className="chart__grid-cell--full"
            >
              <div className="chart__grid chart__grid--gap">
                {/* <animated.div
                  style={{ ...springs }}
                  className={`chart__grid-cell chart__grid-cell--${
                    toggleView ? "quarter" : "full"
                  }`}
                >
                  <div className="chart__container">
                    <div className="chart__info">
                      <div className="chart__progress-ring">
                        <p className="typography__label--2">
                          <RingProgress
                            size={110}
                            thickness={10}
                            classNames={{
                              root: "progress-ring__root",
                            }}
                            sections={[
                              {
                                value: parseInt(renderTrueTotalPercentage()),
                                color: "rgba(250, 82, 82, 1)",
                              },
                            ]}
                            label={
                              <Text
                                color="white"
                                weight={700}
                                align="center"
                                size="xl"
                              >
                                {parseInt(renderTrueTotalPercentage())}%
                              </Text>
                            }
                          />
                        </p>
                      </div>
                      <div>
                        <p className="typography__label--2">{`${kFormatter(
                          realPercentDifference[
                            realPercentDifference.length - 1
                          ]
                        )}k`}</p>
                        <h3 className="typography__label--1">True Volume</h3>
                        <p className="typography__paragraph--1">
                          Excludes fake/artificial volume such as loans, points
                          farming and wash trading.
                        </p>
                      </div>
                    </div>

                    <TrueVolumeBarChart
                      labels={trendlineVolumeLabels}
                      data={{ true_volume: trendlineTrueVolumeArray }}
                      trend_timespan={-30}
                    />
                  </div>
                </animated.div> */}

                {toggleView && (
                  <animated.div
                    style={{ ...springs }}
                    className="chart__grid-cell chart__grid-cell--full"
                  >
                    <CompactView
                      toggleView={toggleView}
                      labels={labels}
                      trueVolume={trueVolume}
                      totalVolume={totalVolume}
                      fakeVolume={fakeVolume}
                      realPercentDifference={realPercentDifference}
                      loanVolume={loanVolume}
                      leaderboardDatasets={leaderboardDatasets}
                      loanVolumeMovingAverage={loanVolumeMovingAverage}
                      fakeVolumeMovingAverage={fakeVolumeMovingAverage}
                      totalVolumeMovingAverage={totalVolumeMovingAverage}
                      trueVolumeMovingAverage={trueVolumeMovingAverage}
                      leaderboard={{
                        true_volume: leaderboard.true_volume,
                        fake_volume: leaderboard.fake_volume,
                        loan_volume: leaderboard.loan_volume,
                      }}
                    />
                  </animated.div>
                )}
              </div>
            </animated.div>
            {!toggleView && (
              <ExpandedView
                labels={labels}
                trueVolume={trueVolume}
                totalVolume={totalVolume}
                fakeVolume={fakeVolume}
                realPercentDifference={realPercentDifference}
                loanVolume={loanVolume}
                leaderboardDatasets={leaderboardDatasets}
                loanVolumeMovingAverage={loanVolumeMovingAverage}
                fakeVolumeMovingAverage={fakeVolumeMovingAverage}
                totalVolumeMovingAverage={totalVolumeMovingAverage}
                trueVolumeMovingAverage={trueVolumeMovingAverage}
                leaderboard={{
                  true_volume: leaderboard.true_volume,
                  fake_volume: leaderboard.fake_volume,
                  loan_volume: leaderboard.loan_volume,
                }}
              />
            )}
            {/* Row 2 */}
            {/* {showLeaderboard && (
              <Leaderboards
                collection_names={leaderboard.names.slice(0, 5)}
                true_volume={leaderboard.true_volumes.slice(0, 5)}
                true_volume_percentage={leaderboard.true_volume_percentage.slice(
                  0,
                  5
                )}
                loan_volume={leaderboard.loan_volume.slice(0, 5)}
                revenue={leaderboard.revenue.slice(0, 5)}
                fake_volume={leaderboard.fake_volume.slice(0, 5)}
                fake_volume_percentage={leaderboard.fake_volume_percentage.slice(
                  0,
                  5
                )}
              />
            )} */}
          </div>
        </section>
      </div>
    </>
  );
};
export default DataVizLayout;
