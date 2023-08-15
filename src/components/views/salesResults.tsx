"use client";

// Components
import { ISalesResultsTypes } from "@/app/types";
import PropertyTable from "@components/propertyTable/propertyTable";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import ProgressRing from "../charts/progressRing";
import DecimalFormatter from "@/utils/decimalFormatter";
import ChartHeader from "../charts/chartHeader";
import { VolumeFormatter } from "@/utils/volumeFormatter";
import TrueVolumeBarChart from "../charts/trueVolumeBar";
import DateRange from "../dateRange/dateRange";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  PointElement,
  Tooltip,
} from "chart.js";
import TrendLineChart from "../charts/trendLineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  annotationPlugin
);

const SalesResults: React.FC<ISalesResultsTypes> = ({ propertyData }) => {
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 300,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs2 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 450,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  return (
    <section className="sales-results">
      <div>
        <PropertyTable propertyData={propertyData} />
      </div>
      <div>
        {/* Charts */}
        <div className="u-container-shadow">
          <animated.div
            style={{ ...springs1 }}
            className="grid__col-content grid__col-content--chart"
          >
            <div className="grid__col-container-body">
              <div className="chart__info">
                <ProgressRing
                  averageVariance={10}
                  percentage={`${DecimalFormatter(32.42)}`}
                />
                <ChartHeader
                  title="Average Variance"
                  description="Auction results from offical sources"
                />
              </div>
              <div className="chart__seperator" />
              <div>
                <TrendLineChart
                  legendLabels={[]}
                  legendOnClick={() => false}
                  labels={[
                    "jan",
                    "feb",
                    "mar",
                    "apr",
                    "may",
                    "june",
                    "july",
                    "aug",
                    "sep",
                    "oct",
                    "nov",
                    "dec",
                  ]}
                  datasets={[
                    {
                      label: "legendLabels.salesRevenue[0].name",
                      data: [21, 423, 2, 5, 53, 21, 423, 2, 5, 53, 32, 56],
                      borderColor: "rgba(64, 192, 87, 1)",
                      backgroundColor: "rgba(64, 192, 87, 1)",
                      pointRadius: 0,
                      borderWidth: 3,
                    },
                  ]}
                />
                <div className="chart__container-footer">
                  <p className="typography__label--medium typography__transform--uppercase">
                    90 Day Trend
                  </p>
                  <DateRange />
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default SalesResults;
