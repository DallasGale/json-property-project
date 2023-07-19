import { numFormatter } from "./numFormatter";

const calculateVolumeTotal = (timeframe: number, volume: number[]) => {
  if (timeframe === 0) {
    return numFormatter(volume.reduce((a: any, b: any) => a + b, 0));
  } else {
    return numFormatter(
      volume
        .slice(volume.length - timeframe)
        .reduce((a: any, b: any) => a + b, 0)
    );
  }
};

export default calculateVolumeTotal;
