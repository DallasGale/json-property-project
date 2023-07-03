import { Line } from "react-chartjs-2";

interface TotalVolumeChartTypes {
  labels: string[];
  data: {
    total_volume: number[];
    total_volume_moving_average: number[];
  };
  trend_timespan: number | null;
}

const TotalVolumeChart: React.FC<TotalVolumeChartTypes> = ({
  labels,
  data: { total_volume, total_volume_moving_average },
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
              data: total_volume_moving_average,
              borderColor: "rgba(255, 255, 255)",
              backgroundColor: "rgba(255, 255, 255)",
              pointRadius: 0,
              borderWidth: 1,
            },
            {
              label: "Total Volume",
              data: total_volume,
              borderColor: "rgba(250, 82, 82, 1)",
              backgroundColor: "rgba(250, 82, 82, 1)",
              pointRadius: trend_timespan === null ? 2 : 5,
              tension: 0.3,
              borderWidth: 2,
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

export default TotalVolumeChart;
