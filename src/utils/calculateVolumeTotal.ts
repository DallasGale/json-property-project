import { VolumeFormatter } from "./VolumeFormatter";

const calculateVolumeTotal = (timeframe: number, volume: number[]) => {
  if (timeframe === 0) {
    return VolumeFormatter(volume.reduce((a: any, b: any) => a + b, 0));
  } else {
    return VolumeFormatter(
      volume
        .slice(volume.length - timeframe)
        .reduce((a: any, b: any) => a + b, 0)
    );
  }
};

export default calculateVolumeTotal;
