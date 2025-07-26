import React from "react";
import { MetricCard } from "./MetricCard";
import { formatCurrency, formatPercentage } from "../dashboard/utils";
import type { AnalyticsData } from "../../../types/analytics";

interface KeyMetricsProps {
  analytics: AnalyticsData;
}

export const KeyMetrics: React.FC<KeyMetricsProps> = ({ analytics }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem",
      }}
    >
      <MetricCard
        icon="🏢"
        title="Total Tenants"
        value={analytics.overview.totalTenants}
        subtitle="Active businesses"
        color="#2563eb"
      />

      <MetricCard
        icon="👥"
        title="Active Users"
        value={analytics.overview.activeUsers}
        subtitle="Tenant users"
        color="#16a34a"
      />

      <MetricCard
        icon="📦"
        title="Total Orders"
        value={analytics.overview.totalOrders}
        subtitle="All time"
        color="#dc2626"
      />

      <MetricCard
        icon="💰"
        title="Total Revenue"
        value={formatCurrency(analytics.overview.totalRevenue)}
        subtitle="All time"
        color="#059669"
      />

      <div
        style={{
          background: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span style={{ fontSize: "2rem", marginRight: "1rem" }}>📈</span>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
              Monthly Revenue
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#7c3aed",
              }}
            >
              {formatCurrency(analytics.overview.monthlyRevenue)}
            </p>
            <span
              style={{
                fontSize: "0.9rem",
                color:
                  analytics.overview.revenueGrowth >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              {formatPercentage(analytics.overview.revenueGrowth)} vs last month
            </span>
          </div>
        </div>
      </div>

      <MetricCard
        icon="👤"
        title="Total Customers"
        value={analytics.overview.totalCustomers}
        subtitle="Registered customers"
        color="#ea580c"
      />
    </div>
  );
};
