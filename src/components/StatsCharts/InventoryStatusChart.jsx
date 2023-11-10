import { LineChart } from "@mui/x-charts/LineChart";


export default function InventoryStatusChart() {
  const xLabels = [
    "25/2/2023",
    "26/2/2023",
    "27/2/2023",
    "28/2/2023",
    "29/2/2023",
  ];

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
        By Status
      </h1>

      <LineChart
        height={240}
        width={500}
        xAxis={[{ scaleType: "point", data: xLabels}]}
        yAxis={[{ min: 0 }]}
        series={[
          {
            curve: "linear",
            data: [32, 40, 20, 35, 15],
            label: "Open",
            connectNulls: false,
          },
          {
            curve: "linear",
            data: [25, 25, 30, 10, 10],
            label: "In Progress",
            connectNulls: false,
          },
          {
            curve: "linear",
            data: [20, 12, 10, 15, 22],
            label: "Cancelled",
            connectNulls: false,
          },
          {
            curve: "linear",
            data: [10, 10, 14, 19, 20],
            label: "Done",
            connectNulls: false,
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: "15px",
          },
        }}
        sx={{
          ".MuiMarkElement-root": {
            display: "none",
          },
          ".MuiChartsLegend-mark": {
            rx: "50",
          },
          ".MuiChartsAxis-line": {
            display: "none",
          },
          ".MuiChartsAxis-tick": {
            display: "none",
          },
        }}
      />
    </div>
  );
}
