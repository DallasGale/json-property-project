"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { kFormatter } from "@utils/kFormatter";
import Legend from "@components/dataViz/legend/legend";

interface DailyTrueVolumeTypes {
  labels: string[];
  legendOnClick: (e: string) => void;
  // data: {
  //   bar1: number[];
  //   bar2: number[];
  //   bar3: number[];
  // };
  datasets: DatasetsType[];
  legendLables: LegendLabels[];
}

type DatasetsType = {
  label: string;
  data: number[] | [];
  borderColor: string;
  backgroundColor: string;
};
type LegendLabels = {
  color: string;
  name: string;
  id: string;
};

const HeroBarChart: React.FC<DailyTrueVolumeTypes> = ({
  labels,
  legendLables,
  legendOnClick,
  datasets,
}) => {
  return (
    <>
      <Legend
        modifierClass="chart__legend-modifier--daily-true-volume"
        onClick={(e) => legendOnClick(e)}
        labels={...legendLables}
      />
      <div
        className="chart__bar-wrapper chart__bar-wrapper--daily-true-volume"
        style={{ height: 290 }}
      >
        <Bar
          data={{
            labels: labels,
            datasets: datasets,
            // datasets: [
            //   {
            //     label: "True Volume",
            //     data: trueVolumeDisabled ? [] : bar1,
            //     borderColor: "white",
            //     backgroundColor: "rgb(213, 244, 21)",
            //   },
            //   {
            //     label: "Loans",
            //     data: loanVolumeDisabled ? [] : bar2,
            //     borderColor: "black",
            //     backgroundColor: "rgba(250, 176, 5, 1)",
            //   },
            //   {
            //     label: "Fake Volume (Inorganic)",
            //     data: fakeVolumeDisabled ? [] : bar3,
            //     borderColor: "white",
            //     backgroundColor: "rgba(253, 126, 20, 1)",
            //   },
            // ],
          }}
          options={{
            interaction: {
              mode: "x",
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false,
                text: "Chart.js Bar Chart - Stacked",
              },
              legend: {
                position: "top",
                align: "start",
                display: false,
                fullSize: true,
                labels: {
                  color: "#fff",
                  usePointStyle: true,
                  pointStyle: "rectRounded",
                },
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                ticks: {
                  callback: function (value: any) {
                    return kFormatter(value);
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
