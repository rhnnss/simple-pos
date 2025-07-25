import React from "react";
import { Metadata } from "next";
import { Providers } from "./providers";

import "./styles.css";

export const metadata: Metadata = {
  title: {
    default: "Payload CMS Hero UI Template",
    template: "%s | Payload CMS Hero UI",
  },
  description:
    "A modern template using Payload CMS with Hero UI components in a Next.js application.",
  keywords: [
    "Payload CMS",
    "Hero UI",
    "Next.js",
    "React",
    "TypeScript",
    "Template",
  ],
  authors: [{ name: "Your Company Name" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://your-domain.com",
    siteName: "Payload CMS Hero UI",
    title: "Payload CMS Hero UI Template",
    description:
      "A modern template using Payload CMS with Hero UI components in a Next.js application.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Payload CMS Hero UI Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payload CMS Hero UI Template",
    description:
      "A modern template using Payload CMS with Hero UI components in a Next.js application.",
    images: ["/og-image.jpg"],
    creator: "@yourhandle",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  manifest: "/site.webmanifest",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            themes: ["light", "dark"],
          }}
        >
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
