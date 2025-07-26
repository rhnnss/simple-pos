"use client";

import React from "react";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLinkItem: React.FC<NavLinkProps> = ({ href, label }) => {
  return (
    <li>
      <a
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
          textDecoration: "none",
          fontSize: "13px",
          lineHeight: "20px",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecorationLine = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecorationLine = "none";
        }}
      >
        <span>{label}</span>
      </a>
    </li>
  );
};

const CustomNavLinks: React.FC = () => {
  const navItems = [
    {
      href: "/admin",
      label: "Analytics Dashboard",
    },
  ];

  return (
    <div style={{ marginBottom: "16px" }}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {navItems.map((item, index) => (
          <NavLinkItem key={index} href={item.href} label={item.label} />
        ))}
      </ul>
    </div>
  );
};

export default CustomNavLinks;
