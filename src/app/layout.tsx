import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Simple PoS",
    template: "%s | Simple PoS",
  },
  description: "Point of Sale yang mudah digunakan untuk bisnis Anda",
  keywords: [
    "Point of Sale",
    "PoS",
    "Kasir",
    "Bisnis",
    "Penjualan",
    "Invoice",
    "Receipt",
  ],
  authors: [{ name: "Simple PoS Team" }],
  creator: "Simple PoS",
  publisher: "Simple PoS",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://simple-pos.com",
    siteName: "Simple PoS",
    title: "Simple PoS - Point of Sale untuk Bisnis Anda",
    description: "Point of Sale yang mudah digunakan untuk bisnis Anda",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Simple PoS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple PoS",
    description: "Point of Sale yang mudah digunakan untuk bisnis Anda",
    images: ["/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
