import { ProgressRingTypes } from "@/app/types";
import { Doughnut } from "react-chartjs-2";

const ProgressRing: React.FC<ProgressRingTypes> = ({
  averageVariance,
  percentage,
  modiferClass = "",
}) => {
  return (
    <div className={`chart__progress-ring ${modiferClass}`}>
      <Doughnut
        options={{
          cutout: "80%",
          plugins: {
            tooltip: {
              enabled: false,
            },
            legend: {
              display: false,
            },
          },
        }}
        data={{
          datasets: [
            {
              data: [averageVariance],
              backgroundColor: ["rgba(64, 192, 87, 1)"],

              borderColor: "transparent",
              hoverOffset: 4,
              borderRadius: [5],
              spacing: 6,
            },
          ],
        }}
      />

      {percentage && <p className="typography__label--2">{percentage}</p>}
    </div>
  );
};

export default ProgressRing;
