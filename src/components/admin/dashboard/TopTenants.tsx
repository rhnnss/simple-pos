import React from "react";
import { formatCurrency } from "./utils";
import type { AnalyticsData } from "../../../types/analytics";

interface TopTenantsProps {
  tenants: AnalyticsData["topTenants"];
}

export const TopTenants: React.FC<TopTenantsProps> = ({ tenants }) => {
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
        🏆 Top Performing Tenants
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tenants.map((tenant, index) => (
          <div
            key={tenant.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                background: "#2563eb",
                color: "white",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginRight: "1rem",
              }}
            >
              #{index + 1}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                {tenant.businessName}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: "#059669",
                  fontWeight: "bold",
                }}
              >
                {formatCurrency(tenant.revenue)}
              </p>
              <span style={{ fontSize: "0.9rem", color: "#666" }}>
                {tenant.orderCount} orders
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
