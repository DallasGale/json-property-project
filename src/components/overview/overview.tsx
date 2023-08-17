"use client";
import { useState } from "react";

// Components
import HeroBarChart from "@components/charts/heroBarChart";
import ChartDataToggles from "@components/toggles/chart_data";

// Utils
import { useSpring, animated } from "@react-spring/web";

// Assets
import TimeframeAsString from "@utils/timeframeAsString";
import TwoColumnGrid from "@/grids/twoColumnGrid";
import { IOverviewTypes } from "@/app/types";
import TrendLineChart from "../charts/trendLineChart";
import ChartHeader from "../charts/chartHeader";
import DateRange from "../dateRange/dateRange";
import { config, toFrom } from "@/constants/animationSettings";

// Animation
import { animation } from "./animation";

const Overview: React.FC<IOverviewTypes> = ({
  title,
  heroChartLegendOnClick,
  heroChartTimeframeOnClick,
  trendlineTimeframeOnClick,
  heroChartLabels,
  heroChartTimeframe,
  heroChartTimeframeClicked,
  trendlineTimeframe,
  heroChartDatasets,
  trendline1HeaderValue,
  trendline2HeaderValue,
  trendline1Labels,
  trendline2Labels,
  trendline1Datasets,
  trendline2Datasets,
  trendLine1LegendOnClick,
  trendLine2LegendOnClick,
  trendline1LegendLabels,
  trendline2LegendLabels,
  heroChartLegendLabels,
  trendline1HeaderTitle,
  trendline2HeaderTitle,
}) => {
  // Animations
  const springs1 = useSpring({
    delay: 0,
    ...animation,
  });
  const springs2 = useSpring({
    delay: 150,
    ...animation,
  });

  const springs3 = useSpring({
    delay: 150,
    ...animation,
  });

  const animateTrednline1 = useSpring({
    ...toFrom,
    config: config,
    delay: 300,
  });
  const animateTrednline2 = useSpring({
    ...toFrom,
    config: config,
    delay: 450,
  });

  return (
    <>
      <TwoColumnGrid
        column1={{
          header: (
            <animated.div style={{ ...springs1 }}>
              <div className="chart__chart-actions-lockup">
                <ChartDataToggles
                  title={title}
                  onClick={(arg1, arg2) =>
                    heroChartTimeframeOnClick(arg1, arg2)
                  }
                  active={heroChartTimeframe}
                />
              </div>
            </animated.div>
          ),
          content: (
            <animated.div style={{ ...springs2 }} className="grid__col-content">
              <div>
                <HeroBarChart
                  timeframeClicked={heroChartTimeframeClicked}
                  timeframe={heroChartTimeframe}
                  labels={heroChartLabels}
                  legendOnClick={heroChartLegendOnClick}
                  legendLabels={heroChartLegendLabels}
                  datasets={heroChartDatasets}
                />
              </div>
            </animated.div>
          ),
        }}
        column2={{
          header: (
            <animated.div style={{ ...springs3 }}>
              <div className="chart__chart-actions-lockup">
                <ChartDataToggles
                  title={TimeframeAsString(trendlineTimeframe)}
                  onClick={(arg1, arg2) =>
                    trendlineTimeframeOnClick(arg1, arg2)
                  }
                  active={trendlineTimeframe}
                />
              </div>
            </animated.div>
          ),
          content: (
            <div className="grid grid__two-col">
              <animated.div
                style={{ ...animateTrednline1 }}
                className="grid__col-content grid__col-content--chart"
              >
                <div className="grid__col-container-body">
                  <ChartHeader
                    value={trendline1HeaderValue}
                    title={trendline1HeaderTitle}
                    description="That have traded on an NFT Marketplace."
                  />

                  <TrendLineChart
                    legendOnClick={trendLine1LegendOnClick} // refactor onClick
                    labels={trendline1Labels} //activeWalletTradersLabels
                    legendLabels={trendline1LegendLabels}
                    legendFormat="vertical"
                    datasets={trendline1Datasets} // see Active Wallets
                  />
                  <div className="chart__container-footer">
                    <p className="typography__label--medium typography__transform--uppercase">
                      90 Day Trend
                    </p>
                    <DateRange />
                  </div>
                </div>
              </animated.div>
              {trendline2Datasets.length && (
                <animated.div
                  style={{ ...animateTrednline2 }}
                  className="grid__col-content grid__col-content--chart"
                >
                  <div className="grid__col-container-body">
                    <ChartHeader
                      value={trendline2HeaderValue}
                      title={trendline2HeaderTitle}
                      description="And their first NFT transaction."
                    />

                    <TrendLineChart
                      legendOnClick={trendLine2LegendOnClick}
                      labels={trendline2Labels}
                      legendLabels={trendline2LegendLabels}
                      legendFormat="vertical"
                      datasets={trendline2Datasets}
                    />
                    <div className="chart__container-footer">
                      <p className="typography__label--medium typography__transform--uppercase">
                        90 Day Trend
                      </p>
                      <DateRange />
                    </div>
                  </div>
                </animated.div>
              )}
            </div>
          ),
        }}
      />
    </>
  );
};

export default Overview;
