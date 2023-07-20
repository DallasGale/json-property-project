const PercentChangeColors = (value: any) => {
  console.log({ value });
  if (value < 0) return "rgba(250, 82, 82, 1)";
  else return "rgba(64, 192, 87, 1)";
};

export default PercentChangeColors;
