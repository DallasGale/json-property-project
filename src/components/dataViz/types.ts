import {
  CollectionTypes,
  FakeVolumeTypes,
  LoanVolumeTypes,
  RoyaltyTypes,
  TrueVolumeTypes,
} from "@/app/types";
import { TradersTimeframeTypes } from "../traders/types";
import { NewWalletsTypes } from "../traders/wallets/newWallets";
import { PercentChangeTimeframeTypes } from "../views/marketOverview";

export interface DataVizLayoutTypes {
  labels: string[];
  trueVolume: any[];
  loanVolume: any[];
  totalVolume: any[];
  fakeVolume: any[];
  realPercentDifference: number[];
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: {
    top100: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    trueVolume: {
      oneDay: TrueVolumeTypes[];
      sevenDay: TrueVolumeTypes[];
      thirtyDay: TrueVolumeTypes[];
      ninetyDay: TrueVolumeTypes[];
      all: TrueVolumeTypes[];
    };
    fakeVolume: {
      oneDay: FakeVolumeTypes[];
      sevenDay: FakeVolumeTypes[];
      thirtyDay: FakeVolumeTypes[];
      ninetyDay: FakeVolumeTypes[];
      all: FakeVolumeTypes[];
    };
    loanVolume: {
      oneDay: LoanVolumeTypes[];
      sevenDay: LoanVolumeTypes[];
      thirtyDay: LoanVolumeTypes[];
      ninetyDay: LoanVolumeTypes[];
      all: LoanVolumeTypes[];
    };
    royalty: {
      oneDay: RoyaltyTypes[];
      sevenDay: RoyaltyTypes[];
      thirtyDay: RoyaltyTypes[];
      ninetyDay: RoyaltyTypes[];
      all: RoyaltyTypes[];
    };
  };
  traders: {
    activeWalletOnlyBought: number[];
    activeWalletOnlySold: number[];
    activeWalletBoughtAndSold: number[];
    activeWallets: TradersTimeframeTypes;
    newWallets: NewWalletsTypes;
    trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalVolumeTimeframeSummaryData: TradersTimeframeTypes;
    totalPercentChangeTimeframeData: PercentChangeTimeframeTypes;
    truePercentChangeTimeframeData: PercentChangeTimeframeTypes;
    fakeVolumeTimeframeSummaryData: TradersTimeframeTypes;
    loanVolumeTimeframeSummaryData: TradersTimeframeTypes;
  };
}
