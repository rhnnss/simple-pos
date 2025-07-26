import React from "react";
import { formatCurrency, formatPercentage } from "./utils";
import type { AnalyticsData } from "../../../types/analytics";

interface MonthlyComparisonProps {
  monthlyStats: AnalyticsData["monthlyStats"];
}

export const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({
  monthlyStats,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid #e9ecef",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        📊 Monthly Revenue Comparison
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#666" }}>
            Current Month
          </h4>
          <p
            style={{
              margin: "0.5rem 0",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2563eb",
            }}
          >
            {formatCurrency(monthlyStats.currentMonth)}
          </p>
        </div>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#666" }}>
            Last Month
          </h4>
          <p
            style={{
              margin: "0.5rem 0",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#6b7280",
            }}
          >
            {formatCurrency(monthlyStats.lastMonth)}
          </p>
        </div>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#666" }}>
            Growth
          </h4>
          <p
            style={{
              margin: "0.5rem 0",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: monthlyStats.growth >= 0 ? "#16a34a" : "#dc2626",
            }}
          >
            {formatPercentage(monthlyStats.growth)}
          </p>
        </div>
      </div>
    </div>
  );
};
