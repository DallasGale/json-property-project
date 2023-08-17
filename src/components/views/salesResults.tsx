"use client";

// Components
import { ISalesResultsTypes } from "@/app/types";
import PropertyTable from "@components/propertyTable/propertyTable";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import ProgressRing from "../charts/progressRing";
import DecimalFormatter from "@/utils/decimalFormatter";
import ChartHeader from "../charts/chartHeader";
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
  const springs2 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 600,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });
  const springs3 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 900,
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
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Charts */}
        <animated.div className="u-container-shadow" style={{ ...springs2 }}>
          <div className="grid__col-content grid__col-content--chart">
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
          </div>
        </animated.div>

        {/* Chart */}
        <animated.div className="u-container-shadow" style={{ ...springs3 }}>
          <div className="grid__col-content grid__col-content--chart">
            <div className="grid__col-container-body">
              <div className="chart__info">
                <ProgressRing
                  averageVariance={10}
                  percentage={`${DecimalFormatter(32.42)}`}
                />
                <ChartHeader
                  title="VIC Clearance Rate"
                  description="From 663 scheduled auctions"
                />
              </div>
              <div>
                <TrendLineChart
                  legendLabels={[
                    {
                      color: "accent-green",
                      name: "Sold",
                      id: "sold",
                    },
                    {
                      color: "accent-red",
                      name: "Passed In",
                      id: "passed-in",
                    },
                    {
                      color: "grey",
                      name: "Withdrawn",
                      id: "withdrawn",
                    },
                  ]}
                  legendItemVolume={[
                    {
                      id: "sold",
                      value: 20,
                    },
                    {
                      id: "passed-in",
                      value: 30,
                    },
                    {
                      id: "withdrawn",
                      value: 30,
                    },
                  ]}
                  legendFormat="vertical"
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
                      label: "Sold",
                      data: [1, 2, 5, 30, 32, 30, 21, 9, 2, 5, 30, 21],
                      borderColor: "rgba(64, 192, 87, 1)",
                      backgroundColor: "rgba(64, 192, 87, 1)",
                      pointRadius: 0,
                      borderWidth: 3,
                    },
                    {
                      label: "Passed In",
                      data: [21, 20, 2, 5, 30, 21, 11, 2, 5, 53, 30, 22],
                      borderColor: "rgba(250, 82, 82, 1",
                      backgroundColor: "rgba(250, 82, 82, 1",
                      pointRadius: 0,
                      borderWidth: 3,
                    },
                    {
                      label: "Withdrawn",
                      data: [5, 30, 21, 5, 21, 0, 2, 2, 5, 2, 32, 21],
                      borderColor: "rgb(193, 194, 197)",
                      backgroundColor: "rgb(193, 194, 197)",
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
          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default SalesResults;
