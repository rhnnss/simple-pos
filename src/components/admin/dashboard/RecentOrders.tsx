import React from "react";
import { formatCurrency } from "./utils";
import type { AnalyticsData } from "../../../types/analytics";

interface RecentOrdersProps {
  orders: AnalyticsData["recentOrders"];
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
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
        📋 Recent Orders
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e9ecef" }}>
              <th
                style={{
                  padding: "0.75rem",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Order #
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Total
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 8).map((order: any) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem", fontSize: "0.9rem" }}>
                  {order.orderNumber}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  {formatCurrency(order.total || 0)}
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      background:
                        order.status === "Completed"
                          ? "#dcfce7"
                          : order.status === "Paid"
                            ? "#dbeafe"
                            : "#fef3c7",
                      color:
                        order.status === "Completed"
                          ? "#166534"
                          : order.status === "Paid"
                            ? "#1e40af"
                            : "#92400e",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
