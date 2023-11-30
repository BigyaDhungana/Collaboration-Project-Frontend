/** @type {import('next').NextConfig} */
const { withGluestackUI } = require("@gluestack/ui-next-adapter");

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@gluestack-ui/themed"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.18.135",
        port: "8000",
        pathname: "**",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withGluestackUI(nextConfig);
