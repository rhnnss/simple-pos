import { withPayload } from "@payloadcms/next/withPayload";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveExtensions: [
      ".cts",
      ".cjs",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".mts",
      ".mjs",
      ".json",
    ],
  },
};

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

export default withPayload(withPWAConfig, { devBundleServerPackages: false });
