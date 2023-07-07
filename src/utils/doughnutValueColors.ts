const doughnutValueColors = (value: any) => {
  if (value >= 0 && value <= 31) return "rgba(250, 82, 82, 1)";
  else if (value > 31 && value < 61) return "rgba(253, 126, 20, 1)";
  else return "rgba(64, 192, 87, 1)";
};

export default doughnutValueColors;
