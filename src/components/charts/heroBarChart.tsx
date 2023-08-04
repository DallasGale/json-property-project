"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { VolumeFormatter } from "@utils/volumeFormatter";
import Legend from "@components/dataViz/legend/legend";
import { BarChartDatasetsType, LegendLabelTypes } from "@app/types";

interface DailyTrueVolumeTypes {
  labels: string[];
  datasets: BarChartDatasetsType[];
  legendLabels: LegendLabelTypes[];
  legendModifierClass?: string;
  timeframe: number;
  timeframeClicked: boolean;
  legendOnClick: (e: string) => void;
}

const HeroBarChart: React.FC<DailyTrueVolumeTypes> = ({
  labels,
  legendLabels,
  legendOnClick,
  datasets,
  timeframeClicked,
  timeframe,
}) => {
  const renderChartLabels = () => {
    if (labels.length) {
      if (timeframe === 0) {
        if (labels.length % 160 === 0) return labels;
        else return;
      }

      if (timeframe === 90) {
        if (labels.length % 16 === 0) return labels;
        else return;
      }
      if (timeframe === 30) {
        if (labels.length % 7 === 0) return labels;
        else return;
      } else return labels;
    }
  };

  console.log(renderChartLabels());
  return (
    <>
      <Legend
        modifierClass="hero-legend"
        onClick={(e) => legendOnClick(e)}
        labels={legendLabels}
        legendFormat="horizontal"
      />
      <div className="chart__bar-wrapper" style={{ height: 294 }}>
        <div className="chart__labels">
          <ol
            className={`chart__labels-list ${
              timeframe === 1 ? "u-justifyCenter" : ""
            }`}
          >
            {labels.map((label, index) => {
              if (timeframe === 0) {
                if (index % 160 === 0)
                  return (
                    <li
                      className={`chart__labels-list-item typography__caption--medium ${
                        timeframeClicked ? "hidden" : "visible"
                      }`}
                      key={index}
                    >
                      {label}
                    </li>
                  );
              } else if (timeframe === 90) {
                if (index % 16 === 0)
                  return (
                    <li
                      className={`chart__labels-list-item typography__caption--medium ${
                        timeframeClicked ? "hidden" : "visible"
                      }`}
                      key={index}
                    >
                      {label}
                    </li>
                  );
              } else if (timeframe === 30) {
                if (index % 5 === 0)
                  return (
                    <li
                      className={`chart__labels-list-item typography__caption--medium ${
                        timeframeClicked ? "hidden" : "visible"
                      }`}
                      key={index}
                    >
                      {label}
                    </li>
                  );
              } else {
                return (
                  <li
                    className={`chart__labels-list-item typography__caption--medium ${
                      timeframeClicked ? "hidden" : "visible"
                    }`}
                    key={index}
                  >
                    {label}
                  </li>
                );
              }
            })}
          </ol>
        </div>
        <Bar
          data={{
            labels: labels,
            datasets: datasets,
          }}
          options={{
            interaction: {
              mode: "x",
            },

            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  lineWidth: 0,
                },
                stacked: true,
                ticks: {
                  display: false,
                },
              },
              y: {
                stacked: true,
                grid: {
                  lineWidth: 0,
                },
                ticks: {
                  callback: function (value: any) {
                    return VolumeFormatter(value);
                  },
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default HeroBarChart;
