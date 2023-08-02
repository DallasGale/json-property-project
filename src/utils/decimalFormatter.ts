const DecimalFormatter = (num: number) => {
  console.log({ num });
  if (num) {
    if (num <= 9.99) {
      return num.toFixed(2);
    } else {
      return num.toFixed(0);
    }
  } else {
    return num;
  }
};

export default DecimalFormatter;
