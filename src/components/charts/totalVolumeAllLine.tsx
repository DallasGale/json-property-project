import { Line } from "react-chartjs-2";

interface TotalVolumeChartTypes {
  labels: string[];
  data: {
    true_volume_moving_average: number[];
    loan_volume_moving_average: number[];
    fake_volume_moving_average: number[];
    total_volume_moving_average: number[];
  };
}
const TotalVolumeAllLineChart: React.FC<TotalVolumeChartTypes> = ({
  labels,
  data: {
    true_volume_moving_average,
    loan_volume_moving_average,
    fake_volume_moving_average,
    total_volume_moving_average,
  },
}) => {
  return (
    <div className="chart__bar-wrapper">
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Loan Volume Trend",
              data: loan_volume_moving_average.slice(
                loan_volume_moving_average.length - 30
              ),
              borderColor: "rgba(250, 176, 5, 1)",
              backgroundColor: "rgba(250, 176, 5, 1)",
              pointRadius: 0,
              borderWidth: 1,
            },
            {
              label: "Real Volume Trend",
              data: true_volume_moving_average.slice(
                true_volume_moving_average.length - 30
              ),
              borderColor: "rgb(64, 192, 87)",
              backgroundColor: "rgb(64, 192, 87)",
              pointRadius: 0,
              borderWidth: 1,
            },
            {
              label: "Fake Volume Trend",
              data: fake_volume_moving_average.slice(
                fake_volume_moving_average.length - 30
              ),
              borderColor: "rgba(253, 126, 20, 1)",
              backgroundColor: "rgba(253, 126, 20, 1)",
              pointRadius: 0,
              borderWidth: 1,
            },
            {
              label: "Total Volume Trend",
              data: total_volume_moving_average.slice(
                total_volume_moving_average.length - 30
              ),
              borderColor: "rgba(250, 82, 82, 1)",
              backgroundColor: "rgba(250, 82, 82, 1)",
              pointRadius: 0,
              borderWidth: 1,
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

export default TotalVolumeAllLineChart;
