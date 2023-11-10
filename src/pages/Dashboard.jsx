import React from "react";
import StatCard from "../components/StatCard";
import InventoryCategoriesPieChart from "../components/StatsCharts/InventoryCategoriesPieChart";

const monthlySalesStats = [
  { title: "Number of Orders", value: 208, percentGain: -2 },
  { title: "AVG Review Score", value: 6, percentGain: -2 },
  { title: "Cancellations", value: 54, percentGain: 2 },
  { title: "Done", value: 72, percentGain: 2 },
  { title: "Customers", value: 12, percentGain: 2 },
];

export default function Dashboard() {
  return (
    <>
      <div style={{display: 'flex', padding: '8px', gap: '8px', flexWrap: 'wrap'}}>
        {monthlySalesStats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            percentGain={item.percentGain}
          />
        ))}
      </div>

      <div style={{display: 'flex', padding: '8px', gap: '8px', flexWrap: 'wrap'}}>
        <InventoryCategoriesPieChart/>
      </div>
    </>
  );
}
