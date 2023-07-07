"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { kFormatter } from "@utils/kFormatter";
import Legend from "@components/dataViz/legend/legend";

interface DailyTrueVolumeTypes {
  labels: string[];
  data: {
    true_volume: number[];
    loan_volume: number[];
    fake_volume: number[];
  };
}
const DailyTrueVolumeChart: React.FC<DailyTrueVolumeTypes> = ({
  labels,
  data: { true_volume, loan_volume, fake_volume },
}) => {
  const [trueVolumeDisabled, setTrueVolumeDisabled] = useState(false);
  const [loanVolumeDisabled, setLoanVolumeDisabled] = useState(false);
  const [fakeVolumeDisabled, setFakeVolumeDisabled] = useState(false);
  const onClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");

      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "true-volume") {
            setTrueVolumeDisabled(!trueVolumeDisabled);
          }
          if (domEls[i].id === "loan-volume") {
            setLoanVolumeDisabled(!loanVolumeDisabled);
          }
          if (domEls[i].id === "fake-volume") {
            setFakeVolumeDisabled(!fakeVolumeDisabled);
          }
        }
      }
    }
  };
  return (
    <>
      <Legend
        modifierClass="chart__legend-modifier--daily-true-volume"
        onClick={(e) => onClick(e)}
        labels={[
          {
            color: "accent-grey",
            name: "True Volume",
            id: "true-volume",
          },
          {
            color: "accent-orange",
            name: "Loan Volume",
            id: "loan-volume",
          },
          {
            color: "accent-orange",
            name: "Fake Volume",
            id: "fake-volume",
          },
        ]}
      />
      <div className="chart__bar-wrapper" style={{ height: 290 }}>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "True Volume",
                data: trueVolumeDisabled ? [] : true_volume,
                borderColor: "white",
                backgroundColor: "rgb(92, 95, 102)",
              },
              {
                label: "Loans",
                data: loanVolumeDisabled ? [] : loan_volume,
                borderColor: "black",
                backgroundColor: "rgba(250, 176, 5, 1)",
              },
              {
                label: "Fake Volume (Inorganic)",
                data: fakeVolumeDisabled ? [] : fake_volume,
                borderColor: "white",
                backgroundColor: "rgba(253, 126, 20, 1)",
              },
            ],
          }}
          options={{
            interaction: {
              mode: "x",
            },
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

export default DailyTrueVolumeChart;
