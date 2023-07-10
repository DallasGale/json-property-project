import { Doughnut } from "react-chartjs-2";
import doughnutValueColors from "@/utils/doughnutValueColors";

interface ProgressRingTypes {
  timeframe: number;
  true_volume: number[];
  loan_volume: number[];
  fake_volume: number[];
}
const ProgressRing: React.FC<ProgressRingTypes> = ({
  timeframe,
  true_volume,
  loan_volume,
  fake_volume,
}) => {
  console.log(true_volume.slice(true_volume.length - 1));

  // function calculatePercentageDifferenceBetweenThreeNumbers() {

  //   let total = 0
  //   if (timeframe === 1) {
  //     total = true_volume.slice(true_volume.length - 1) + loan_volume.slice(loan_volume.length - 1) + fake_volume.slice(fake_volume.length - 1);
  //     return total
  //   }
  //   const truePercentage = Math.round((true_volume / total) * 100);
  //   const loanPercentage = Math.round((loan_volume / total) * 100);
  //   const fakePercentage = Math.round((fake_volume / total) * 100);
  //   return { truePercentage, loanPercentage, fakePercentage };
  // }

  const percentage = "20";
  return (
    <div className="chart__progress-ring">
      <Doughnut
        options={{
          cutout: "85%",
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
              data: [20, 30, 50],
              backgroundColor: [
                "rgb(213, 244, 21)",
                "rgba(250, 176, 5, 1)",
                "rgba(253, 126, 20, 1)",
              ],

              borderColor: "transparent",
              hoverOffset: 4,
              borderRadius: [5, 5, 5],
            },
          ],
        }}
      />

      <p className="typography__label--2">{percentage}</p>
    </div>
  );
};

export default ProgressRing;
