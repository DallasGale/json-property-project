"use client";

import { useState, useEffect } from "react";

// Utils
import { kFormatter } from "@utils/kFormatter";
import annotationPlugin from "chartjs-plugin-annotation";
import chartTrendline from "chartjs-plugin-trendline";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Types
import type { DatasetsType } from "@/app/types";

// Components
import { RingProgress, Text } from "@mantine/core";
import TrueVolumeLineChart from "@components/charts/trueVolumeLine";
import LoanVolumeChart from "@components/charts/loanVolume";
import FakeVolumeChart from "@components/charts/fakeVolume";
import TotalVolumeChart from "@components/charts/totalVolume";
import TrueVolumeBarChart from "@components/charts/trueVolumeBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  chartTrendline
);
interface VolumeChartProps {
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
}
const ExpandedView: React.FC<VolumeChartProps> = ({
  labels,
  trueVolume,
  loanVolume,
  fakeVolume,
  realPercentDifference,
  totalVolume,
  loanVolumeMovingAverage,
  fakeVolumeMovingAverage,
  totalVolumeMovingAverage,
}) => {
  const [timespan, setTimespan] = useState(-30);
  const [trendlineTimespan, setTrendlineTimespan] = useState(-30);

  function handleTrendChartTimeframe(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTrendlineTimespan(value);
  }

  // Trendline
  const [trendlineVolumeLabels, setTrendlineVolumeLabels] = useState(
    labels.slice(labels.length - 30).map((data: any) => data)
  );
  const [trendlineTrueVolumeArray, setTrendlineTrueVolumeArray] = useState(
    trueVolume.slice(trueVolume.length - 30)
  );
  const [trendlineTotalVolumeArray, setTrendlineTotalVolumeArray] = useState(
    totalVolume.slice(totalVolume.length - 30)
  );
  const [trendlineLoanVolumeDataArray, setTrendlineLoanVolumeDataArray] =
    useState(loanVolume.slice(loanVolume.length - 30));
  const [trendlineFakeVolumeDataArray, setTrendlineFakeVolumeDataArray] =
    useState(fakeVolume.slice(fakeVolume.length - 30));

  useEffect(() => {
    if (trendlineTimespan === -30) {
      setTrendlineLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 30));
      setTrendlineTrueVolumeArray(trueVolume.slice(trueVolume.length - 30));
      setTrendlineTotalVolumeArray(totalVolume.slice(totalVolume.length - 30));
      setTrendlineFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 30));
      setTrendlineVolumeLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (trendlineTimespan === -7) {
      setTrendlineLoanVolumeDataArray(loanVolume.slice(loanVolume.length - 7));
      setTrendlineTrueVolumeArray(trueVolume.slice(trueVolume.length - 7));
      setTrendlineTotalVolumeArray(totalVolume.slice(totalVolume.length - 7));
      setTrendlineFakeVolumeDataArray(fakeVolume.slice(fakeVolume.length - 7));
      setTrendlineVolumeLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }

    if (trendlineTimespan === null) {
      setTrendlineLoanVolumeDataArray(loanVolume);
      setTrendlineFakeVolumeDataArray(fakeVolume);
      setTrendlineTotalVolumeArray(totalVolume);
      setTrendlineTrueVolumeArray(trueVolume);
      setTrendlineVolumeLabels(labels);
    }
  }, [trendlineTimespan]);

  const renderTrueTotalPercentage = () => {
    const trueV: any = trueVolume[trueVolume.length - 1];
    const totalV: any = totalVolume[totalVolume.length - 1];
    return (trueV / totalV).toFixed(0);
  };

  return (
    <>
      {/* <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__container chart__container">
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
                    <Text color="white" weight={700} align="center" size="xl">
                      {parseInt(renderTrueTotalPercentage())}%
                    </Text>
                  }
                />
              </p>
            </div>
            <div>
              <p className="typography__label--2">{`${kFormatter(
                realPercentDifference[realPercentDifference.length - 1]
              )}k`}</p>
              <h3 className="typography__label--1">True Volume</h3>
              <p className="typography__paragraph--1">
                Excludes fake/artificial volume such as loans, points farming
                and wash trading.
              </p>
            </div>
          </div>

          <TrueVolumeBarChart
            labels={trendlineVolumeLabels}
            data={{ true_volume: trendlineTrueVolumeArray }}
            trend_timespan={trendlineTimespan}
          />
        </div>
      </div> */}

      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__container">
          <h3 className="typography__label--1">Total Volume</h3>
          <p className="typography__paragraph--1">
            NFT trading volume across all transaction types
          </p>

          <div className="chart__legend">
            <div className="chart__legend-item chart__legend-item--true-volume">
              <p className="typography__label--3">Real Volume</p>
            </div>
            <div className="chart__legend-item chart__legend-item--trend">
              <p className="typography__label--3">Trend</p>
            </div>
          </div>

          <TrueVolumeLineChart
            labels={trendlineVolumeLabels}
            data={{
              true_volume: trendlineTrueVolumeArray,
              true_volume_moving_average: loanVolumeMovingAverage,
            }}
            trend_timespan={trendlineTimespan}
          />
        </div>
      </div>

      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__container">
          <h3 className="typography__label--1">Total Volume</h3>
          <p className="typography__paragraph--1">
            NFT trading volume across all transaction types
          </p>

          <div className="chart__legend">
            <div className="chart__legend-item chart__legend-item--primary">
              <p className="typography__label--3">Loan Volume</p>
            </div>
            <div className="chart__legend-item chart__legend-item--trend">
              <p className="typography__label--3">Trend</p>
            </div>
          </div>

          <LoanVolumeChart
            labels={trendlineVolumeLabels}
            data={{
              loan_volume: trendlineLoanVolumeDataArray,
              loan_volume_moving_average: loanVolumeMovingAverage,
            }}
            trend_timespan={trendlineTimespan}
          />
        </div>
      </div>

      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__container">
          <h3 className="typography__label--1">Total Volume</h3>
          <p className="typography__paragraph--1">
            NFT trading volume across all transaction types
          </p>

          <div className="chart__legend">
            <div className="chart__legend-item chart__legend-item--secondary">
              <p className="typography__label--3">Fake Volume (Inorganic)</p>
            </div>
            <div className="chart__legend-item chart__legend-item--trend">
              <p className="typography__label--3">Trend</p>
            </div>
          </div>

          <FakeVolumeChart
            labels={trendlineVolumeLabels}
            data={{
              fake_volume: trendlineFakeVolumeDataArray,
              fake_volume_moving_average: fakeVolumeMovingAverage,
            }}
            trend_timespan={trendlineTimespan}
          />
        </div>
      </div>

      <div className="chart__grid-cell chart__grid-cell--half">
        <div className="chart__container">
          <h3 className="typography__label--1">Total Volume</h3>
          <p className="typography__paragraph--1">
            NFT trading volume across all transaction types
          </p>

          <div className="chart__legend">
            <div className="chart__legend-item chart__legend-item--tertiary">
              <p className="typography__label--3">Total Volume</p>
            </div>
            <div className="chart__legend-item chart__legend-item--trend">
              <p className="typography__label--3">Trend</p>
            </div>
          </div>

          <TotalVolumeChart
            labels={trendlineVolumeLabels}
            data={{
              total_volume: trendlineTotalVolumeArray,
              total_volume_moving_average: totalVolumeMovingAverage,
            }}
            trend_timespan={trendlineTimespan}
          />
        </div>
      </div>
    </>
  );
};

export default ExpandedView;
