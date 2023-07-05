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
