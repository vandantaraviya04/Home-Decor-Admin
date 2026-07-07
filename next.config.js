/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  srcDir: "src",
  turbopack: {
    resolveAlias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  webpack: (config) => {
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    config.resolve.alias["src"] = path.resolve(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
