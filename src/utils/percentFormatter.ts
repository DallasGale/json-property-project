const PercentFormatter = (num: number) => {
  if (num >= 1 && num <= 9.9) {
    return num.toFixed(1);
  } else if (num >= 0 && num <= 0.99) {
    return "< 1";
  } else {
    return num.toFixed(0);
  }
};

export default PercentFormatter;
