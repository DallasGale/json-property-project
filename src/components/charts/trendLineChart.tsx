"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Legend from "@components/dataViz/legend/legend";

interface TrendLineChartTypes {
  labels: string[];
  data: {
    loan_volume_moving_average: number[];
    fake_volume_moving_average: number[];
  };
}

const TrendLineChart: React.FC<TrendLineChartTypes> = ({
  labels,
  data: { loan_volume_moving_average, fake_volume_moving_average },
}) => {
  const [loanVolumeDisabled, setLoanVolumeDisabled] = useState(false);
  const [fakeVolumeDisabled, setFakeVolumeDisabled] = useState(false);

  const onClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");

      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "loan-volume-trend") {
            setLoanVolumeDisabled(!loanVolumeDisabled);
          }
          if (domEls[i].id === "fake-volume-trend") {
            setFakeVolumeDisabled(!fakeVolumeDisabled);
          }
        }
      }
    }
  };
  return (
    <>
      <Legend
        onClick={(e) => onClick(e)}
        labels={[
          {
            color: "accent-yellow",
            name: "Loan Volume Trend",
            id: "loan-volume-trend",
          },
          {
            color: "accent-orange",
            name: "Fake Volume Trend",
            id: "fake-volume-trend",
          },
        ]}
      />

      <div className="chart__bar-wrapper">
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "Loan Volume Trend",
                data: loan_volume_moving_average.slice(
                  loan_volume_moving_average.length - 90
                ),
                borderColor: loanVolumeDisabled
                  ? "rgba(250, 176, 5, 0)"
                  : "rgba(250, 176, 5, 1)",
                backgroundColor: loanVolumeDisabled
                  ? "rgba(250, 176, 5, 0)"
                  : "rgba(250, 176, 5, 1)",
                pointRadius: 0,
                borderWidth: 2,
                fill: false,
                tension: 0.6,
              },
              {
                label: "Fake Volume Trend",
                data: fake_volume_moving_average.slice(
                  fake_volume_moving_average.length - 90
                ),
                borderColor: fakeVolumeDisabled
                  ? "rgba(253, 126, 20, 0)"
                  : "rgba(253, 126, 20, 1)",
                backgroundColor: fakeVolumeDisabled
                  ? "rgba(253, 126, 20, 0)"
                  : "rgba(253, 126, 20, 1)",
                pointRadius: 0,
                borderWidth: 4,
                fill: false,
                tension: 1,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0,
                borderWidth: 10,
                cubicInterpolationMode: "default",
              },
              point: {
                pointStyle: "circle",
              },
            },
            interaction: {
              intersect: false,
            },
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {},
              },

              annotation: {
                annotations: {},
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
                display: false,
                stacked: false,
              },
              y: {
                display: false,
                stacked: false,
                suggestedMin: -10,
                suggestedMax: 200,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default TrendLineChart;
