import React from "react";

export default function StatCard({ title = "Number of Orders" }) {
  return (
    <div
      style={{
        height: "110px",
        width: "240px",
        borderRadius: "8px",
        border: "1px solid #EBEAEA",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div
          style={{
            height: "36px",
            width: "36px",
            border: "1px solid #EBEAEA",
            borderRadius: "12px",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "24px", width: "24px", paddingBottom: "4px" }}
            src="src/assets/calendar-star.svg"
          ></img>
        </div>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "LibreFranklin",
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
