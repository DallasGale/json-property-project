"use client";
import { useState, useEffect } from "react";

// Components
import HeroBarChart from "@components/charts/heroBarChart";
import ChartDataToggles from "@components/toggles/chart_data";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";

// Assets
import TimeframeAsString from "@utils/timeframeAsString";
import TwoColumnGrid from "@/grids/twoColumnGrid";
import { TradersTimeframeTypes } from "./types";
import NewWallets, { NewWalletsTypes } from "./wallets/newWallets";
import ActiveWallets from "./wallets/activeWallets";

interface TradersTypes {
  labels: string[];
  activeWalletsOnlyBought: number[];
  activeWalletsOnlySold: number[];
  activeWalletsBoughtAndSold: number[];
  activeWallets: TradersTimeframeTypes;
  newWallets: NewWalletsTypes;
}

const Traders: React.FC<TradersTypes> = ({
  labels,
  activeWalletsOnlyBought,
  activeWalletsOnlySold,
  activeWalletsBoughtAndSold,
  activeWallets: activeWalletsTotal,
  newWallets,
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
    delay: 150,
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
    activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
  );

  const [onlySoldDataArray, setOnlySoldDataArray] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );
  const [boughtAndSoldDataArray, setBoughtAndSoldDataArray] = useState(
    activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
  );
  const [tradersTimeframe, setTradersTimeframe] = useState(90);
  useEffect(() => {
    if (tradersTimeframe === 0) {
      setOnlyBoughtDataArray(activeWalletsOnlyBought);
      setOnlySoldDataArray(activeWalletsOnlySold);
      setBoughtAndSoldDataArray(activeWalletsBoughtAndSold);
      setTradersLabels(labels);
    }
    if (tradersTimeframe === 1) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 1)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 1)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 1)
      );
      setTradersLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 7) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 7)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 7)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 7)
      );
      setTradersLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 30) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 30)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 30)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 39)
      );
      setTradersLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (tradersTimeframe === 90) {
      setOnlyBoughtDataArray(
        activeWalletsOnlyBought.slice(activeWalletsOnlyBought.length - 90)
      );
      setOnlySoldDataArray(
        activeWalletsOnlySold.slice(activeWalletsOnlySold.length - 90)
      );
      setBoughtAndSoldDataArray(
        activeWalletsBoughtAndSold.slice(activeWalletsBoughtAndSold.length - 90)
      );
      setTradersLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
  }, [tradersTimeframe]);

  function handleDailyTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTradersTimeframe(value);
  }

  const legendLabels = [
    {
      color: "accent-green",
      name: "Only Bought",
      id: "only-bought",
    },
    {
      color: "accent-red",
      name: "Only Sold",
      id: "only-sold",
    },
    {
      color: "accent-purple",
      name: "Bought and Sold",
      id: "bought-and-sold",
    },
  ];

  const [timeframe, setTimeframe] = useState<number>(7);
  const [timeframeClicked, setTimeframeClicked] = useState(false);
  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframeClicked(true);
    setTimeframe(value);
    setTimeout(() => {
      setTimeframeClicked(false);
    }, 500);
  }

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
                  timeframeClicked={timeframeClicked}
                  timeframe={tradersTimeframe}
                  labels={tradersLabels}
                  legendOnClick={onClick}
                  legendLabels={legendLabels}
                  datasets={[
                    {
                      label: "Only Bought",
                      data: onlyBoughtDisabled ? [] : onlyBoughtDataArray,
                      borderColor: "white",
                      backgroundColor: "rgba(64, 192, 87, 1)",
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
                      backgroundColor: "rgba(95, 61, 196, 1)",
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
              {/* Active Wallets */}
              <ActiveWallets
                timeframe={timeframe}
                labels={labels}
                activeWalletsTotal={activeWalletsTotal}
                activeWallets={{
                  onlyBought: activeWalletsOnlyBought,
                  onlySold: activeWalletsOnlySold,
                  boughtAndSold: activeWalletsBoughtAndSold,
                }}
              />

              {/* New Wallets */}
              <NewWallets
                timeframe={timeframe}
                labels={labels}
                newWallets={newWallets}
              />
            </div>
          ),
        }}
      />
    </>
  );
};

export default Traders;
