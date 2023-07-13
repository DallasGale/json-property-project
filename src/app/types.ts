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
