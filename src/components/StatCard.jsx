import React from "react";
import starIcon from "../assets/calendar-star.svg";
import { ArrowDownward,  ArrowUpward} from "@mui/icons-material";

export default function StatCard({
  title = "Number of Orders",
  value = 208,
  percentGain = -2,
}) {
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
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "8px",
          alignItems: "center",
        }}
      >
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
            src={starIcon}
          ></img>
        </div>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            fontWeight: 700,
            fontFamily: "LibreFranklin",
          }}
        >
          {title}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          padding: "8px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            margin: 0,
            fontWeight: 700,
            fontFamily: "LibreFranklin",
          }}
        >
          {value}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: percentGain >= 0 ? "#DFFEF5" : "#FFE1E6",
            padding: "4px 8px",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontSize: "15px",
              margin: 0,
              fontWeight: 700,
              fontFamily: "LibreFranklin",
              color: percentGain >= 0 ? "#0FAE7F" : "#761727",
            }}
          >
            {`${Math.abs(percentGain)}%`}
          </p>
          {percentGain >= 0 ? (
            <ArrowUpward fontSize="small" style={{ color: "#0FAE7F" }} />
          ) : (
            <ArrowDownward fontSize="small" style={{ color: "#761727" }} />
          )}
        </div>
      </div>
    </div>
  );
}
