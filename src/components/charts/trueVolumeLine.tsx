import { Line } from "react-chartjs-2";
interface TrueVolumeChartTypes {
  labels: string[];
  data: {
    true_volume: number[];
    true_volume_moving_average: number[];
  };
  trend_timespan: number | null;
}
const TrueVolumeLineChart: React.FC<TrueVolumeChartTypes> = ({
  labels,
  data: { true_volume, true_volume_moving_average },
  trend_timespan,
}) => {
  return (
    <div className="chart__bar-wrapper">
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Trend",
              data: true_volume_moving_average,
              borderColor: "rgba(255, 255, 255)",
              backgroundColor: "rgba(255, 255, 255)",
              pointRadius: 0,
              borderWidth: 1,
            },
            {
              label: "Real Volume",
              data: true_volume,
              borderColor: "rgb(64, 192, 87)",
              backgroundColor: "rgb(64, 192, 87)",
              pointRadius: trend_timespan === null ? 2 : 5,
              tension: 0.3,
              borderWidth: 1,
              // @ts-ignore
              // trendlineLinear: {
              //   colorMin: "white",
              //   colorMax: "white",
              //   lineStyle: "solid",
              //   width: 2,
              //   projection: false,
              // },
            },
          ],
        }}
        options={{
          elements: {
            line: {
              capBezierPoints: true,
              borderJoinStyle: "round",
              borderWidth: 10,
            },
            point: {
              pointStyle: "circle",
            },
          },
          interaction: {
            mode: "x",
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

export default TrueVolumeLineChart;
