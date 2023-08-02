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
