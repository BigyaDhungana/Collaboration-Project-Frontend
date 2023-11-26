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
};

module.exports = withGluestackUI(nextConfig);
