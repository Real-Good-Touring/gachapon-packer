export function toCurrency(v: number | string) {
  let q = parseFloat(v as string);
  if (!q) return v;
  return "$" + q.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
