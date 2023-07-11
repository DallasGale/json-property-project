import { Bar } from "react-chartjs-2";
import { kFormatter } from "@utils/kFormatter";
import Legend from "@components/dataViz/legend/legend";
import { BarChartDatasetsType, LegendLabelTypes } from "@app/types";

interface DailyTrueVolumeTypes {
  labels: string[];
  datasets: BarChartDatasetsType[];
  legendLabels: LegendLabelTypes[];
  legendOnClick: (e: string) => void;
}

const HeroBarChart: React.FC<DailyTrueVolumeTypes> = ({
  labels,
  legendLabels,
  legendOnClick,
  datasets,
}) => {
  return (
    <>
      <Legend
        modifierClass="chart__legend-modifier--daily-true-volume"
        onClick={(e) => legendOnClick(e)}
        labels={...legendLabels}
        legendFormat="horizontal"
      />
      <div
        className="chart__bar-wrapper chart__bar-wrapper--daily-true-volume"
        style={{ height: 290 }}
      >
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
