export function money(value: number) {
  return new Intl.NumberFormat("en-LK", { maximumFractionDigits: 0 }).format(
    value,
  );
}
