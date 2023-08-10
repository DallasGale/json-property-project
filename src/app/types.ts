export type PercentChangeTimeframeTypes = {
  oneDay: number[];
  sevenDay: number[];
  thirtyDay: number[];
  ninetyDay: number[];
};

// ------------------------------
// Page Interfaces - MarketOverview
// ------------------------------
export interface IMarketOverviewProps {
  labels: string[];
  trueVolume: number[];
  loanVolume: number[];
  fakeVolume: number[];
  realPercentDifference: number[];
  loanVolumeMovingAverage: number[];
  fakeVolumeMovingAverage: number[];
  totalVolumeMovingAverage: number[];
  trueVolumeMovingAverage: number[];
  leaderboard: LeaderboarCategoryTypes;
  activeWalletsOnlyBought: number[];
  activeWalletsOnlySold: number[];
  activeWalletsBoughtAndSold: number[];
  traders: TradersTypes;
  revenue: RevenueTypes;
}

// ------------------------------
// Component Types - Revenue
// ------------------------------
export type RevenueTypes = {
  royaltyVolume: number[];
  platformVolume: number[];

  trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
  loanVolumeTimeframeSummaryData: TradersTimeframeTypes;
  fakeVolumeTimeframeSummaryData: TradersTimeframeTypes;
  totalVolumeTimeframeSummaryData: TradersTimeframeTypes;
  totalPercentChangeTimeframeData: PercentChangeTimeframeTypes;
  truePercentChangeTimeframeData: PercentChangeTimeframeTypes;
};

// ------------------------------
// Component Types - Chart Header
// ------------------------------
export type ChartHeaderTypes = {
  title: string;
  description: string;
  value?: string;
  valueDiff?: number;
  withCryptoIcon?: boolean;
};

// ------------------------------
// Component Types - Hero Bar Chart
// ------------------------------
export type DailyTrueVolumeTypes = {
  labels: string[];
  datasets: BarChartDatasetsType[];
  legendLabels: LegendLabelTypes[];
  legendModifierClass?: string;
  timeframe: number;
  timeframeClicked: boolean;
  legendOnClick: (e: string) => void;
};

// ------------------------------
// Component Types - Leaderboard Categories
// ------------------------------
export type LeaderboarCategoryTypes = {
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

// ------------------------------
// Component Types - Leaderboard
// ------------------------------
export type LeaderboardTypes = {
  showTimeframeToggles?: boolean;
  leaderboardData: LeaderboarCategoryTypes;
  traders: {
    trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
    loanVolumeTimeframeSummaryData: TradersTimeframeTypes;
    fakeVolumeTimeframeSummaryData: TradersTimeframeTypes;
  };
};

// ------------------------------
// Component Types - Legend
// ------------------------------
export interface ILegendProps {
  labels: LabelTypes[];
  modifierClass?: string;
  legendFormat?: LegendFormatTypes;
  legendItemVolume?: LegendItemVolumeTypes[];
  onClick: (e: string) => void;
}

export type LegendItemVolumeTypes = {
  id: string;
  value: number;
};

export type LabelTypes = {
  color: string;
  name: string;
  id: string;
  value?: number;
};

// ------------------------------
// Component Types - Progress RIng
// ------------------------------
export type ProgressRingTypes = {
  trueVolume: number | number[];
  loanVolume: number | number[];
  fakeVolume: number | number[];
  percentage?: string;
  modiferClass?: string;
};

// ------------------------------
// Component Types - Trendline Chart
// ------------------------------
export type TrendLineChartTypes = {
  labels: string[];
  datasets: LineChartDatasetsType[];
  legendLabels: LegendLabelTypes[];
  legendFormat?: LegendFormatTypes;
  legendItemVolume?: LegendItemVolumeTypes[];
  legendOnClick: (e: string) => void;
};

// ------------------------------
// Component Types - True Volume Chart
// ------------------------------
export type TrueVolumeChartTypes = {
  labels: string[];
  trend_timespan: number | null;
  data: {
    true_volume: number[];
  };
};

// ------------------------------
// Component Types -  Volume Table Chart
// ------------------------------
export type VolumeTableChartProps = {
  title: string;
  valueTitle: string;
  color: string;
  col1data: React.ReactNode;
  col2data: React.ReactNode;
  col3data?: React.ReactNode;
  volumeCategory: string;
  infoTooltipText?: string;
};

// ------------------------------
// Component Types -  Data Table
// ------------------------------
export type DataTableTypes = {
  tableTitle?: string;
  tableBodyData: {
    sortedByTrueVol: DataTableTop100Types;
    sortedByTrueVolPct: DataTableTop100Types;
    sortedByTotalVol: DataTableTop100Types;
    sortedByTrueSales: DataTableTop100Types;
    sortedByLoans: DataTableTop100Types;
    sortedByRevenue: DataTableTop100Types;
    sortedByFake: DataTableTop100Types;
    sortedByTotalSalesCount: DataTableTop100Types;
  };
};

// ------------------------------
// Component Types -  Data Table Top 100
// ------------------------------
export type DataTableTop100Types = {
  oneDayTop100: CollectionTypes[];
  sevenDayTop100: CollectionTypes[];
  thirtyDayTop100: CollectionTypes[];
  ninetyDayTop100: CollectionTypes[];
  allTop100: CollectionTypes[];
};
// ------------------------------
// Component Types -  Data Table Body
// ------------------------------
export type DataTableBodyTypes = {
  data: CollectionTypes[];
  active: string;
  timeframe: number;
};

// ------------------------------
// Component Types -  Data Table Top 100 Column
// ------------------------------
export type DataTableColumnLabelsTypes = {
  name: string;
  id: string;
  hasChevronDown: boolean;
  active: boolean;
};
// ------------------------------
// Component Types -  Data Table Head
// ------------------------------
export type DataTableHeadTypes = {
  labels: DataTableColumnLabelsTypes[];
  active: string;
  handleSortByClick: (e: string) => void;
};

// ------------------------------
// Component Types -  Navigation
// ------------------------------
export type NavigationTypes = {
  name: string;
  id: string;
  link: string;
};

// ------------------------------
// Component Types -  Nav Link
// ------------------------------
export interface INavLinkProps extends NavigationTypes {
  activeClassName: boolean;
}

//
export type ChartDataTogglesTypes = {
  title: string;
  active: number;
  onClick: (arg1: React.MouseEvent, arg2: number) => void;
};

// ------------------------------
// Component Types -  Tables Dot Points
// ------------------------------
export type TabledDotPointsTypes = {
  dotpoints: DotPointTypes[];
  onClick: (e: string) => void;
};

export type DotPointTypes = {
  name: string;
  value?: number;
  color: string;
  id: string;
};

// ------------------------------
// Component Types - Wallets
// ------------------------------
export type WalletTypes = {
  activeWalletsTotal?: TradersTimeframeTypes;
  activeWallets?: ActiveWalletsTypes;
  newWallets?: NewWalletsTypes;
  timeframe: number;
  labels: string[];
};
export type ActiveWalletsTypes = {
  onlyBought: number[];
  onlySold: number[];
  boughtAndSold: number[];
};
export interface NewWalletsTypes extends TradersTimeframeTypes {
  dailyStats: {
    minter: number[];
    other: number[];
    buyer: number[];
    new: number[];
    totalCreated: number[];
  };
}

// ------------------------------
// Component Types - Tooltip Body
// ------------------------------
export type TooltipBodyTypes = {
  name: string;
  trueVolume: number | number[];
  fakeVolume: number | number[];
  loanVolume: number | number[];
  totalVolume: number;
  totalRevenue: number;
  totalRealDayVolume: number;
  totalFakeVolume: number;
  totalLoanVolume: number;
  totalRealDayVolumePercentage: number;
  totalFakeVolumePercentage: number;
  totalLoanVolumePercentage: number;
  timeframe?: number;
};
// ------------------------------
// Component Types - Traders
// ------------------------------
export type TradersTypes = {
  activeWalletOnlyBought: number[];
  activeWalletOnlySold: number[];
  activeWalletBoughtAndSold: number[];
  activeWallets: TradersTimeframeTypes;
  newWallets: NewWalletsTypes;
  trueVolumeTimeframeSummaryData: TradersTimeframeTypes;
  loanVolumeTimeframeSummaryData: TradersTimeframeTypes;
  fakeVolumeTimeframeSummaryData: TradersTimeframeTypes;
  totalVolumeTimeframeSummaryData: TradersTimeframeTypes;
  totalPercentChangeTimeframeData: PercentChangeTimeframeTypes;
  truePercentChangeTimeframeData: PercentChangeTimeframeTypes;
};

export type TradersTimeframeTypes = {
  oneDay: number[];
  sevenDay: number[];
  thirtyDay: number[];
  ninetyDay: number[];
  all: number[];
};

export interface ITradersTypes {
  labels: string[];
  activeWalletsOnlyBought: number[];
  activeWalletsOnlySold: number[];
  activeWalletsBoughtAndSold: number[];
  activeWallets: TradersTimeframeTypes;
  newWallets: NewWalletsTypes;
}
export interface IOverviewTypes {
  title: string;
  heroChartLabels: string[];
  heroChartTimeframe: number;
  heroChartDatasets: BarChartDatasetsType[];
  trendline1Datasets: LineChartDatasetsType[];
  trendline2Datasets: LineChartDatasetsType[];
  trendline1Labels: string[];
  trendline2Labels: string[];
  trendline1LegendLabels: LegendLabelTypes[];
  trendline2LegendLabels: LegendLabelTypes[];
  trendlineTimeframe: number;
  heroChartTimeframeClicked: boolean;
  trendline1HeaderValue?: string;
  trendline2HeaderValue?: string;
  heroChartLegendLabels: LegendLabelTypes[];
  trendline1HeaderTitle: string;
  trendline2HeaderTitle: string;
  trendLine1LegendOnClick: (e: string) => void;
  trendLine2LegendOnClick: (e: string) => void;
  heroChartLegendOnClick: (e: string) => void;
  heroChartTimeframeOnClick: (arg1: React.MouseEvent, arg2: number) => void;
  trendlineTimeframeOnClick: (arg1: React.MouseEvent, arg2: number) => void;
}

export type DatasetsType = {
  label: string;
  data: number[];
};
export interface Datasets {
  datasets: DatasetsType[];
}

export type TrueVolumeTypes = {
  name: string;
  total_real_day_volume: number;
  total_real_day_volume_percentage: number;
};
export type FakeVolumeTypes = {
  name: string;
  total_day_volume_fake: number;
  total_fake_day_volume_percentage: number;
};
export type LoanVolumeTypes = {
  name: string;
  total_day_volume_loan: number;
};

export type RoyaltyTypes = {
  name: string;
  total_day_total_royalty: number;
};

export type BarChartDatasetsType = {
  label: string;
  data: number[] | [];
  borderColor: string;
  backgroundColor: string;
};
export type LineChartDatasetsType = {
  label: string;
  data: number[] | [];
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
  borderWidth: number;
};
export type LegendLabelTypes = {
  color: string;
  name: string;
  id: string;
  value?: number;
};

export type LegendFormatTypes = "vertical" | "horizontal" | "tabled";

export type CollectionTypes = {
  contract_address: string;
  slug: string;
  name: string;
  partition_time_min: string;
  partition_time_max: string;
  total_day_trade_num: number | number;
  total_raw_day_volume: number | number;
  total_real_day_trade_num: number | number;
  total_real_day_volume: number | number;
  total_day_volume_loan: number | number;
  total_day_volume_loan_num: number | number;
  total_day_volume_wash_trading: number | number;
  total_day_volume_farming: number | number;
  total_day_volume_fake: number | number;
  total_day_total_royalty: number | number;
  total_day_total_platform: number | number;
  total_real_day_volume_percentage: number | null;
  total_fake_day_volume_percentage: number | null;
  total_loan_day_volume_percentage: number | null;
};

export interface LeaderboardsTypes {
  top100: {
    sortedByTrueVol: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByTrueVolPct: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByTotalVol: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByTrueSales: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByLoans: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByRevenue: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByFake: {
      oneDayTop100: CollectionTypes[];
      sevenDayTop100: CollectionTypes[];
      thirtyDayTop100: CollectionTypes[];
      ninetyDayTop100: CollectionTypes[];
      allTop100: CollectionTypes[];
    };
    sortedByTotalSalesCount: {
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
}
