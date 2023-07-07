import { Bar } from "react-chartjs-2";
import { kFormatter } from "@utils/kFormatter";

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
  return (
    <div className="chart__bar-wrapper" style={{ height: 300 }}>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "True Volume",
              data: true_volume,
              borderColor: "white",
              backgroundColor: "#5C5F66",
            },
            {
              label: "Loans",
              data: loan_volume,
              borderColor: "black",
              backgroundColor: "#FFD740",
            },
            {
              label: "Fake Volume (Inorganic)",
              data: fake_volume,
              borderColor: "white",
              backgroundColor: "rgba(250, 82, 82, 1)",
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

            htmlLegend: {
              // ID of the container to put the legend in
              containerID: "legend-container",
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
  );
};

export default DailyTrueVolumeChart;
