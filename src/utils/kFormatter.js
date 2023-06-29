export function kFormatter(num) {
  const n1 = Math.abs(num);
  return n1 > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}
