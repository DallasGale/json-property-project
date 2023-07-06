import { kFormatter } from "./kFormatter";

const calculateVolumeTotal = (timeframe: number, volume: number[]) => {
  if (timeframe === 0) {
    return kFormatter(volume.reduce((a: any, b: any) => a + b, 0));
  } else {
    return kFormatter(
      volume
        .slice(volume.length - timeframe)
        .reduce((a: any, b: any) => a + b, 0)
    );
  }
};

export default calculateVolumeTotal;
