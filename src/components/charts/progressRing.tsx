import { Doughnut } from "react-chartjs-2";
// import goodToBadColors from "@/utils/goodToBadColors";

interface ProgressRingTypes {
  trueVolume: number[];
  loanVolume: number[];
  fakeVolume: number[];
  percentage: string;
}
const ProgressRing: React.FC<ProgressRingTypes> = ({
  trueVolume,
  loanVolume,
  fakeVolume,
  percentage,
}) => {
  return (
    <div className="chart__progress-ring">
      <Doughnut
        options={{
          cutout: "88%",
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
              data: [trueVolume, loanVolume, fakeVolume],
              backgroundColor: [
                "rgba(64, 192, 87, 1)",
                "rgba(250, 176, 5, 1)",
                "rgba(253, 126, 20, 1)",
              ],

              borderColor: "transparent",
              hoverOffset: 4,
              borderRadius: [5, 5, 5],
              spacing: 6,
            },
          ],
        }}
      />

      <p className="typography__label--2">{percentage}</p>
    </div>
  );
};

export default ProgressRing;
