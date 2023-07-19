export function numFormatter(num) {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  if (num) {
    return formatter.format(num);
  }
}
