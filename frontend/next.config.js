/** @type {import('next').NextConfig} */

const path = require("path");
// const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  // assetPrefix: isProd ? '/public' : '',
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  // experimental: {
  //   outputStandalone: true,
  // },
};
