import React from "react";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  color,
}) => {
  return (
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
        <span style={{ fontSize: "2rem", marginRight: "1rem" }}>{icon}</span>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: "bold",
              color,
            }}
          >
            {value}
          </p>
          <span style={{ fontSize: "0.9rem", color: "#666" }}>
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};