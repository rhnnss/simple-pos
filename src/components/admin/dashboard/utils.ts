export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export const formatPercentage = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
};