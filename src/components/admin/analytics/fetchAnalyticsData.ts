import { getPayload } from "payload";
import config from "@/payload.config";
import type { AnalyticsData } from "../../../types/analytics";

export async function fetchAnalyticsData(): Promise<AnalyticsData | null> {
  try {
    // Get Payload instance using Local API
    const payload = await getPayload({ config });

    // Get total counts
    const [tenants, users, orders, customers] = await Promise.all([
      payload.find({ collection: "tenants", limit: 0 }),
      payload.find({ collection: "users", limit: 0 }),
      payload.find({ collection: "orders", limit: 0 }),
      payload.find({ collection: "customers", limit: 0 }),
    ]);

    // Calculate revenue
    const allOrders = await payload.find({
      collection: "orders",
      limit: 1000,
      where: {
        status: {
          in: ["paid", "completed"],
        },
      },
    });

    const totalRevenue = allOrders.docs.reduce(
      (sum: number, order: any) => sum + (order.total || 0),
      0,
    );

    // Get current month orders
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const firstDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    const lastDayOfLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    );

    const [currentMonthOrders, lastMonthOrders] = await Promise.all([
      payload.find({
        collection: "orders",
        where: {
          and: [
            {
              createdAt: {
                greater_than_equal: firstDayOfMonth.toISOString(),
              },
            },
            {
              status: {
                in: ["paid", "completed"],
              },
            },
          ],
        },
      }),
      payload.find({
        collection: "orders",
        where: {
          and: [
            {
              createdAt: {
                greater_than_equal: firstDayOfLastMonth.toISOString(),
              },
            },
            {
              createdAt: {
                less_than_equal: lastDayOfLastMonth.toISOString(),
              },
            },
            {
              status: {
                in: ["paid", "completed"],
              },
            },
          ],
        },
      }),
    ]);

    const monthlyRevenue = currentMonthOrders.docs.reduce(
      (sum: number, order: any) => sum + (order.total || 0),
      0,
    );
    const lastMonthRevenue = lastMonthOrders.docs.reduce(
      (sum: number, order: any) => sum + (order.total || 0),
      0,
    );
    const revenueGrowth =
      lastMonthRevenue > 0
        ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
        : 0;

    // Get top tenants by revenue
    const tenantsWithRevenue = await Promise.all(
      tenants.docs.slice(0, 5).map(async (tenant: any) => {
        const tenantOrders = await payload.find({
          collection: "orders",
          where: {
            and: [
              { tenant: { equals: tenant.id } },
              { status: { in: ["paid", "completed"] } },
            ],
          },
        });

        const revenue = tenantOrders.docs.reduce(
          (sum: number, order: any) => sum + (order.total || 0),
          0,
        );

        return {
          id: tenant.id,
          businessName: tenant.businessName || "Unknown",
          revenue,
          orderCount: tenantOrders.totalDocs,
        };
      }),
    );

    const topTenants = tenantsWithRevenue
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Get recent orders
    const recentOrdersData = await payload.find({
      collection: "orders",
      limit: 10,
      sort: "-createdAt",
      depth: 2,
    });

    return {
      overview: {
        totalTenants: tenants.totalDocs,
        totalUsers: users.totalDocs,
        totalOrders: orders.totalDocs,
        totalCustomers: customers.totalDocs,
        totalRevenue,
        monthlyRevenue,
        revenueGrowth,
        activeUsers: users.docs.filter(
          (user: any) => user.role !== "super-admin",
        ).length,
      },
      topTenants,
      recentOrders: recentOrdersData.docs.map((order) => ({
        id: String(order.id),
        orderNumber: order.orderNumber,
        customer: order.customer,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        tenant: order.tenant,
      })),
      monthlyStats: {
        currentMonth: monthlyRevenue,
        lastMonth: lastMonthRevenue,
        growth: revenueGrowth,
      },
    };
  } catch (error) {
    return null;
  }
}
