"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Utils
import { useSpring, animated } from "@react-spring/web";
import { VolumeFormatter } from "@utils/volumeFormatter";

// Assets
import TrendLineChart from "@components/charts/trendLineChart";

// Constants
import { legendLabels } from "./legendLabels";
import { toFrom, config } from "@constants/animationSettings";
import { TradersTimeframeTypes } from "../types";
import ChartHeader from "@/components/charts/chartHeader";

// Types
export type ActiveWalletsTypes = {
  onlyBought: number[];
  onlySold: number[];
  boughtAndSold: number[];
};
interface Props {
  activeWalletsTotal: TradersTimeframeTypes;
  activeWallets: ActiveWalletsTypes;
  timeframe: number;
  labels: string[];
}

const ActiveWallets: React.FC<Props> = ({
  activeWalletsTotal,
  activeWallets,
  timeframe,
  labels,
}) => {
  const animate = useSpring({
    ...toFrom,
    config: config,
    delay: 300,
  });

  // ----------------------------------------------------------------------------
  // State
  // ----------------------------------------------------------------------------
  const [activeWalletsData, setActiveWalletsData] = useState<number>(1);
  const [activeWalletTradersLabels, setActiveWalletTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: string) => data)
  );
  const [onlyBoughtDataArray, setOnlyBoughtDataArray] = useState(
    activeWallets.onlyBought.slice(activeWallets.onlyBought.length - 90)
  );
  const [onlySoldDataArray, setOnlySoldDataArray] = useState(
    activeWallets.onlySold.slice(activeWallets.onlySold.length - 90)
  );
  const [boughtAndSoldDataArray, setBoughtAndSoldDataArray] = useState(
    activeWallets.boughtAndSold.slice(activeWallets.boughtAndSold.length - 90)
  );

  // ----------------------------------------------------------------------------
  // Disabled State
  // ----------------------------------------------------------------------------
  const [onlyBoughtDisabled, setOnlyBoughtDisabled] = useState(false);
  const [onlySoldDisabled, setOnlySoldDisabled] = useState(false);
  const [boughtAndSoldDisabled, setBoughtAndSoldDisabled] = useState(false);
  const [totalCreatedDisabled, setTotalCreatedDisabled] = useState(false);

  // ----------------------------------------------------------------------------
  // Click Handler
  // ----------------------------------------------------------------------------
  const legendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.activeWallets[0].id) {
            setOnlyBoughtDisabled(!onlyBoughtDisabled);
          }
          if (domEls[i].id === legendLabels.activeWallets[1].id) {
            setOnlySoldDisabled(!onlySoldDisabled);
          }
          if (domEls[i].id === legendLabels.activeWallets[2].id) {
            setBoughtAndSoldDisabled(!boughtAndSoldDisabled);
          }
        }
      }
    }
  };

  // ----------------------------------------------------------------------------
  // Lifecycle
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (timeframe === 0) {
      setActiveWalletsData(activeWalletsTotal.all[0]);

      setOnlyBoughtDataArray(activeWallets.onlyBought);
      setOnlySoldDataArray(activeWallets.onlySold);
      setBoughtAndSoldDataArray(activeWallets.boughtAndSold);
      setActiveWalletTradersLabels(labels);
    }
    if (timeframe === 1) {
      setActiveWalletsData(activeWalletsTotal.oneDay[0]);

      setOnlyBoughtDataArray(
        activeWallets.onlyBought.slice(activeWallets.onlyBought.length - 1)
      );
      setOnlySoldDataArray(
        activeWallets.onlySold.slice(activeWallets.onlySold.length - 1)
      );
      setBoughtAndSoldDataArray(
        activeWallets.boughtAndSold.slice(
          activeWallets.boughtAndSold.length - 1
        )
      );
      setActiveWalletTradersLabels(
        labels.slice(labels.length - 1).map((data: string) => data)
      );
    }
    if (timeframe === 7) {
      setActiveWalletsData(activeWalletsTotal.sevenDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 7).map((data: string) => data)
      );
      setOnlyBoughtDataArray(
        activeWallets.onlyBought.slice(activeWallets.onlyBought.length - 7)
      );
      setOnlySoldDataArray(
        activeWallets.onlySold.slice(activeWallets.onlySold.length - 7)
      );
      setBoughtAndSoldDataArray(
        activeWallets.boughtAndSold.slice(
          activeWallets.boughtAndSold.length - 7
        )
      );
    }
    if (timeframe === 30) {
      setActiveWalletsData(activeWalletsTotal.thirtyDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 30).map((data: string) => data)
      );
      setOnlyBoughtDataArray(
        activeWallets.onlyBought.slice(activeWallets.onlyBought.length - 30)
      );
      setOnlySoldDataArray(
        activeWallets.onlySold.slice(activeWallets.onlySold.length - 30)
      );
      setBoughtAndSoldDataArray(
        activeWallets.boughtAndSold.slice(
          activeWallets.boughtAndSold.length - 30
        )
      );
    }
    if (timeframe === 90) {
      setActiveWalletsData(activeWalletsTotal.ninetyDay[0]);

      setActiveWalletTradersLabels(
        labels.slice(labels.length - 90).map((data: string) => data)
      );
      setOnlyBoughtDataArray(
        activeWallets.onlyBought.slice(activeWallets.onlyBought.length - 90)
      );
      setOnlySoldDataArray(
        activeWallets.onlySold.slice(activeWallets.onlySold.length - 90)
      );
      setBoughtAndSoldDataArray(
        activeWallets.boughtAndSold.slice(
          activeWallets.boughtAndSold.length - 90
        )
      );
    }
  }, [timeframe]);

  return (
    <animated.div
      style={{ ...animate }}
      className="grid__col-content grid__col-content--chart"
    >
      <div className="grid__col-container-body">
        <ChartHeader
          value={`${VolumeFormatter(activeWalletsData)}`}
          title="Active Wallets"
          description="That have traded on an NFT Marketplace."
        />

        <div className="chart__seperator" />
        <TrendLineChart
          legendOnClick={legendOnClick}
          labels={activeWalletTradersLabels}
          legendLabels={...legendLabels.activeWallets}
          legendFormat="vertical"
          datasets={[
            {
              label: legendLabels.activeWallets[0].name,
              data: onlyBoughtDisabled ? [] : onlyBoughtDataArray,
              borderColor: legendLabels.activeWallets[0].rgba,
              backgroundColor: legendLabels.activeWallets[0].rgba,
              pointRadius: 0,
              borderWidth: 3,
            },
            {
              label: legendLabels.activeWallets[1].name,
              data: onlySoldDisabled ? [] : onlySoldDataArray,
              borderColor: legendLabels.activeWallets[1].rgba,
              backgroundColor: legendLabels.activeWallets[1].rgba,
              pointRadius: 0,
              borderWidth: 3,
            },
            {
              label: legendLabels.activeWallets[2].name,
              data: boughtAndSoldDisabled ? [] : boughtAndSoldDataArray,
              borderColor: legendLabels.activeWallets[2].rgba,
              backgroundColor: legendLabels.activeWallets[2].rgba,
              pointRadius: 0,
              borderWidth: 3,
            },
          ]}
        />
        <div className="chart__container-footer">
          <p className="typography__label--medium typography__transform--uppercase">
            90 Day Trend
          </p>
          <p className="typography__caption--medium">5 May – Aug 2, 2023</p>
        </div>
      </div>
    </animated.div>
  );
};
export default ActiveWallets;
