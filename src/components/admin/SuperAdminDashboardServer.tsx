import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";

interface AnalyticsData {
  overview: {
    totalTenants: number;
    totalUsers: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
    monthlyRevenue: number;
    revenueGrowth: number;
    activeUsers: number;
  };
  topTenants: Array<{
    id: string;
    businessName: string;
    revenue: number;
    orderCount: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customer: any;
    total: number;
    status: string;
    createdAt: string;
    tenant: any;
  }>;
  monthlyStats: {
    currentMonth: number;
    lastMonth: number;
    growth: number;
  };
}

import { KeyMetrics } from "./metrics/KeyMetrics";
import { TopTenants } from "./dashboard/TopTenants";
import { RecentOrders } from "./dashboard/RecentOrders";
import { MonthlyComparison } from "./dashboard/MonthlyComparison";
import { fetchAnalyticsData } from "./analytics/fetchAnalyticsData";

// Server Component untuk Payload CMS v3
const SuperAdminDashboardServer = async () => {
  const analytics = await fetchAnalyticsData();

  if (!analytics) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Error Loading Dashboard</h1>
        <p>Unable to fetch analytics data.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Super Admin Dashboard
        </h1>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Analytics & Overview untuk seluruh sistem SimplePOS
        </p>
      </div>

      {/* Key Metrics */}
      <KeyMetrics analytics={analytics} />

      {/* Top Tenants and Recent Orders */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <TopTenants tenants={analytics.topTenants} />
        <RecentOrders orders={analytics.recentOrders} />
      </div>

      {/* Monthly Comparison */}
      <MonthlyComparison monthlyStats={analytics.monthlyStats} />
    </div>
  );
};

export default SuperAdminDashboardServer;
