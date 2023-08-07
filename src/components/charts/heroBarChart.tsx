import { Bar } from "react-chartjs-2";
import { VolumeFormatter } from "@utils/volumeFormatter";
import Legend from "@components/dataViz/legend/legend";

// Types
import { DailyTrueVolumeTypes } from "@app/types";
import Moment from "react-moment";

const HeroBarChart: React.FC<DailyTrueVolumeTypes> = ({
  labels,
  legendLabels,
  legendOnClick,
  datasets,
  timeframeClicked,
  timeframe,
}) => {
  const today = new Date().toDateString();
  return (
    <>
      <Legend
        modifierClass="hero-legend"
        onClick={(e) => legendOnClick(e)}
        labels={legendLabels}
        legendFormat="horizontal"
      />
      <div className="chart__bar-wrapper" style={{ height: 294 }}>
        <div className="chart__labels">
          <ol
            className={`chart__labels-list ${
              timeframe === 1 ? "u-justifyCenter" : ""
            } ${timeframe === 7 ? "chart__labels-list--7day" : ""}`}
          >
            {labels.slice().map((label, index) => {
              if (timeframe === 0) {
                if (index % 160 === 0)
                  return (
                    <li
                      className={`chart__labels-list-item typography__caption--medium ${
                        timeframeClicked ? "hidden" : "visible"
                      }`}
                      key={index}
                    >
                      {label}
                    </li>
                  );
              } else if (timeframe === 90) {
                if (index % 16 === 0)
                  return (
                    <li
                      className={`chart__labels-list-item typography__caption--medium ${
                        timeframeClicked ? "hidden" : "visible"
                      }`}
                      key={index}
                    >
                      {label}
                    </li>
                  );
              } else if (timeframe === 30) {
                if (index % 5 === 0)
                  return (
                    <li
                      className={`chart__labels-list-item typography__caption--medium ${
                        timeframeClicked ? "hidden" : "visible"
                      }`}
                      key={index}
                    >
                      {label}
                    </li>
                  );
              } else if (timeframe === 7) {
                return (
                  <li
                    className={`chart__labels-list-item typography__caption--medium ${
                      timeframeClicked ? "hidden" : "visible"
                    }`}
                    key={index}
                  >
                    {label}
                  </li>
                );
              } else return;
            })}
            {timeframe !== 7 && (
              <li
                className={` chart__labels-list-item chart__labels-list-item--last typography__caption--medium ${
                  timeframeClicked ? "hidden" : "visible"
                }`}
              >
                <Moment
                  format="D MMM YYYY"
                  date={today}
                  subtract={{ days: 1 }}
                />
              </li>
            )}
          </ol>
        </div>
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
            scales: {
              x: {
                grid: {
                  lineWidth: 0,
                },
                stacked: true,
                ticks: {
                  display: false,
                },
              },
              y: {
                stacked: true,
                grid: {
                  lineWidth: 0,
                },
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
