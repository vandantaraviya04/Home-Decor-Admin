const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      src: path.resolve(__dirname, "src"),
    },
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, "src"),
    };

    return config;
  },
};

module.exports = nextConfig;