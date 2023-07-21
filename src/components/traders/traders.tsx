"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Components
import HeroBarChart from "@components/charts/heroBarChart";
import ChartDataToggles from "@components/toggles/chart_data";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import { numFormatter } from "@/utils/numFormatter";

// Assets
import TimeframeAsString from "@/utils/timeframeAsString";
import TrendLineChart from "../charts/trendLineChart";
import TwoColumnGrid from "@/grids/twoColumnGrid";
import CryptoIcon from "@assets/icons/crypto.svg";
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

  // ----------------------------
  // Active Wallets
  // ----------------------------
  const [activeWalletOnlyBoughtDisabled, setActiveWalletOnlyBoughtDisabled] =
    useState(false);
  const [activeWalletOnlySoldDisabled, setActiveWalletOnlySoldDisabled] =
    useState(false);
  const [
    activeWalletBoughtAndSoldDisabled,
    setActiveWalletBoughtAndSoldDisabled,
  ] = useState(false);

  // Active Wallets / New Wallets Timeframe
  const [activeWalletTradersLabels, setActiveWalletTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );

  const [timeframe, setTimeframe] = useState<number>(7);
  function handleTrendlineTimeferame(e: React.MouseEvent, value: any) {
    e.preventDefault();
    setTimeframe(value);
  }
  // Active Wallets
  const [uniqueTotalBuyerSellerData, setuUniqueTotalBuyerSellerData] =
    useState(0);

  useEffect(() => {
    if (timeframe === 0) {
      setuUniqueTotalBuyerSellerData(activeWalletsTotal.all[0]);

      setActiveWalletTradersLabels(labels);
    }
    if (timeframe === 1) {
      setuUniqueTotalBuyerSellerData(activeWalletsTotal.oneDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 1).map((data: any) => data)
      );
    }

    if (timeframe === 7) {
      setuUniqueTotalBuyerSellerData(activeWalletsTotal.sevenDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 7).map((data: any) => data)
      );
    }
    if (timeframe === 30) {
      setuUniqueTotalBuyerSellerData(activeWalletsTotal.thirtyDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 30).map((data: any) => data)
      );
    }
    if (timeframe === 90) {
      setuUniqueTotalBuyerSellerData(activeWalletsTotal.ninetyDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 90).map((data: any) => data)
      );
    }
  }, [timeframe]);

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
              {/* <animated.div
                style={{ ...springs3 }}
                className="grid__col-content"
              >
                <div className="grid__col-container-body">
                  <div>
                    <p className="typography__label--2">
                      <Image src={CryptoIcon} alt="Crypto Icon" />
                      {numFormatter(uniqueTotalBuyerSellerData)}
                    </p>
                    <h3 className="typography__subtitle--2">Active Wallets</h3>
                    <p className="typography__paragraph--1">
                      Wallets that have bought/sold within the last 24 hours.
                    </p>
                  </div>

                  <TrendLineChart
                    legendOnClick={activeWalletOnClick}
                    labels={activeWalletTradersLabels}
                    legendLabels={...activeWalletLegendLabels}
                    legendFormat="vertical"
                    datasets={[
                      {
                        label: "Only Bought",
                        data: activeWalletOnlyBoughtDisabled
                          ? []
                          : activeWalletOnlyBoughtDataArray,
                        borderColor: "rgba(95, 61, 196, 1)",
                        backgroundColor: "rgba(95, 61, 196, 1)",
                        pointRadius: 0,
                        borderWidth: 3,
                      },
                      {
                        label: "Only Sold",
                        data: activeWalletOnlySoldDisabled
                          ? []
                          : activeWalletOnlySoldDataArray,
                        borderColor: "rgba(250, 82, 82, 1)",
                        backgroundColor: "rgba(250, 82, 82, 1)",
                        pointRadius: 0,
                        borderWidth: 3,
                      },
                      {
                        label: "Bought and Sold",
                        data: activeWalletBoughtAndSoldDisabled
                          ? []
                          : activeWalletBoughtAndSoldDataArray,
                        borderColor: "rgba(64, 192, 87, 1)",
                        backgroundColor: "rgba(64, 192, 87, 1)",
                        pointRadius: 0,
                        borderWidth: 3,
                      },
                    ]}
                  />
                </div>
              </animated.div> */}
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
