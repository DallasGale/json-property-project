import { Bar } from "react-chartjs-2";
import MatrixBg from "@assets/bg/matrix.svg";

interface TrueVolumeChartTypes {
  labels: string[];
  data: {
    true_volume: number[];
  };
  trend_timespan: number | null;
}
const TrueVolumeBarChart: React.FC<TrueVolumeChartTypes> = ({
  labels,
  data: { true_volume },
}) => {
  return (
    <div
      className="chart__bar-wrapper"
      style={{
        height: 96,
        background: `url(${MatrixBg.src}`,
        paddingBottom: 0,
        marginBottom: 30,
      }}
    >
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "True Volume",
              data: true_volume,
              borderColor: "white",
              backgroundColor: "#5C5F66",
              barThickness: 1,
              // @ts-ignore
              trendlineLinear: {
                colorMin: "rgba(255, 82, 82, 1)",
                colorMax: "rgba(250, 82, 82, 1)",
                lineStyle: "solid",
                width: 2,
                projection: false,
              },
            },
          ],
        }}
        options={{
          interaction: {
            mode: "x",
          },
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                // footer: customTooltip,
              },
            },
            annotation: {
              annotations: {},
            },
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
              display: false,
              stacked: true,
            },
            y: {
              display: false,
              stacked: true,
            },
          },
        }}
      />
    </div>
  );
};

export default TrueVolumeBarChart;
