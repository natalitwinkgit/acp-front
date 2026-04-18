export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(value) + "\u00A0₴";
}

export function formatYAxis(value: number): string {
  if (value === 0) return "0";
  return `${value / 1000}\u00A0000`;
}
