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
  legendOnClick: (e: string) => void;
}

const HeroBarChart: React.FC<DailyTrueVolumeTypes> = ({
  labels,
  legendLabels,
  legendOnClick,
  datasets,
  timeframe,
}) => {
  return (
    <>
      <Legend
        modifierClass="hero-legend"
        onClick={(e) => legendOnClick(e)}
        labels={...legendLabels}
        legendFormat="horizontal"
      />
      <div className="chart__bar-wrapper" style={{ height: 310 }}>
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
                ticks: {
                  callback: function (val: any, index) {
                    // any
                    if (timeframe === 0) {
                      return val % 4 === 0 ? labels[val] : "";
                    }
                    if (timeframe === 90) {
                      return val % 2 === 0 ? labels[val] : "";
                    }
                    if (timeframe === 30) {
                      return val % 1.5 === 0 ? labels[val] : "";
                    } else return labels[val];
                  },
                },
              },
              y: {
                stacked: true,
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
