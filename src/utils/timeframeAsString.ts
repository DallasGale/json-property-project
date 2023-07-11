const TimeframeAsString = (timeframe: number): string => {
  if (timeframe === 1) return "Last 24 Hours";
  else if (timeframe === 7) return "Last 7 Days";
  else if (timeframe === 30) return "Last 30 Days";
  else if (timeframe === 90) return "Last 90 Days";
  else return "All Time";
};

export default TimeframeAsString;
