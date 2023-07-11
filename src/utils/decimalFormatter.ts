const DecimalFormatter = (num: number) => {
  if (num <= 10) {
    return num.toFixed(2);
  } else {
    return num.toFixed(0);
  }
};

export default DecimalFormatter;