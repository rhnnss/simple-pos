export interface AnalyticsData {
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
