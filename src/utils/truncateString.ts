export function truncateString(str: string, limit: number) {
  if (str && str.length > limit) {
    return str.substring(0, limit) + "...";
  } else {
    return str;
  }
}
