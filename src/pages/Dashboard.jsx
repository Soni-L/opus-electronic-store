import React from "react";
import StatCard from "../components/StatCard";
import InventoryCategoriesPieChart from "../components/StatsCharts/InventoryCategoriesPieChart";
import InventoryStatusChart from "../components/StatsCharts/InventoryStatusChart";
import InventoryTable from "../components/InventoryTable/InventoryTable";
import useQueryOrders from "../hooks/useQueryOrders";
import useMonthlySalesStats from "../hooks/useMonthlySalesStats";


export default function Dashboard() {
  const orders = useQueryOrders()
  const monthlySalesStats = useMonthlySalesStats()

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {monthlySalesStats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            percentGain={item.percentGain}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <InventoryStatusChart />
        <InventoryCategoriesPieChart />
      </div>

      <div style={{padding: "20px" }}>
        <InventoryTable rows={orders.items}/>
      </div>
    </>
  );
}
