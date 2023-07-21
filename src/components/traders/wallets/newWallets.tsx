"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Utils
import { useSpring, animated, easings } from "@react-spring/web";
import { numFormatter } from "@/utils/numFormatter";

// Assets
import TrendLineChart from "@components/charts/trendLineChart";
import CryptoIcon from "@assets/icons/crypto.svg";

// Constants
import { legendLabels } from "./legendLabels";
import { TradersTimeframeTypes } from "../types";
import { toFrom, config } from "@constants/animationSettings";

// Types
export interface NewWalletsTypes extends TradersTimeframeTypes {
  dailyStats: {
    new: number[];
    totalCreated: number[];
  };
}
interface Props {
  newWallets: NewWalletsTypes;
  timeframe: number;
  labels: string[];
}

const NewWallets: React.FC<Props> = ({ newWallets, timeframe, labels }) => {
  const animate = useSpring({
    ...toFrom,
    config: config,
    delay: 300,
  });

  // ----------------------------------------------------------------------------
  // State
  // ----------------------------------------------------------------------------
  const [newWalletsData, setNewWalletsDate] = useState<number>(1);
  const [newWalletTradersLabels, setNewWalletTradersLabels] = useState(
    labels.slice(labels.length - 90).map((data: any) => data)
  );
  const [newWalletsDailyStats, setNewWalletsDailyStatsDataArray] = useState(
    newWallets.dailyStats.new.slice(newWallets.dailyStats.new.length - 90)
  );
  const [
    newWalletsDailyStatsTotalCreatedDataArray,
    setNewWalletsDailyStatsTotalCreatedDataArray,
  ] = useState(
    newWallets.dailyStats.totalCreated.slice(
      newWallets.dailyStats.totalCreated.length - 90
    )
  );
  // ----------------------------------------------------------------------------
  // Disabled State
  // ----------------------------------------------------------------------------
  const [newWalletsDisabled, setNewWalletsDisabled] = useState(false);
  const [totalCreatedDisabled, setTotalCreatedDisabled] = useState(false);

  // ----------------------------------------------------------------------------
  // Click Handler
  // ----------------------------------------------------------------------------
  const legendOnClick = (e: string) => {
    if (document) {
      const domEls = document?.getElementsByTagName("input");
      for (let i = 0; i < domEls.length; i++) {
        if (domEls[i].id === e) {
          if (domEls[i].id === legendLabels.newWallets[0].id) {
            setNewWalletsDisabled(!newWalletsDisabled);
          }
          if (domEls[i].id === legendLabels.newWallets[1].id) {
            setTotalCreatedDisabled(!totalCreatedDisabled);
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
      setNewWalletsDate(newWallets.all[0]);
      setNewWalletTradersLabels(labels);
      setNewWalletsDailyStatsDataArray(newWallets.dailyStats.new);
      setNewWalletsDailyStatsTotalCreatedDataArray(
        newWallets.dailyStats.totalCreated
      );
    }
    if (timeframe === 1) {
      setNewWalletsDate(newWallets.oneDay[0]);
      setNewWalletTradersLabels(
        labels.slice(labels.length - 1).map((data: string) => data)
      );
      setNewWalletsDailyStatsDataArray(
        newWallets.dailyStats.new.slice(newWallets.dailyStats.new.length - 1)
      );
      setNewWalletsDailyStatsTotalCreatedDataArray(
        newWallets.dailyStats.totalCreated.slice(
          newWallets.dailyStats.totalCreated.length - 1
        )
      );
    }
    if (timeframe === 7) {
      setNewWalletsDate(newWallets.sevenDay[0]);
      setNewWalletTradersLabels(
        labels.slice(labels.length - 7).map((data: string) => data)
      );
      setNewWalletsDailyStatsDataArray(
        newWallets.dailyStats.new.slice(newWallets.dailyStats.new.length - 7)
      );
      setNewWalletsDailyStatsTotalCreatedDataArray(
        newWallets.dailyStats.totalCreated.slice(
          newWallets.dailyStats.totalCreated.length - 7
        )
      );
    }
    if (timeframe === 30) {
      setNewWalletsDate(newWallets.thirtyDay[0]);
      setNewWalletTradersLabels(
        labels.slice(labels.length - 30).map((data: string) => data)
      );
      setNewWalletsDailyStatsDataArray(
        newWallets.dailyStats.new.slice(newWallets.dailyStats.new.length - 30)
      );
      setNewWalletsDailyStatsTotalCreatedDataArray(
        newWallets.dailyStats.totalCreated.slice(
          newWallets.dailyStats.totalCreated.length - 30
        )
      );
    }
    if (timeframe === 90) {
      setNewWalletsDate(newWallets.ninetyDay[0]);
      setNewWalletTradersLabels(
        labels.slice(labels.length - 90).map((data: string) => data)
      );
      setNewWalletsDailyStatsDataArray(
        newWallets.dailyStats.new.slice(newWallets.dailyStats.new.length - 90)
      );
      setNewWalletsDailyStatsTotalCreatedDataArray(
        newWallets.dailyStats.totalCreated.slice(
          newWallets.dailyStats.totalCreated.length - 90
        )
      );
    }
  }, [timeframe]);

  return (
    <animated.div style={{ ...animate }} className="grid__col-content">
      <div className="grid__col-container-body">
        <div>
          <p className="typography__label--2">
            <Image src={CryptoIcon} alt="Crypto Icon" />
            {numFormatter(newWalletsData)}
          </p>
          <h3 className="typography__subtitle--2">New Wallets</h3>
          <p className="typography__paragraph--1">
            Wallets that have been created within the last 24 hours.
          </p>
          <TrendLineChart
            legendOnClick={legendOnClick}
            labels={newWalletTradersLabels}
            legendLabels={...legendLabels.newWallets}
            legendFormat="vertical"
            datasets={[
              {
                label: legendLabels.newWallets[0].name,
                data: totalCreatedDisabled
                  ? []
                  : newWalletsDailyStatsTotalCreatedDataArray,
                borderColor: legendLabels.newWallets[0].rgba,
                backgroundColor: legendLabels.newWallets[0].rgba,
                pointRadius: 0,
                borderWidth: 3,
              },
              {
                label: legendLabels.newWallets[1].name,
                data: newWalletsDisabled ? [] : newWalletsDailyStats,
                borderColor: legendLabels.newWallets[1].rgba,
                backgroundColor: legendLabels.newWallets[1].rgba,
                pointRadius: 0,
                borderWidth: 3,
              },
            ]}
          />
        </div>
      </div>
    </animated.div>
  );
};
export default NewWallets;
