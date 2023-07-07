import { Doughnut } from "react-chartjs-2";
import doughnutValueColors from "@/utils/doughnutValueColors";

interface ProgressRingTypes {
  percentage: string;
}
const ProgressRing: React.FC<ProgressRingTypes> = ({ percentage }) => {
  return (
    <div className="chart__progress-ring">
      <Doughnut
        options={{
          cutout: "85%",
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          datasets: [
            {
              label: "My First Dataset",
              data: percentage,
              backgroundColor: [
                doughnutValueColors(percentage),
                "rgba(92, 95, 102, 1",
              ],

              borderColor: "transparent",
              hoverOffset: 4,
              borderRadius: [5, 0],
            },
          ],
        }}
      />

      <p className="typography__label--2">{percentage}</p>
    </div>
  );
};

export default ProgressRing;
