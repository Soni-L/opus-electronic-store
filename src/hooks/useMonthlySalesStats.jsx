
const monthlySalesStats = [
  { title: "Number of Orders", value: 208, percentGain: -2 },
  { title: "AVG Review Score", value: 6, percentGain: -2 },
  { title: "Cancellations", value: 54, percentGain: 2 },
  { title: "Done", value: 72, percentGain: 2 },
  { title: "Customers", value: 12, percentGain: 2 },
];

export default function useMonthlySalesStats() {
  return monthlySalesStats;
}
