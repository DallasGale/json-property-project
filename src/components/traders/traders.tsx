"use client";
import { useState, useEffect } from "react";

// Components
import HeroBarChart from "@components/charts/heroBarChart";
import ChartDataToggles from "@components/toggles/chart_data";
import DynamicVolumeNumber from "@components/dataViz/dynamicVolumeNumber/dynamicVolumeNumber";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";

// Assets
import TimeframeAsString from "@/utils/timeframeAsString";
import TrendLineChart from "../charts/trendLineChart";
import TwoColumnGrid from "@/grids/twoColumnGrid";

interface TradersTypes {
  labels: string[];
  realPercentDifference: number[];
  onlyBought: number[];
  onlyBoughtMovingAverage: number[];
  onlySold: number[];
  onlySoldMovingAverage: number[];
  boughtAndSold: number[];
  boughtAndSoldMovingAverage: number[];
}

const Traders: React.FC<TradersTypes> = ({
  labels,
  realPercentDifference,
  onlyBought,
  onlyBoughtMovingAverage,
  onlySold,
  onlySoldMovingAverage,
  boughtAndSold,
  boughtAndSoldMovingAverage,
}) => {
  // Animations
  const springs1 = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay: 0,
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
    delay: 150,
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
    delay: 300,
    config: {
      tension: 90,
      friction: 16,
      duration: 750,
      easing: easings.easeInOutCubic,
    },
  });

  const [onlyBoughtDisabled, setOnlyBoughtDisabled] = useState(false);
  const [onlySoldDisabled, setOnlySoldDisabled] = useState(false);
  const [boughtAndSoldDisabled, setBoughtAndSoldDisabled] = useState(false);

  const onClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === "only-bought") {
            setOnlyBoughtDisabled(!onlyBoughtDisabled);
          }
          if (domEls[i].id === "only-sold") {
            setOnlySoldDisabled(!onlySoldDisabled);
          }
          if (domEls[i].id === "bought-and-sold") {
            setBoughtAndSoldDisabled(!boughtAndSoldDisabled);
          }
        }
      }
    }
  };

  const [tradersLabels, setTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [onlyBoughtDataArray, setOnlyBoughtDataArray] = useState(
    onlyBought.slice(onlyBought.length - 90)
  );
  const [
    onlyBoughtMovingAverageDataArray,
    setOnlyBoughtMovingAverageDataArray,
  ] = useState(
    onlyBoughtMovingAverage.slice(onlyBoughtMovingAverage.length - 90)
  );

  const [onlySoldDataArray, setOnlySoldDataArray] = useState(
    onlySold.slice(onlySold.length - 90)
  );
  const [boughtAndSoldDataArray, setBoughtAndSoldDataArray] = useState(
    onlySold.slice(onlySold.length - 90)
  );
  const [tradersTimeframe, setTradersTimeframe] = useState(90);
  useEffect(() => {
    if (tradersTimeframe === 90) {
      setOnlyBoughtDataArray(onlyBought.slice(onlyBought.length - 90));
      setOnlySoldDataArray(onlySold.slice(onlySold.length - 90));
      setBoughtAndSoldDataArray(boughtAndSold.slice(boughtAndSold.length - 90));
      setTradersLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 30) {
      setOnlyBoughtDataArray(onlyBought.slice(onlyBought.length - 30));
      setOnlySoldDataArray(onlySold.slice(onlySold.length - 30));
      setBoughtAndSoldDataArray(boughtAndSold.slice(boughtAndSold.length - 39));
      setTradersLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 7) {
      setOnlyBoughtDataArray(onlyBought.slice(onlyBought.length - 7));
      setOnlySoldDataArray(onlySold.slice(onlySold.length - 7));
      setBoughtAndSoldDataArray(boughtAndSold.slice(boughtAndSold.length - 7));
      setTradersLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }

    if (tradersTimeframe === 1) {
      setOnlyBoughtDataArray(onlyBought.slice(onlyBought.length - 1));
      setOnlySoldDataArray(onlySold.slice(onlySold.length - 1));
      setBoughtAndSoldDataArray(boughtAndSold.slice(boughtAndSold.length - 1));
      setTradersLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }

    if (tradersTimeframe === 0) {
      setOnlyBoughtDataArray(onlyBought);
      setOnlySoldDataArray(onlySold);
      setBoughtAndSoldDataArray(boughtAndSold);
      setTradersLabels(labels);
    }
  }, [tradersTimeframe]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTradersTimeframe(value);
  }

  const [timeframe, setTimeframe] = useState<number>(1);
  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }

  const legendLabels = [
    {
      color: "accent-purple",
      name: "Only Bought",
      id: "only-bought",
    },
    {
      color: "accent-red",
      name: "Only Sold",
      id: "only-sold",
    },
    {
      color: "accent-green",
      name: "Bought and Sold",
      id: "bought-and-sold",
    },
  ];
  return (
    <>
      <TwoColumnGrid
        column1={{
          header: (
            <animated.div style={{ ...springs1 }}>
              <div className="chart__chart-actions-lockup">
                <ChartDataToggles
                  title="Traders"
                  onClick={(arg1, arg2) => handleDailyTimeferame(arg1, arg2)}
                  active={tradersTimeframe}
                />
              </div>
            </animated.div>
          ),
          content: (
            <animated.div style={{ ...springs2 }} className="grid__col-content">
              <div>
                <HeroBarChart
                  labels={tradersLabels}
                  legendOnClick={onClick}
                  legendLabels={...legendLabels}
                  datasets={[
                    {
                      label: "Only Bought",
                      data: onlyBoughtDisabled ? [] : onlyBoughtDataArray,
                      borderColor: "white",
                      backgroundColor: "rgba(95, 61, 196, 1)",
                    },
                    {
                      label: "Only Sold",
                      data: onlySoldDisabled ? [] : onlySoldDataArray,
                      borderColor: "black",
                      backgroundColor: "rgba(250, 82, 82, 1)",
                    },
                    {
                      label: "Bought and Sold",
                      data: boughtAndSoldDisabled ? [] : boughtAndSoldDataArray,
                      borderColor: "white",
                      backgroundColor: "rgba(64, 192, 87, 1)",
                    },
                  ]}
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
                  title={TimeframeAsString(timeframe)}
                  onClick={(arg1, arg2) =>
                    handleTrendlineTimeferame(arg1, arg2)
                  }
                  active={timeframe}
                />
              </div>
            </animated.div>
          ),
          content: (
            <div className="grid grid__two-col">
              <animated.div
                style={{ ...springs3 }}
                className="grid__col-content"
              >
                <div className="grid__col-container-body">
                  <div>
                    <DynamicVolumeNumber
                      timeframe={timeframe}
                      volumes={realPercentDifference}
                    />
                    <h3 className="typography__subtitle--2">Active Wallets</h3>
                    <p className="typography__paragraph--1">
                      Wallets that have bought/sold within the last 24 hours.
                    </p>
                  </div>
                  <TrendLineChart
                    legendOnClick={() => null}
                    labels={tradersLabels}
                    legendLabels={...legendLabels}
                    legendFormat="vertical"
                    datasets={[
                      {
                        label: "Only Bought",
                        data: false
                          ? []
                          : onlyBoughtMovingAverageDataArray.slice(
                              onlyBoughtMovingAverageDataArray.length - 90
                            ),
                        borderColor: false
                          ? "rgba(95, 61, 196, 0)"
                          : "rgba(95, 61, 196, 1)",
                        backgroundColor: false
                          ? "rgba(95, 61, 196, 0)"
                          : "rgba(95, 61, 196, 1)",
                        pointRadius: 0,
                        borderWidth: 3,
                      },
                      {
                        label: "Only Sold",
                        data: false
                          ? []
                          : onlySoldMovingAverage.slice(
                              onlySoldMovingAverage.length - 90
                            ),
                        borderColor: false
                          ? "rgba(253, 126, 20, 0)"
                          : "rgba(253, 126, 20, 1)",
                        backgroundColor: false
                          ? "rgba(253, 126, 20, 0)"
                          : "rgba(253, 126, 20, 1)",
                        pointRadius: 0,
                        borderWidth: 3,
                      },
                      {
                        label: "Bought And Sold",
                        data: false
                          ? []
                          : boughtAndSoldMovingAverage.slice(
                              boughtAndSoldMovingAverage.length - 90
                            ),
                        borderColor: false
                          ? "rgba(64, 192, 87, 0)"
                          : "rgba(64, 192, 87, 1)",
                        backgroundColor: false
                          ? "rgba(64, 192, 87, 0)"
                          : "rgba(64, 192, 87, 1)",
                        pointRadius: 0,
                        borderWidth: 3,
                      },
                    ]}
                  />
                </div>
              </animated.div>
              <animated.div
                style={{ ...springs3 }}
                className="grid__col-content"
              >
                <div className="grid__col-container-body">
                  <div>
                    <DynamicVolumeNumber
                      timeframe={timeframe}
                      volumes={realPercentDifference}
                    />
                    <h3 className="typography__subtitle--2">New Wallets</h3>
                    <p className="typography__paragraph--1">
                      Wallets that have been created within the last 24 hours.
                    </p>
                  </div>
                  <TrendLineChart
                    legendOnClick={() => null}
                    labels={tradersLabels}
                    legendLabels={[]}
                    legendFormat="vertical"
                    datasets={[]}
                  />
                </div>
              </animated.div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default Traders;
