import { PieChart } from "@mui/x-charts/PieChart";

const cagetories = {
  total: 96,
  data: [
    { label: "Computers", value: 12 },
    { label: "TV", value: 12 },
    { label: "Sound", value: 36 },
    { label: "Storage", value: 12 },
    { label: "Cell Phones", value: 12 },
    { label: "Other", value: 12 },
  ],
};

export default function InventoryCategoriesPieChart() {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "320px",
        width: "681px",
        borderRadius: "8px",
        padding: "10px 15px",
      }}
    >
      <h1
        style={{
          fontSize: "16px",
          fontWeight: 800,
          fontFamily: "LibreFranklin",
        }}
      >
        By Category
      </h1>
      <PieChart
        height={250}
        width={500}
        sx={{
          "& .MuiPieArcLabel-root": {
            fontWeight: 700,
            fontSize: "13px",
            fontFamily: "LibreFranklin",
          },
          "& .MuiChartsLegend-mark": {
            rx: "50",
          },
        }}
        series={[
          {
            data: cagetories.data,
            arcLabel: (item) => `${Math.floor((item.value / 96) * 100)}%`,
            innerRadius: 40,
            outerRadius: 97,
            paddingAngle: 2,
          },
        ]}
        slotProps={{
          legend: { hidden: false },
        }}
      />
    </div>
  );
}
