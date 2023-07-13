const GoodToBadColors = (value: any) => {
  if (value >= 0 && value <= 40) return "rgba(250, 82, 82, 1)";
  else if (value > 41 && value < 61) return "rgba(253, 126, 20, 1)";
  else return "rgba(64, 192, 87, 1)";
};

export default GoodToBadColors;
