export function formatToK(num) {
  if (num < 1000) {
    return num.toString();
  } else {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
}
