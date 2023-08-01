import { Line } from "react-chartjs-2";
import Legend from "@components/dataViz/legend/legend";
import MatrixBg from "@assets/bg/matrix.svg";

import {
  LegendFormatTypes,
  LegendLabelTypes,
  LineChartDatasetsType,
} from "@app/types";

interface TrendLineChartTypes {
  labels: string[];
  datasets: LineChartDatasetsType[];
  legendLabels: LegendLabelTypes[];
  legendFormat?: LegendFormatTypes;
  legendOnClick: (e: string) => void;
}

const TrendLineChart: React.FC<TrendLineChartTypes> = ({
  labels,
  datasets,
  legendOnClick,
  legendLabels,
  legendFormat,
}) => {
  return (
    <div className="chart__trend-line">
      <Legend
        onClick={(e) => legendOnClick(e)}
        labels={...legendLabels}
        legendFormat={legendFormat}
      />
      <div
        className="chart__line-wrapper"
        style={{ background: `url(${MatrixBg.src}` }}
      >
        <Line
          data={{
            labels: labels,
            datasets: datasets,
          }}
          options={{
            scales: {
              x: {
                display: false,
                stacked: false,
              },
              y: {
                display: false,
                stacked: false,
              },
            },
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
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TrendLineChart;
