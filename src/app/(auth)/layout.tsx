import React from "react";
import { Metadata } from "next";
import { Providers } from "../(frontend)/providers";
import "../(frontend)/styles.css";

export const metadata: Metadata = {
  title: {
    default: "Autentikasi - Simple PoS",
    template: "%s | Simple PoS",
  },
  description:
    "Sistem autentikasi untuk Simple PoS - Point of Sale yang mudah digunakan",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers
      themeProps={{
        attribute: "class",
        defaultTheme: "dark",
        themes: ["light", "dark"],
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {children}
      </div>
    </Providers>
  );
}
